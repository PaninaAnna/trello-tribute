import Constants from '../constants';

const initialState = {
  ownedBoards: [],
  showForm: false,
  formErrors: null,
  fetching: true,
};

export default function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.SOCKET_CONNECTED:
      return state; // <-- игнорируем, чтобы не ломать

    case Constants.BOARDS_FETCHING:
      return { ...state, fetching: true };

    case Constants.BOARDS_RECEIVED:
      return { ...state, ownedBoards: action.ownedBoards, fetching: false };

    case Constants.BOARDS_FETCHING_ERROR:
      return { ...state, fetching: false };

    case Constants.BOARDS_SHOW_FORM:
      return { ...state, showForm: action.show };

    case Constants.BOARDS_CREATE_ERROR:
      return { ...state, formErrors: action.errors };

    case Constants.BOARDS_NEW_BOARD_CREATED:
      return {
        ...state,
        ownedBoards: [action.board, ...state.ownedBoards],
        formErrors: null,
        showForm: false,
      };

    default:
      return state;
  }
}
