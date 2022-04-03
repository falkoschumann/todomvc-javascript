export class MessageHandler {
  #todosRepository;
  #todos;

  constructor(todosRepository) {
    this.#todosRepository = todosRepository;
    this.#todos = todosRepository.load();
  }

  async addTodo(title) {
    if (!title) {
      return;
    }

    let id = this.#todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
    id++;
    this.#todos = [...this.#todos, { id, title, completed: false }];
    this.#todosRepository.store(this.#todos);
  }

  async toggleAll(checked) {
    this.#todos = this.#todos.map((todo) => ({ ...todo, completed: checked }));
    this.#todosRepository.store(this.#todos);
  }

  async toggle(todoId) {
    this.#todos = this.#todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.#todosRepository.store(this.#todos);
  }

  async destroy(todoId) {
    this.#todos = this.#todos.filter((todo) => todo.id !== todoId);
    this.#todosRepository.store(this.#todos);
  }

  async save(todoId, newTitle) {
    this.#todos = this.#todos.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
    this.#todosRepository.store(this.#todos);
  }

  async clearCompleted() {
    this.#todos = this.#todos.filter((todo) => !todo.completed);
    this.#todosRepository.store(this.#todos);
  }

  async selectTodos() {
    return [...this.#todos];
  }
}
