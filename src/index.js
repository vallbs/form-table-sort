import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//custom
//import bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import font awesome styles
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
