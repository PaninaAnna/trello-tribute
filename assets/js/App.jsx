import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';

function App() {
  return (
    <div>
      <h1>Trello Tribute</h1>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/sign_in" element={<div>Sign In</div>} />
        <Route path="/sign_up" element={<div>Sign Up</div>} />
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
