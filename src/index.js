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


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
