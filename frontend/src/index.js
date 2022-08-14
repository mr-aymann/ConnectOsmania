import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TimeAgo from "javascript-time-ago";
import { Provider } from "react-redux";
import store from "./app/store";
import en from "javascript-time-ago/locale/en.json";
// import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(en);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
    <App />
  </Provider>
  
);

