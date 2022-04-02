export class TodosRepository {
  load() {
    const json = localStorage.getItem('todos');
    if (!json) {
      return [];
    }

    const todos = JSON.parse(json);
    return todos;
  }

  store(todos) {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }
}
