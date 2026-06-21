import Constants from '../constants';
import { httpPost, httpGet, httpDelete } from '../utils';

const Actions = {
  signIn: (email, password, navigate) => {
    return dispatch => {
      
      httpPost('/api/v1/sessions', { session: { email, password } })
        .then((response) => {
          
          localStorage.setItem('phoenixAuthToken', response.jwt);

          dispatch({
            type: Constants.CURRENT_USER,
            currentUser: response.user,
          });

          // Используем react-router навигацию
          navigate('/');
        })
        .catch((error) => {
          
          dispatch({
            type: Constants.SESSIONS_ERROR,
            error: error.error || 'Login failed',
          });
        });
    };
  },

  signOut: () => {
    return dispatch => {
      localStorage.removeItem('phoenixAuthToken');
      dispatch({ type: Constants.USER_SIGNED_OUT });
      window.location.href = '/sign_in';
    };
  },

  currentUser: () => {
    return dispatch => {
      
      httpGet('/api/v1/current_user')
        .then((user) => {
          
          dispatch({
            type: Constants.CURRENT_USER,
            currentUser: user,
          });
        })
        .catch((error) => {
          
          localStorage.removeItem('phoenixAuthToken');
          window.location.href = '/sign_in';
        });
    };
  },
};

export default Actions;
