function Header({ newTodo, onUpdateNewTodo, onAddTodo }) {
  function handleChange(event) {
    onUpdateNewTodo(event.target.value);
  }

  function handleNewTodoKeyDown(event) {
    if (event.code !== 'Enter') {
      return;
    }

    event.preventDefault();

    const text = newTodo.trim();
    if (!text) {
      return;
    }

    onAddTodo(text);
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onKeyDown={handleNewTodoKeyDown}
        onChange={handleChange}
        autoFocus
      />
    </header>
  );
}

export default Header;
