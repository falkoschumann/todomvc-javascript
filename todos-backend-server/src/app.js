import bodyParser from 'body-parser';
import express from 'express';

import { messageHandler, fileTodosRepository as todosRepository } from 'todos-backend';
import createTodosRouter from './routes/todos.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(createTodosRouter(messageHandler, todosRepository));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
