let todos = [];

function createTodo(todo) {
  let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
  id++;

  todo = { completed: false, ...todo, id };
  todos.push(todo);
  return todo;
}

function retrieveTodos() {
  return [...todos];
}

function retrieveTodo(todoId) {
  return todos.find((todo) => todo.id == todoId);
}

function updateTodo(todo) {
  todos = todos.map((it) => (todo.id === it.id ? { ...it, ...todo } : it));
}

function deleteTodo(todoId) {
  todos = todos.filter((todo) => todo.id != todoId);
}

function toggleTodo(todoId) {
  todos = todos.map((todo) => (todo.id == todoId ? { ...todo, completed: !todo.completed } : todo));
}

function toggleAllTodos(checked) {
  todos = todos.map((todo) => ({ ...todo, completed: checked }));
}

function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
}

export default {
  createTodo,
  retrieveTodos,
  retrieveTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  toggleAllTodos,
  clearCompletedTodos,
};
