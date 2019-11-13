/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 02/13/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import ReduxToastr from 'react-redux-toastr'
import store, {history} from './store'

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class Nodely extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        {this.props.children}
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
    }
}

Nodely.propTypes = {
    children: PropTypes.element.isRequired
};

export default Nodely;