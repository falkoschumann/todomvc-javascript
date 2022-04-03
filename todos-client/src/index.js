import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './adapters/portals/App';
//import { MessageHandler } from './MessageHandler';
import { RestMessageHandler as MessageHandler } from './RestMessageHandler';
import { StoreProvider } from './adapters/portals/StoreProvider';
import { TodosApi } from './adapters/providers/TodosApi';
//import { LocalStorageTodosRepository as TodosRepository } from './adapters/providers/LocalStorageTodosRepository';
import reportWebVitals from './reportWebVitals';

import './index.css';

const todosApi = new TodosApi();
const messageHandler = new MessageHandler(todosApi);

//const todosRepository = new TodosRepository();
//const messageHandler = new MessageHandler(todosRepository);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider messageHandler={messageHandler}>
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
