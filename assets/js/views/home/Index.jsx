import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../actions/boards';
import BoardForm from '../../components/boards/form';

function HomeIndexView() {
  const dispatch = useDispatch();
  const { ownedBoards, showForm, formErrors, fetching } = useSelector(state => state.boards);

  useEffect(() => {
    document.title = 'Trello Tribute - Boards';
    dispatch(Actions.fetchBoards());
  }, [dispatch]);

  const handleAddNewClick = () => {
    dispatch(Actions.showForm(true));
  };

  const handleCancelClick = () => {
    dispatch(Actions.showForm(false));
  };

  if (fetching) {
    return (
      <div className="view-container boards index">
        <div>Loading boards...</div>
      </div>
    );
  }

  return (
    <div className="view-container boards index">
      <section>
        <header className="view-header">
          <h3>My boards</h3>
        </header>

        <div className="boards-wrapper">
          {ownedBoards.map((board) => (
            <div key={board.id} className="board-card">
              <div className="inner">
                <a href={`/boards/${board.id}`}>{board.name}</a>
              </div>
            </div>
          ))}

          {showForm ? (
            <BoardForm
              dispatch={dispatch}
              errors={formErrors}
              onCancelClick={handleCancelClick}
            />
          ) : (
            <div className="board add-new" onClick={handleAddNewClick}>
              <div className="inner">
                <a id="add_new_board">Add new board...</a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomeIndexView;
