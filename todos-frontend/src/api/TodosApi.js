const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export class TodosApi {
  async create(todo) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async retrieve() {
    const response = await fetch('/api/todos');
    return response.json();
  }

  async update(todo) {
    await fetch(`/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(todo),
    });
  }

  async delete(todoId) {
    await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });
  }

  async toggle(todoId) {
    await fetch(`/api/todos/${todoId}/toggle`, {
      method: 'POST',
      body: '',
    });
  }

  async toggleAll(checked) {
    await fetch('/api/todos/toggle-all', {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ checked }),
    });
  }

  async clearCompleted() {
    await fetch('/api/todos/clear-completed', {
      method: 'POST',
      body: '',
    });
  }
}
