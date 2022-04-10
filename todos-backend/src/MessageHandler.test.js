import messageHandler from './MessageHandler';
import todosRepository from './adapters/MemoryTodosRepository';

describe('Add todo', () => {
  beforeEach(() => {
    todosRepository.storeTodos([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });

  it('saves new todo and return it with created id', async () => {
    await messageHandler.addTodo(todosRepository, { title: 'Buy a Unicorn' });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', async () => {
    await messageHandler.addTodo(todosRepository, { title: '' });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});

describe('Toggle all', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('set all todos completed', async () => {
    await messageHandler.toggleAll(todosRepository, { checked: true });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', async () => {
    await messageHandler.toggleAll(todosRepository, { checked: false });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Toggle', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('marks the todo as completed', async () => {
    await messageHandler.toggle(todosRepository, { todoId: 2 });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', async () => {
    await messageHandler.toggle(todosRepository, { todoId: 1 });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Destroy', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes the todo', async () => {
    await messageHandler.destroy(todosRepository, { todoId: 1 });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Save', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('changes the todos title', async () => {
    await messageHandler.save(todosRepository, { todoId: 1, newTitle: 'Taste TypeScript' });

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Clear completed', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes completed todos', async () => {
    await messageHandler.clearCompleted(todosRepository);

    const todos = todosRepository.loadTodos();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Select todos', () => {
  beforeEach(() => {
    todosRepository.storeTodos([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('selected all todos', async () => {
    const todos = await messageHandler.selectTodos(todosRepository);

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
