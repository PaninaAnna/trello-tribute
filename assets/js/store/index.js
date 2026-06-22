import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import sessionReducer from '../reducers/session';
import registrationReducer from '../reducers/registration';
import boardsReducer from '../reducers/boards';

const rootReducer = combineReducers({
  session: sessionReducer,
  registration: registrationReducer,
  boards: boardsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      immutableCheck: false,   
    }),
  devTools: process.env.NODE_ENV !== 'production',
});
