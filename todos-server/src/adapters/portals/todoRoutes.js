import express from 'express';

import {
  deleteTodo,
  getTodo,
  getTodos,
  postClearCompletedTodos,
  postTodo,
  postToggleAllTodos,
  postToggleTodo,
  putTodo,
} from './todoController.js';

const router = express.Router();

router.post('/api/todos', postTodo);
router.get('/api/todos', getTodos);
router.get('/api/todos/:id', getTodo);
router.put('/api/todos/:id', putTodo);
router.delete('/api/todos/:id', deleteTodo);
router.post('/api/todos/:id/toggle', postToggleTodo);
router.post('/api/todos/toggle-all', postToggleAllTodos);
router.post('/api/todos/clear-completed', postClearCompletedTodos);

export default router;
