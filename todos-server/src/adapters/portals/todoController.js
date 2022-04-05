import model from '../../domain/todos.js';

export function postTodo(req, res) {
  let todo = req.body;
  todo = model.createTodo(todo);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Location', `${req.protocol}://${req.hostname}:${req.port}/api/todos/${todo.id}`);
  res.status(201);
  res.send(todo);
}

export function getTodos(req, res) {
  const todos = model.retrieveTodos();
  res.send(todos);
}

export function getTodo(req, res) {
  const todo = model.retrieveTodo(req.params.id);
  if (!todo) {
    res.sendStatus(404);
    return;
  }

  res.send(todo);
}

export function putTodo(req, res) {
  const todo = model.retrieveTodo(req.params.id);
  if (!todo) {
    res.sendStatus(404);
    return;
  }

  model.updateTodo(req.body);
  res.sendStatus(204);
}

export function deleteTodo(req, res) {
  model.deleteTodo(req.params.id);
  res.sendStatus(204);
}

export function postToggleTodo(req, res) {
  model.toggleTodo(req.params.id);
  res.sendStatus(204);
}

export function postToggleAllTodos(req, res) {
  const { checked } = req.body;
  if (checked == null) {
    res.sendStatus(400);
    return;
  }

  model.toggleAllTodos(checked);
  res.sendStatus(204);
}

export function postClearCompletedTodos(req, res) {
  model.clearCompletedTodos();
  res.sendStatus(204);
}
