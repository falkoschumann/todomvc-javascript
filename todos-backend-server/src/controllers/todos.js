const CREATED = 201;
const NO_CONTENT = 204;

export function postTodo(addTodo) {
  return async (req, res) => {
    let title = String(req.body.title);
    await addTodo(title);
    res.status(CREATED);
  };
}

export function getTodos(selectTodos) {
  return async (req, res) => {
    const todos = await selectTodos();
    res.send(todos);
  };
}

export function putTodo(save) {
  return async (req, res) => {
    const todoId = Number(req.params.id);
    const newTitle = String(req.body.title);
    await save(todoId, newTitle);
    res.sendStatus(NO_CONTENT);
  };
}

export function deleteTodo(destroy) {
  return async (req, res) => {
    const todoId = Number(req.params.id);
    await destroy(todoId);
    res.sendStatus(NO_CONTENT);
  };
}

export function postToggleTodo(toggle) {
  return async (req, res) => {
    const todoId = Number(req.params.id);
    await toggle(todoId);
    res.sendStatus(NO_CONTENT);
  };
}

export function postToggleAllTodos(toggleAll) {
  return async (req, res) => {
    const checked = Boolean(req.body.checked);
    await toggleAll(checked);
    res.sendStatus(NO_CONTENT);
  };
}

export function postClearCompletedTodos(clearCompleted) {
  return async (req, res) => {
    await clearCompleted();
    res.sendStatus(NO_CONTENT);
  };
}
