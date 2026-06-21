import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import RegistrationsNew from './views/registrations/New';
import SessionsNew from './views/sessions/New';
import '../css/app.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/sign_up" element={<RegistrationsNew />} />
        <Route path="/sign_in" element={<SessionsNew />} />
      </Routes>
    </div>
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
}
