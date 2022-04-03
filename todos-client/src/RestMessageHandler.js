export class RestMessageHandler {
  #todosApi;

  constructor(todosApi) {
    this.#todosApi = todosApi;
  }

  async addTodo(title) {
    if (!title) {
      return;
    }

    this.#todosApi.create({ title });
  }

  async toggleAll(checked) {
    this.#todosApi.toggleAll(checked);
  }

  async toggle(todoId) {
    this.#todosApi.toggle(todoId);
  }

  async destroy(todoId) {
    this.#todosApi.delete(todoId);
  }

  async save(todoId, newTitle) {
    this.#todosApi.update({ id: todoId, title: newTitle });
  }

  async clearCompleted() {
    this.#todosApi.clearCompleted();
  }

  async selectTodos() {
    return this.#todosApi.retrieve();
  }
}
