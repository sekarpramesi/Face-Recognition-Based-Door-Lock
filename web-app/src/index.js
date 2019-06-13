import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './mainApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainApp />, document.getElementById('root'));
serviceWorker.unregister();
