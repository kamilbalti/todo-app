import RootReducer from "./store/rootreducer"
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
// import SignIn from "./signIn";
// import SignUp from "./signUp";
import Router2 from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(RootReducer);
ReactDOM.render(
    <Provider store={store}>
      {/* <App /> */}
      <Router2 />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
