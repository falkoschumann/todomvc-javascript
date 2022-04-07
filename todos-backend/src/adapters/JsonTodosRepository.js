import fs from 'fs';
import path from 'path';

export class JsonTodosRepository {
  #file;

  constructor(file = './data/todos.json') {
    this.#file = file;
  }

  load() {
    if (!fs.existsSync(this.#file)) {
      return [];
    }

    const json = fs.readFileSync(this.#file, 'utf8');
    return JSON.parse(json);
  }

  store(todos) {
    const dir = path.dirname(this.#file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const json = JSON.stringify(todos);
    fs.writeFileSync(this.#file, json, 'utf8');
  }
}
