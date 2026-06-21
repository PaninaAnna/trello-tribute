import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Actions from '../../actions/sessions';

function SessionsNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.session.error);
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('12345678');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(Actions.signIn(email, password, navigate)); // <-- передаем navigate
  };

  return (
    <div className="view-container sessions new">
      <main>
        <header>
          <div className="logo">Trello Tribute</div>
        </header>

        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Sign in</button>
        </form>

        <Link to="/sign_up">Create new account</Link>
      </main>
    </div>
  );
}

export default SessionsNew;
