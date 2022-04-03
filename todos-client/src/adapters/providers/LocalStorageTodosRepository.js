export class LocalStorageTodosRepository {
  load() {
    const json = localStorage.getItem('todos');
    return json ? JSON.parse(json) : [];
  }

  store(todos) {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }
}
