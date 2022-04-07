import { memo, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { usePrevious } from './hooks';

// TODO: Test TodoListItem

function TodoListItem({ todo, onToggle, onDestroy, onEdit, editing, onSave, onCancel }) {
  const editFieldRef = useRef(null);
  const [editText, setEditText] = useState(todo.title);

  function handleSubmit() {
    const value = editText.trim();
    if (!value) {
      onDestroy();
    }

    onSave(value);
    setEditText(value);
  }

  function handleEdit() {
    onEdit();
    setEditText(todo.title);
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setEditText(todo.title);
      onCancel(event);
    }
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  function handleChange(event) {
    if (!editing) {
      return;
    }

    setEditText(event.target.value);
  }

  const prevEditing = usePrevious(editing);
  useEffect(() => {
    if (prevEditing || !editing) {
      return;
    }

    const node = editFieldRef.current;
    node.focus();
    node.setSelectionRange(0, node.value.length);
  }, [editing, prevEditing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing,
      })}
    >
      <div className="view">
        <input className="toggle" type="checkbox" checked={todo.completed} onChange={onToggle} />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button className="destroy" onClick={onDestroy}></button>
      </div>
      {editing ? (
        <input
          ref={editFieldRef}
          className="edit"
          value={editText}
          onBlur={handleSubmit}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ) : null}
    </li>
  );
}

export default memo(TodoListItem);
