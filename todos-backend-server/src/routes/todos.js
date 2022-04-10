import express from 'express';

import todosController from '../controllers/todos.js';

function createRouter(messageHandler, todosRepository) {
  const router = new express.Router();
  router.post(
    '/api/todos',
    todosController.postTodo({
      addTodo: (title) => messageHandler.addTodo(todosRepository, { title }),
    })
  );
  router.get(
    '/api/todos',
    todosController.getTodos({ selectTodos: () => messageHandler.selectTodos(todosRepository) })
  );
  router.put(
    '/api/todos/:id',
    todosController.putTodo({
      save: (todoId, newTitle) => messageHandler.save(todosRepository, { todoId, newTitle }),
    })
  );
  router.delete(
    '/api/todos/:id',
    todosController.deleteTodo({
      destroy: (todoId) => messageHandler.destroy(todosRepository, { todoId }),
    })
  );
  router.post(
    '/api/todos/:id/toggle',
    todosController.postToggleTodo({
      toggle: (todoId) => messageHandler.toggle(todosRepository, { todoId }),
    })
  );
  router.post(
    '/api/todos/toggle-all',
    todosController.postToggleAllTodos({
      toggleAll: (checked) => messageHandler.toggleAll(todosRepository, { checked }),
    })
  );
  router.post(
    '/api/todos/clear-completed',
    todosController.postClearCompletedTodos({
      clearCompleted: () => messageHandler.clearCompleted(todosRepository),
    })
  );
  return router;
}

export default createRouter;
