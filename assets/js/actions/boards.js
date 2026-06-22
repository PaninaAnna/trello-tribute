import Constants from '../constants';
import { httpGet, httpPost } from '../utils';

const Actions = {
  fetchBoards: () => {
    return dispatch => {
      dispatch({ type: Constants.BOARDS_FETCHING });

      httpGet('/api/v1/boards')
        .then((data) => {
          dispatch({
            type: Constants.BOARDS_RECEIVED,
            ownedBoards: data.owned_boards
          });
        })
        .catch(() => {
          dispatch({ type: Constants.BOARDS_FETCHING_ERROR });
        });
    };
  },

  showForm: (show) => {
    return dispatch => {
      dispatch({
        type: Constants.BOARDS_SHOW_FORM,
        show: show,
      });
    };
  },

  create: (data) => {
    return dispatch => {
      httpPost('/api/v1/boards', { board: data })
        .then((data) => {
          dispatch({
            type: Constants.BOARDS_NEW_BOARD_CREATED,
            board: data,
          });
          // Редирект на страницу доски
          window.location.href = `/boards/${data.id}`;
        })
        .catch((error) => {
          if (error.errors) {
            dispatch({
              type: Constants.BOARDS_CREATE_ERROR,
              errors: error.errors,
            });
          }
        });
    };
  },
};

export default Actions;
