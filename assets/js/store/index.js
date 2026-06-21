import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  session: {
    currentUser: null,
    error: null,
  },
};

const rootReducer = (state = initialState, action) => {
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
