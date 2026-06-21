import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Actions from '../actions/sessions';
import Header from '../layouts/Header';

function AuthenticatedContainer({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.session.currentUser);
  const token = localStorage.getItem('phoenixAuthToken');

  useEffect(() => {
    if (!token) {
      navigate('/sign_in');
      return;
    }

    if (!currentUser) {
      dispatch(Actions.currentUser());
    }
  }, [token, currentUser, dispatch, navigate]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="application-container">
      <Header />
      <div className="main-container">
        {children}
      </div>
    </div>
  );
}

export default AuthenticatedContainer;
