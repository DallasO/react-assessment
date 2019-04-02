import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import {createStore } from 'redux'

import Webdev from './Webdev_data2.json';

function webdev(state = Webdev) {
  console.log(state);
  return state;
}

const store = createStore(webdev);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
