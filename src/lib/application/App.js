/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 02/13/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import ReduxToastr from 'react-redux-toastr'
import store, {history} from './store'

import App from './App';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


export default () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar/>
            </div>
        </ConnectedRouter>
    </Provider>
)