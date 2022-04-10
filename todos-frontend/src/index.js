import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//import { messageHandler, localStorageTodosRepository as todosRepository } from 'todos-backend';
import App from './components/App';
import { StoreProvider } from './components/StoreProvider';
import reportWebVitals from './reportWebVitals';
import todosApi from './api/TodosApi';

import './index.css';

/*
const localStorageMessageHandler = {
  addTodo: ({ title }) => messageHandler.addTodo(todosRepository, { title }),
  toggleAll: ({ checked }) => messageHandler.toggleAll(todosRepository, { checked }),
  toggle: ({ todoId }) => messageHandler.toggle(todosRepository, { todoId }),
  destroy: ({ todoId }) => messageHandler.destroy(todosRepository, { todoId }),
  save: ({ todoId, newTitle }) => messageHandler.save(todosRepository, { todoId, newTitle }),
  clearCompleted: () => messageHandler.clearCompleted(todosRepository),
  selectTodos: () => messageHandler.selectTodos(todosRepository),
};
*/
const apiMessageHandler = {
  addTodo: ({ title }) => todosApi.addTodo({ title }),
  toggleAll: ({ checked }) => todosApi.toggleAll({ checked }),
  toggle: ({ todoId }) => todosApi.toggle({ todoId }),
  destroy: ({ todoId }) => todosApi.destroy({ todoId }),
  save: ({ todoId, newTitle }) => todosApi.save({ todoId, newTitle }),
  clearCompleted: () => todosApi.clearCompleted(),
  selectTodos: () => todosApi.selectTodos(),
};

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider messageHandler={apiMessageHandler}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
