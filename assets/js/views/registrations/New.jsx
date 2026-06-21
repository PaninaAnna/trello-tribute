import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setDocumentTitle, renderErrorsFor } from '../../utils';
import Actions from '../../actions/registrations';

function RegistrationsNew() {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.registration.errors);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    setDocumentTitle('Sign up');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Actions.signUp(formData));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="view-container registrations new">
      <main>
        <header>
          <div className="logo">Trello Tribute</div>
        </header>
        
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            {renderErrorsFor(errors, 'first_name')}
          </div>

          <div className="field">
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            {renderErrorsFor(errors, 'last_name')}
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {renderErrorsFor(errors, 'email')}
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {renderErrorsFor(errors, 'password')}
          </div>

          <div className="field">
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            {renderErrorsFor(errors, 'password_confirmation')}
          </div>

          <button type="submit">Sign up</button>
        </form>

        <Link to="/sign_in">Sign in</Link>
      </main>
    </div>
  );
}

export default RegistrationsNew;
