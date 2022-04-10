# TodoMVC JavaScript mit React und Express

## Commands

- addTodo(title) -> post /api/todos
- toggleAll(checked) -> post /api/todos/toggle-all
- toggle(todoId) -> post /api/todos/:id/toggle
- destroy(todoId) -> delete /api/todos/:id
- save(todoId, newTitle) -> put /api/todos/:id
- clearCompleted() -> post /api/todos/clear-completed

## Queries

- selectTodos() -> get /api/todos

## Endpoints

- post /api/todos -> addTodo(title)
- get /api/todos -> selectTodos()
- get /api/todos/:id -> ???
- put /api/todos/:id -> save(todoId, newTitle)
- delete /api/todos/:id -> destroy(todoId)
- post /api/todos/:id/toggle -> toggle(todoId)
- post /api/todos/toggle-all -> toggleAll(checked)
- post /api/todos/clear-completed -> clearCompleted()
