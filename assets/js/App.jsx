import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import AuthenticatedContainer from './containers/AuthenticatedContainer';
import RegistrationsNew from './views/registrations/New';
import SessionsNew from './views/sessions/New';
import HomeIndexView from './views/home/Index';
import '../css/app.css';

function App() {
  return (
    <Routes>
      <Route path="/sign_up" element={<RegistrationsNew />} />
      <Route path="/sign_in" element={<SessionsNew />} />
      
      <Route path="/" element={<AuthenticatedContainer />}>
        <Route index element={<HomeIndexView />} />
        <Route path="/boards/:id" element={<div>Board View</div>} />
      </Route>
    </Routes>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
} else {
  console.error('Root element not found!');
}
