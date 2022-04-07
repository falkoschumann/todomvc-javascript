import { MessageHandler } from './MessageHandler';
import { MemoryTodosRepository as TodosRepository } from './adapters/MemoryTodosRepository';

describe('Add todo', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });

  it('saves new todo and return it with created id', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.addTodo('Buy a Unicorn');

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.addTodo('');

    const todos = todosRepository.load();
    expect(todos).toEqual([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});

describe('Toggle all', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('set all todos completed', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.toggleAll(true);

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.toggleAll(false);

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Toggle', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('marks the todo as completed', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.toggle(2);

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.toggle(1);

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Destroy', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes the todo', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.destroy(1);

    const todos = todosRepository.load();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Save', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('changes the todos title', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.save(1, 'Taste TypeScript');

    const todos = todosRepository.load();
    expect(todos).toEqual([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Clear completed', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes completed todos', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    await messageHandler.clearCompleted();

    const todos = todosRepository.load();
    expect(todos).toEqual([{ id: 2, title: 'Buy a Unicorn', completed: false }]);
  });
});

describe('Select todos', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('selected all todos', async () => {
    const messageHandler = new MessageHandler(todosRepository);

    const todos = await messageHandler.selectTodos();

    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
