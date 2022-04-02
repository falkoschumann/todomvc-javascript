export class MessageHandler {
  constructor(todosRepository) {
    this._todosRepository = todosRepository;
    this._todos = todosRepository.load();
  }

  addTodo(title) {
    if (!title) {
      return;
    }

    let id = this._todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 1);
    id++;
    this._todos = this._todos.concat({ id, title, completed: false });
    this._todosRepository.store(this._todos);
  }

  toggleAll(checked) {
    this._todos = this._todos.map((todo) => ({ ...todo, completed: checked }));
    this._todosRepository.store(this._todos);
  }

  toggle(todoId) {
    this._todos = this._todos.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, completed: !todo.completed }
    );
    this._todosRepository.store(this._todos);
  }

  destroy(todoId) {
    this._todos = this._todos.filter((todo) => todo.id !== todoId);
    this._todosRepository.store(this._todos);
  }

  save(todoId, newTitle) {
    this._todos = this._todos.map((todo) =>
      todo.id !== todoId ? todo : { ...todo, title: newTitle }
    );
    this._todosRepository.store(this._todos);
  }

  clearCompleted() {
    this._todos = this._todos.filter((todo) => !todo.completed);
    this._todosRepository.store(this._todos);
  }

  todos() {
    return this._todos;
  }
}
