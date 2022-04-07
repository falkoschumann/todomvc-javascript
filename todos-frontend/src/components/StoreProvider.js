import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';

import { initialState, reducer } from './reducer';

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

export function StoreProvider({ messageHandler, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadTodos() {
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'TODOS_LOADED', todos });
    }

    loadTodos();
  }, [messageHandler]);

  const onLocationChanged = useCallback((pathname) => {
    dispatch({ type: 'LOCATION_CHANGED', pathname });
  }, []);

  const onUpdateNewTodo = useCallback((text) => {
    dispatch({ type: 'UPDATE_NEW_TODO', text });
  }, []);

  const onAddTodo = useCallback(
    async (text) => {
      await messageHandler.addTodo(text);
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'TODO_ADDED', todos });
    },
    [messageHandler]
  );

  const onToggleAll = useCallback(
    async (checked) => {
      await messageHandler.toggleAll(checked);
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'TOGGLED_ALL', todos });
    },
    [messageHandler]
  );

  const onToggle = useCallback(
    async (todoId) => {
      await messageHandler.toggle(todoId);
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'TOGGLED', todos });
    },
    [messageHandler]
  );

  const onDestroy = useCallback(
    async (todoId) => {
      await messageHandler.destroy(todoId);
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'DESTROYED', todos });
    },
    [messageHandler]
  );

  const onEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const onSave = useCallback(
    async (todoId, newTitle) => {
      await messageHandler.save(todoId, newTitle);
      const todos = await messageHandler.selectTodos();
      dispatch({ type: 'SAVED', todos });
    },
    [messageHandler]
  );

  const onCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const onClearCompleted = useCallback(async () => {
    await messageHandler.clearCompleted();
    const todos = await messageHandler.selectTodos();
    dispatch({ type: 'CLEARED_COMPLETED', todos });
  }, [messageHandler]);

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
