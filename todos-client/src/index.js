import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './adapters/portals/App';
import { MessageHandler } from './MessageHandler';
import { StoreProvider } from './adapters/portals/StoreProvider';
import { TodosRepository } from './adapters/providers/TodosRepository';
import reportWebVitals from './reportWebVitals';

import './index.css';

const todosRepository = new TodosRepository();
const messageHandler = new MessageHandler(todosRepository);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider messageHandler={messageHandler}>
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
