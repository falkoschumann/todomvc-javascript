import bodyParser from 'body-parser';
import express from 'express';

import {
  deleteTodo,
  getTodos,
  postClearCompletedTodos,
  postTodo,
  postToggleAllTodos,
  postToggleTodo,
  putTodo,
} from './adapters/portals/todoController.js';
import { MemoryTodosRepository } from './adapters/providers/MemoryTodosRepository.js';
import { MessageHandler } from './MessageHandler.js';

const todosRepository = new MemoryTodosRepository();
const messageHandler = new MessageHandler(todosRepository);

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.post(
  '/api/todos',
  postTodo((title) => messageHandler.addTodo(title))
);
app.get(
  '/api/todos',
  getTodos(() => messageHandler.selectTodos())
);
app.put(
  '/api/todos/:id',
  putTodo((todoId, newTitle) => messageHandler.save(todoId, newTitle))
);
app.delete(
  '/api/todos/:id',
  deleteTodo((todoId) => messageHandler.destroy(todoId))
);
app.post(
  '/api/todos/:id/toggle',
  postToggleTodo((todoId) => messageHandler.toggle(todoId))
);
app.post(
  '/api/todos/toggle-all',
  postToggleAllTodos((checked) => messageHandler.toggleAll(checked))
);
app.post(
  '/api/todos/clear-completed',
  postClearCompletedTodos(() => messageHandler.clearCompleted())
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
