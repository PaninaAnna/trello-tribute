import Constants from '../constants';
import { httpPost, httpGet, httpDelete } from '../utils';
import { Socket } from 'phoenix';

function setCurrentUser(dispatch, user) {
  console.log('setCurrentUser called for user:', user.id);

  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });

  const socket = new Socket('/socket', {
    params: { token: localStorage.getItem('phoenixAuthToken') },
  });

  console.log('Socket created, connecting...');

  socket.connect();

  const channel = socket.channel(`users:${user.id}`);

  console.log('Joining channel users:' + user.id);

  channel.join().receive('ok', () => {
    console.log('Channel joined successfully!');
    dispatch({
      type: Constants.SOCKET_CONNECTED,
      socket: socket,
      channel: channel,
    });
  });
}

const Actions = {
  signIn: (email, password, navigate) => {
    return dispatch => {
      console.log('signIn called');

      httpPost('/api/v1/sessions', { session: { email, password } })
        .then((response) => {
          console.log('Response received:', response);

          localStorage.setItem('phoenixAuthToken', response.jwt);
          setCurrentUser(dispatch, response.user);
          navigate('/');
        })
        .catch((error) => {
          console.log('Error:', error);

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
      console.log('currentUser called');

      httpGet('/api/v1/current_user')
        .then((user) => {
          console.log('Current user received:', user);
          setCurrentUser(dispatch, user);
        })
        .catch((error) => {
          console.log('currentUser error:', error);

          localStorage.removeItem('phoenixAuthToken');
          window.location.href = '/sign_in';
        });
    };
  },
};

export default Actions;
