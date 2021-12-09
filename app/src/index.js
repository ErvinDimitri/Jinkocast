import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux"
import {reducer} from "../src/reducers/reducer"
import {Provider} from "react-redux"

const store = createStore(
    reducer
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
    );

serviceWorker.unregister();
