import { MessageHandler } from './MessageHandler';
import { TodosRepository } from './adapters/providers/TodosRepository';

jest.mock('./adapters/providers/TodosRepository');

beforeEach(() => {
  TodosRepository.mockClear();
});

describe('Add todo', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });

  it('saves new todo', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.addTodo('Buy a Unicorn');

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('does nothing if title is empty', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.addTodo('');

    expect(todosRepository.store).not.toBeCalled();
  });
});

describe('Toggle all', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('set all todos completed', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.toggleAll(true);

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('set all todos active', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.toggleAll(false);

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Toggle', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('marks the todo as completed', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.toggle(2);

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: true },
    ]);
  });

  it('marks the todo as active', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.toggle(1);

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste JavaScript', completed: false },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Destroy', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes the todo', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.destroy(1);

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Save', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('changes the todos title', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.save(1, 'Taste TypeScript');

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 1, title: 'Taste TypeScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Clear completed', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('removes completed todos', () => {
    const messageHandler = new MessageHandler(todosRepository);

    messageHandler.clearCompleted();

    expect(todosRepository.store).toBeCalledTimes(1);
    expect(todosRepository.store).toBeCalledWith([
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});

describe('Todos', () => {
  let todosRepository;
  beforeEach(() => {
    todosRepository = new TodosRepository();
    todosRepository.load = jest.fn(() => [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });

  it('loaded while initialization', () => {
    const messageHandler = new MessageHandler(todosRepository);

    const todos = messageHandler.todos();
    expect(todos).toEqual([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy a Unicorn', completed: false },
    ]);
  });
});
