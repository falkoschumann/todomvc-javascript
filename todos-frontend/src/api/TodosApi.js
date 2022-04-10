const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

async function addTodo({ title }) {
  await fetch('/api/todos', {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ title }),
  });
}

async function toggleAll({ checked }) {
  await fetch('/api/todos/toggle-all', {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ checked }),
  });
}

async function toggle({ todoId }) {
  await fetch(`/api/todos/${todoId}/toggle`, {
    method: 'POST',
    body: '',
  });
}

async function destroy({ todoId }) {
  await fetch(`/api/todos/${todoId}`, {
    method: 'DELETE',
  });
}
async function save({ todoId, newTitle }) {
  await fetch(`/api/todos/${todoId}`, {
    method: 'PUT',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ title: newTitle }),
  });
}

async function clearCompleted() {
  await fetch('/api/todos/clear-completed', {
    method: 'POST',
    body: '',
  });
}

async function selectTodos() {
  const response = await fetch('/api/todos');
  return response.json();
}

const todosApi = { addTodo, toggleAll, toggle, destroy, save, clearCompleted, selectTodos };
export default todosApi;
