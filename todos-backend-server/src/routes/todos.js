import { Router } from 'express';

import {
  deleteTodo,
  getTodos,
  postClearCompletedTodos,
  postTodo,
  postToggleAllTodos,
  postToggleTodo,
  putTodo,
} from '../controllers/todos.js';

export function createTodosRouter(messageHandler) {
  const router = new Router();

  router.post(
    '/api/todos',
    postTodo((title) => messageHandler.addTodo(title))
  );

  router.get(
    '/api/todos',
    getTodos(() => messageHandler.selectTodos())
  );

  router.put(
    '/api/todos/:id',
    putTodo((todoId, newTitle) => messageHandler.save(todoId, newTitle))
  );

  router.delete(
    '/api/todos/:id',
    deleteTodo((todoId) => messageHandler.destroy(todoId))
  );

  router.post(
    '/api/todos/:id/toggle',
    postToggleTodo((todoId) => messageHandler.toggle(todoId))
  );

  router.post(
    '/api/todos/toggle-all',
    postToggleAllTodos((checked) => messageHandler.toggleAll(checked))
  );

  router.post(
    '/api/todos/clear-completed',
    postClearCompletedTodos(() => messageHandler.clearCompleted())
  );

  return router;
}
