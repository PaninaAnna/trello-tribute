import Constants from '../constants';
import { httpPost } from '../utils';

const Actions = {
  signIn: (email, password) => {
    console.log('signIn called with:', email, password); // <-- добавляем
    
    return dispatch => {
      console.log('Sending POST to /api/v1/sessions'); // <-- добавляем
      
      httpPost('/api/v1/sessions', { session: { email, password } })
        .then((response) => {
          console.log('Response received:', response); // <-- добавляем
          
          localStorage.setItem('phoenixAuthToken', response.jwt);

          dispatch({
            type: Constants.CURRENT_USER,
            currentUser: response.user,
          });

          window.location.href = '/';
        })
        .catch((error) => {
          console.log('Error:', error); // <-- добавляем
          
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: error.error || 'Login failed',
          });
        });
    };
  },
  // ... остальное
};

export default Actions;
