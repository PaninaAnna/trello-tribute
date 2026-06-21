import Constants from '../constants';

const initialState = {
  errors: null,
};

export default function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.REGISTRATIONS_ERROR:
      return { ...state, errors: action.errors };

    default:
      return state;
  }
}
