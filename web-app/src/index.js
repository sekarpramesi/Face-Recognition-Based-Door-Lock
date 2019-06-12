import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthExample from './scenes/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AuthExample />, document.getElementById('root'));
serviceWorker.unregister();
