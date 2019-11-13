/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as toastr } from 'react-redux-toastr'
import common from './common'
import parts from './parts'
import auth from './auth'
import forms from './forms'

export default function createReducer(history) {
    return combineReducers({
        router: connectRouter(history),
        auth,
        common,
        parts,
        toastr,
        forms
    })
}