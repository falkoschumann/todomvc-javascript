import bodyParser from 'body-parser';
import express from 'express';

import { MessageHandler } from 'todos-backend';
//import { MemoryTodosRepository as TodosRepository} from 'todos-backend';
import { JsonTodosRepository as TodosRepository } from 'todos-backend';
import { createTodosRouter } from './routes/todos.js';

const todosRepository = new TodosRepository();
const messageHandler = new MessageHandler(todosRepository);

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

app.use(createTodosRouter(messageHandler));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
