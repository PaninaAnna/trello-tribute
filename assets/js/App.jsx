import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import RegistrationsNew from './views/registrations/New';
import '../css/app.css';

function App() {
  return (
    <div>
      <h1>Trello Tribute</h1>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/sign_up" element={<RegistrationsNew />} />
        <Route path="/sign_in" element={<div>Sign In</div>} />
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
