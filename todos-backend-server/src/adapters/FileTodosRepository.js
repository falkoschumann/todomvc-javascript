import fs from 'fs';
import path from 'path';

function loadTodos(file = './data/todos.json') {
  if (!fs.existsSync(file)) {
    return [];
  }

  const json = fs.readFileSync(file, 'utf8');
  return JSON.parse(json);
}

function storeTodos(todos, file = './data/todos.json') {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const json = JSON.stringify(todos);
  fs.writeFileSync(file, json, 'utf8');
}

export default { loadTodos, storeTodos };
