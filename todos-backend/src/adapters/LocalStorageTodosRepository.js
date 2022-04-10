function loadTodos() {
  const json = localStorage.getItem('todos');
  return json ? JSON.parse(json) : [];
}

function storeTodos(todos) {
  const json = JSON.stringify(todos);
  localStorage.setItem('todos', json);
}

export default { loadTodos, storeTodos };
