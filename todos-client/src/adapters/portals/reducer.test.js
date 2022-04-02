import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from './constants';
import { initialState, reducer } from './reducer';

describe('Location changed', () => {
  it('now showing all todo', () => {
    let state = {
      ...initialState,
      nowShowing: ACTIVE_TODOS,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    const action = {
      type: 'LOCATION_CHANGED',
      pathname: '/',
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });

  it('now showing active todo', () => {
    let state = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    const action = {
      type: 'LOCATION_CHANGED',
      pathname: '/active',
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ACTIVE_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });

  it('now showing completed todo', () => {
    let state = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    const action = {
      type: 'LOCATION_CHANGED',
      pathname: '/completed',
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: COMPLETED_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Todos loaded', () => {
  it('updates todo', () => {
    const action = {
      type: 'TODOS_LOADED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Update new todo', () => {
  it('updates new todos text', () => {
    const action = {
      type: 'UPDATE_NEW_TODO',
      text: 'Taste JavaScript',
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: 'Taste JavaScript',
      todos: [],
      shownTodos: [],
      activeTodoCount: 0,
      completedCount: 0,
    });
  });
});

describe('Todo added', () => {
  it('clears new todo text and updates todos', () => {
    let state = {
      ...initialState,
      newTodo: 'Buy a Unicorn',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
    };
    const action = {
      type: 'TODO_ADDED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Toggled all', () => {
  it('updates todos', () => {
    const action = {
      type: 'TOGGLED_ALL',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: true },
      ],
      activeTodoCount: 0,
      completedCount: 2,
    });
  });
});

describe('Toggled', () => {
  it('updates todos', () => {
    const action = {
      type: 'TOGGLED',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Destroyed', () => {
  it('updates todos', () => {
    const action = {
      type: 'DESTROYED',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      shownTodos: [{ id: 1, title: 'Taste JavaScript', completed: true }],
      activeTodoCount: 0,
      completedCount: 1,
    });
  });
});

describe('Edit', () => {
  it('remembers editing todo', () => {
    let state = {
      ...initialState,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    };
    const action = {
      type: 'EDIT',
      todoId: 1,
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: 1,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Saved', () => {
  it('clears editing todo and updates todos', () => {
    let state = {
      ...initialState,
      editing: 1,
    };
    const action = {
      type: 'SAVED',
      todos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Cancel', () => {
  it('clears editing todo', () => {
    let state = {
      ...initialState,
      editing: 1,
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    };
    const action = {
      type: 'CANCEL',
    };
    state = reducer(state, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      shownTodos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy a Unicorn', completed: false },
      ],
      activeTodoCount: 1,
      completedCount: 1,
    });
  });
});

describe('Cleared completed', () => {
  it('updates todos', () => {
    const action = {
      type: 'CLEARED_COMPLETED',
      todos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: '',
      todos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      shownTodos: [{ id: 2, title: 'Buy a Unicorn', completed: false }],
      activeTodoCount: 1,
      completedCount: 0,
    });
  });
});

describe('Unexpected state', () => {
  it('throw error if action is unknown', () => {
    expect(() => reducer(initialState, { type: 'foobar' })).toThrow('Unreachable code');
  });
});
