import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());

let todos = [];

app.post('/api/todos', (req, res) => {
  let id = todos.map((todo) => todo.id).reduce((id1, id2) => Math.max(id1, id2), 0);
  id++;

  let todo = req.body;

  todo = { completed: false, ...todo, id };
  todos.push(todo);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Location', `${req.protocol}://${req.hostname}:${port}/api/todos/${id}`);
  res.status(201);
  res.send(todo);
});

app.get('/api/todos', (req, res) => {
  res.send(todos);
});

app.get('/api/todos/:id', (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (!todo) {
    res.sendStatus(404);
    return;
  }

  res.send(todo);
});

app.put('/api/todos/:id', (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (!todo) {
    res.sendStatus(404);
    return;
  }

  todo = { ...todo, ...req.body };
  todos = todos.map((it) => (todo.id === it.id ? todo : it));

  res.sendStatus(204);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id != req.params.id);
  res.sendStatus(204);
});

app.post('/api/todos/:id/toggle', (req, res) => {
  todos = todos.map((todo) =>
    todo.id == req.params.id ? { ...todo, completed: !todo.completed } : todo
  );
  res.sendStatus(204);
});

app.post('/api/todos/toggle-all', (req, res) => {
  console.log('Toggle all', req.body);
  const { checked } = req.body;
  if (checked == null) {
    res.sendStatus(400);
    return;
  }

  todos = todos.map((todo) => ({ ...todo, completed: checked }));
  res.sendStatus(204);
});

app.post('/api/todos/clear-completed', (req, res) => {
  todos = todos.filter((todo) => !todo.completed);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
