/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as toastr } from 'react-redux-toastr'
import { History } from 'history'

import { ICommonState, reducer as common } from './common'
import { IAuthState, reducer as auth } from './auth'
import { IFormState, reducer as forms } from './forms'

export interface IRootState {
    auth: IAuthState
    common: ICommonState
    forms: IFormState
}

export const createRootReducer: any = (history: History) => combineReducers({
    router: connectRouter(history),
    toastr,
    auth,
    forms,
    common
})