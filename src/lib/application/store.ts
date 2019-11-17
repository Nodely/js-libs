/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import { createStore, applyMiddleware, compose , Store, StoreEnhancer } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { IRootState, createRootReducer } from '../modules'

export const history = createBrowserHistory();


const initialState = window.INITIAL_REDUX_STATE;

const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window['devToolsExtension'];

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers: StoreEnhancer<IRootState> = compose<any>(
    applyMiddleware(...middleware),
    ...enhancers
);

const store: Store<IRootState> = createStore<IRootState>(
    createRootReducer(history),
    initialState,
    composedEnhancers
);

export default store