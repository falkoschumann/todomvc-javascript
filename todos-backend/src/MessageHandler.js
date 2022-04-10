async function addTodo({ loadTodos, storeTodos }, { title }) {
  if (!title) {
    return;
  }

  let todos = loadTodos();
  let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
  id++;
  const newTodo = { id, title, completed: false };
  todos = [...todos, newTodo];
  storeTodos(todos);
}

async function toggleAll({ loadTodos, storeTodos }, { checked }) {
  let todos = loadTodos();
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
  storeTodos(todos);
}

async function toggle({ loadTodos, storeTodos }, { todoId }) {
  let todos = loadTodos();
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
  );
  storeTodos(todos);
}

async function destroy({ loadTodos, storeTodos }, { todoId }) {
  let todos = loadTodos();
  todos = todos.filter((todo) => todo.id !== todoId);
  storeTodos(todos);
}

async function save({ loadTodos, storeTodos }, { todoId, newTitle }) {
  let todos = loadTodos();
  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, title: newTitle } : todo));
  storeTodos(todos);
}

async function clearCompleted({ loadTodos, storeTodos }) {
  let todos = loadTodos();
  todos = todos.filter((todo) => !todo.completed);
  storeTodos(todos);
}

async function selectTodos({ loadTodos }) {
  let todos = loadTodos();
  return [...todos];
}

export default { addTodo, toggleAll, toggle, destroy, save, clearCompleted, selectTodos };
