import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from './store/configureStore';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HashRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Router } from 'react-router'
import promiseMiddleware from 'redux-promise';
const createHistory = require("history").createBrowserHistory;

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware, promiseMiddleware, thunk)));

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
      <div>
          <HashRouter>
        <App />
        </HashRouter>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));
serviceWorker.unregister();
