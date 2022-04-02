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
    dispatch({ type: 'TODOS_LOADED', todos: messageHandler.todos() });
  }, [messageHandler]);

  const onLocationChanged = useCallback((pathname) => {
    dispatch({ type: 'LOCATION_CHANGED', pathname });
  }, []);

  const onUpdateNewTodo = useCallback((text) => {
    dispatch({ type: 'UPDATE_NEW_TODO', text });
  }, []);

  const onAddTodo = useCallback(
    (text) => {
      messageHandler.addTodo(text);
      dispatch({ type: 'TODO_ADDED', todos: messageHandler.todos() });
    },
    [messageHandler]
  );

  const onToggleAll = useCallback(
    (checked) => {
      messageHandler.toggleAll(checked);
      dispatch({ type: 'TOGGLED_ALL', todos: messageHandler.todos() });
    },
    [messageHandler]
  );

  const onToggle = useCallback(
    (todoId) => {
      messageHandler.toggle(todoId);
      dispatch({ type: 'TOGGLED', todos: messageHandler.todos() });
    },
    [messageHandler]
  );

  const onDestroy = useCallback(
    (todoId) => {
      messageHandler.destroy(todoId);
      dispatch({ type: 'DESTROYED', todos: messageHandler.todos() });
    },
    [messageHandler]
  );

  const onEdit = useCallback((todoId) => {
    dispatch({ type: 'EDIT', todoId });
  }, []);

  const onSave = useCallback(
    (todoId, newTitle) => {
      messageHandler.save(todoId, newTitle);
      dispatch({ type: 'SAVED', todos: messageHandler.todos() });
    },
    [messageHandler]
  );

  const onCancel = useCallback(() => {
    dispatch({ type: 'CANCEL' });
  }, []);

  const onClearCompleted = useCallback(() => {
    messageHandler.clearCompleted();
    dispatch({ type: 'CLEARED_COMPLETED', todos: messageHandler.todos() });
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
