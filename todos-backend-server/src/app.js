import bodyParser from 'body-parser';
import express from 'express';

import { messageHandler } from 'todos-backend';

import createTodosRouter from './routes/todos.js';
import todosRepository from './adapters/FileTodosRepository.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(createTodosRouter(messageHandler, todosRepository));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
