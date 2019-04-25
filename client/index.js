import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import history from './history';

ReactDOM.render(
  <BrowserRouter hostory={history}>
    <App />
  </BrowserRouter>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);
