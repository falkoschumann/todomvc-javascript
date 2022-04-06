export class MemoryTodosRepository {
  #todos;

  constructor(todos = []) {
    this.#todos = todos;
  }

  load() {
    return this.#todos;
  }

  store(todos) {
    this.#todos = todos;
  }
}
