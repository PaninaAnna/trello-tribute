import React, { useState, useEffect, useRef } from 'react';
import Actions from '../../actions/boards';
import { renderErrorsFor } from '../../utils';

function BoardForm({ dispatch, errors, onCancelClick }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(Actions.create({ name: name.trim() }));
    }
  };

  return (
    <div className="board form">
      <div className="inner">
        <h4>New board</h4>
        <form id="new_board_form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            id="board_name"
            type="text"
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {renderErrorsFor(errors, 'name')}
          <button type="submit">Create board</button>
          {' '}or{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onCancelClick(); }}>cancel</a>
        </form>
      </div>
    </div>
  );
}

export default BoardForm;
