import React from 'react';
import ReactDOM from 'react-dom';

import App from './demo/App';
import {Nodely} from './lib'

ReactDOM.render(
    <Nodely>
        <App/>
    </Nodely>, document.getElementById('root'));
