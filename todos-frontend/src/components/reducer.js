import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from './constants';

export const initialState = {
  nowShowing: ALL_TODOS,
  editing: null,
  newTodo: '',
  todos: [],
  shownTodos: [],
  activeTodoCount: 0,
  completedCount: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case 'LOCATION_CHANGED': {
      const nowShowing = getShowingForPathname(action.pathname);
      return { ...state, nowShowing, ...getShownTodos(state.todos, nowShowing) };
    }
    case 'UPDATE_NEW_TODO':
      return { ...state, newTodo: action.text };
    case 'TODO_ADDED':
      return {
        ...state,
        todos: action.todos,
        newTodo: '',
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'TODOS_LOADED':
    case 'TOGGLED_ALL':
    case 'TOGGLED':
    case 'DESTROYED':
    case 'CLEARED_COMPLETED':
      return { ...state, todos: action.todos, ...getShownTodos(action.todos, state.nowShowing) };
    case 'EDIT':
      return { ...state, editing: action.todoId };
    case 'SAVED':
      return {
        ...state,
        todos: action.todos,
        editing: null,
        ...getShownTodos(action.todos, state.nowShowing),
      };
    case 'CANCEL':
      return { ...state, editing: null };
    default:
      throw new Error('Unreachable code');
  }
}

function getShowingForPathname(pathname) {
  switch (pathname) {
    case '/active':
      return ACTIVE_TODOS;
    case '/completed':
      return COMPLETED_TODOS;
    default:
      return ALL_TODOS;
  }
}

function getShownTodos(todos, nowShowing) {
  const shownTodos = todos.filter((todo) => {
    switch (nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      case ALL_TODOS:
      default:
        return true;
    }
  });
  const activeTodoCount = todos.reduce((count, todo) => {
    return todo.completed ? count : count + 1;
  }, 0);
  const completedCount = todos.length - activeTodoCount;
  return { shownTodos, activeTodoCount, completedCount };
}
