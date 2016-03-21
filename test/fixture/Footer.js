import React, { PropTypes } from 'react';
import { pluralize } from './utils';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

const isAllSelected = nowShowing => nowShowing === ALL_TODOS ? 'selected' : '';
const isActiveSelected = nowShowing => nowShowing === ACTIVE_TODOS ? 'selected' : '';
const isCompletedSelected = nowShowing => nowShowing === COMPLETED_TODOS ? 'selected' : '';

function TodoFooter({ count, completedCount, onClearCompleted, nowShowing }) {
  const activeTodoWord = pluralize(count, 'item');
  let clearButton = null;

  if (completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={ onClearCompleted }>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={isAllSelected(nowShowing)}>
              All
          </a>
        </li>
        {' '}
        <li>
          <a href="#/active" className={isActiveSelected(nowShowing)}>
              Active
          </a>
        </li>
        {' '}
        <li>
          <a
            href="#/completed"
            className={isCompletedSelected(nowShowing)}
          >
              Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}

TodoFooter.propTypes = {
  count: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  nowShowing: PropTypes.string.isRequired,
};

export default TodoFooter;
