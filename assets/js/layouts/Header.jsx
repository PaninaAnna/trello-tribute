import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Actions from '../actions/sessions';

function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.currentUser);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(Actions.signOut());
  };

  if (!currentUser) return null;

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 20px',
      background: '#0052cc',
      color: 'white'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          Trello Tribute
        </Link>
      </div>
      <div>
        <span style={{ marginRight: '15px' }}>
          👤 {currentUser.first_name} {currentUser.last_name}
        </span>
        <a 
          href="#" 
          onClick={handleSignOut}
          style={{ color: 'white' }}
        >
          Sign out
        </a>
      </div>
    </header>
  );
}

export default Header;
