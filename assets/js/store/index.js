import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Импортируем редьюсеры
import sessionReducer from '../reducers/session';
import registrationReducer from '../reducers/registration';

const rootReducer = combineReducers({
  session: sessionReducer,
  registration: registrationReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
