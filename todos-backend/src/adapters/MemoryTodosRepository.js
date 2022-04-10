let storedTodos = [];

function loadTodos() {
  return storedTodos;
}

function storeTodos(todos) {
  storedTodos = todos;
}

export default { loadTodos, storeTodos };
