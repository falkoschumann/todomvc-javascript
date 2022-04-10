import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';

import { initialState, reducer } from './reducer';
import todosApi from '../api/TodosApi';

const StoreContext = createContext({
  ...initialState,
  onLocationChanged: (pathname) => {},
  onUpdateNewTodo: (text) => {},
  onAddTodo: (text) => {},
  onToggleAll: (checked) => {},
  onToggle: (todoId) => {},
  onDestroy: (todoId) => {},
  onEdit: (todoId) => {},
  onSave: (todoId, newTitle) => {},
  onCancel: () => {},
  onClearCompleted: () => {},
});

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadTodos() {
      const todos = await todosApi.selectTodos();
      dispatch({ type: 'TODOS_LOADED', todos });
    }

    loadTodos();
  }, []);

  const onLocationChanged = useCallback((pathname) => {
    dispatch({ type: 'LOCATION_CHANGED', pathname });
  }, []);

  const onUpdateNewTodo = useCallback((text) => {
    dispatch({ type: 'UPDATE_NEW_TODO', text });
  }, []);

  const onAddTodo = useCallback(async (text) => {
    await todosApi.addTodo({ text });
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'TODO_ADDED', todos });
  }, []);

  const onToggleAll = useCallback(async (checked) => {
    await todosApi.toggleAll({ checked });
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'TOGGLED_ALL', todos });
  }, []);

  const onToggle = useCallback(async (todoId) => {
    await todosApi.toggle({ todoId });
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'TOGGLED', todos });
  }, []);

  const onDestroy = useCallback(async (todoId) => {
    await todosApi.destroy({ todoId });
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'DESTROYED', todos });
  }, []);

  const onEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const onSave = useCallback(async (todoId, newTitle) => {
    await todosApi.save({ todoId, newTitle });
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'SAVED', todos });
  }, []);

  const onCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const onClearCompleted = useCallback(async () => {
    await todosApi.clearCompleted();
    const todos = await todosApi.selectTodos();
    dispatch({ type: 'CLEARED_COMPLETED', todos });
  }, []);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        onLocationChanged,
        onUpdateNewTodo,
        onAddTodo,
        onToggleAll,
        onToggle,
        onDestroy,
        onEdit,
        onSave,
        onCancel,
        onClearCompleted,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
