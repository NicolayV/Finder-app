import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootRducer from './store/reducers/rooyReducer'
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(rootRducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  // компонент провайдер позволяет нам работать с redux, с помощью provider передаем наш store приложению
  <Provider store={store}>
    <App />
  </Provider>

)

ReactDOM.render(app, document.getElementById('root'));

