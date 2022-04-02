import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from './constants';

function Footer({ activeTodoCount, completedCount, nowShowing, onClearCompleted }) {
  if (activeTodoCount === 0 && completedCount === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong> item{activeTodoCount > 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className={classNames({ selected: nowShowing === ALL_TODOS })}>
            All
          </Link>
        </li>
        <li>
          <Link to="/active" className={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={classNames({ selected: nowShowing === COMPLETED_TODOS })}
          >
            Completed
          </Link>
        </li>
      </ul>
      {completedCount > 0 ? (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  );
}

export default Footer;
