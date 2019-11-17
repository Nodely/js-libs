/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 02/13/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from 'react'
import { ReactElementLike } from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import ReduxToastr from 'react-redux-toastr'

import store, { history } from './store'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

interface MainProps {
    children: ReactElementLike
}

const Nodely: React.FC<MainProps> = ({children}) => {
    return (
        <Provider store={store as any}>
            <ConnectedRouter history={history}>
                <div>
                    {children}
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar />
                </div>
            </ConnectedRouter>
        </Provider>
    )
}

export default Nodely;