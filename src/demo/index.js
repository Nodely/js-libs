import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Nodely from '../lib'

ReactDOM.render(
    <Nodely>
        <App/>
    </Nodely>, document.getElementById('root'));

registerServiceWorker();
