import Constants from '../constants';
import { httpPost } from '../utils';

const Actions = {
  signUp: (data) => {
    return dispatch => {
      httpPost('/api/v1/registrations', { user: data })
        .then((response) => {
          // Временно без JWT (добавим позже)
          localStorage.setItem('phoenixAuthToken', 'temp_token');

          dispatch({
            type: Constants.CURRENT_USER,
            currentUser: response.user,
          });

          // Редирект на главную
          window.location.href = '/';
        })
        .catch((error) => {
          dispatch({
            type: Constants.REGISTRATIONS_ERROR,
            errors: error.errors || [{ general: 'Registration failed' }],
          });
        });
    };
  },
};

export default Actions;
