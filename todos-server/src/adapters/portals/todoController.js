const CREATED = 201;
const NO_CONTENT = 204;

export function postTodo(addTodo) {
  return async (req, res) => {
    let todo = req.body;
    console.log('Add todo:', todo.title);
    await addTodo(todo.title);
    res.status(CREATED);
  };
}

export function getTodos(selectTodos) {
  return async (req, res) => {
    console.log('Select todos.');
    const todos = await selectTodos();
    res.send(todos);
  };
}

export function putTodo(save) {
  return async (req, res) => {
    const todoId = req.params.id;
    const todo = req.body;
    console.log('Save:', todoId, todo.title);
    await save(todoId, todo.title);
    res.sendStatus(NO_CONTENT);
  };
}

export function deleteTodo(destroy) {
  return async (req, res) => {
    const todoId = req.params.id;
    console.log('Destroy:', todoId);
    await destroy(todoId);
    res.sendStatus(NO_CONTENT);
  };
}

export function postToggleTodo(toggle) {
  return async (req, res) => {
    const todoId = req.params.id;
    console.log('Toggle:', todoId);
    await toggle(todoId);
    res.sendStatus(NO_CONTENT);
  };
}

export function postToggleAllTodos(toggleAll) {
  return async (req, res) => {
    const { checked } = req.body;
    console.log('Toggle all:', checked);
    await toggleAll(checked);
    res.sendStatus(NO_CONTENT);
  };
}

export function postClearCompletedTodos(clearCompleted) {
  return async (req, res) => {
    console.log('Clear completed.');
    await clearCompleted();
    res.sendStatus(NO_CONTENT);
  };
}
