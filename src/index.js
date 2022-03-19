import React from 'react';

import { Provider } from "react-redux";
import { createStore } from "redux";
import ReactDOM from 'react-dom';
import App from './react/App';
import reportWebVitals from './react/reportWebVitals';
import rootReducer from "./react/reducers";

let store = createStore(rootReducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
