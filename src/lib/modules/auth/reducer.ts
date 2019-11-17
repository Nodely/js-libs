/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Reducer } from 'redux'
import { IAuthState, AuthActions, Constants } from './types'

export const init: IAuthState = {
    error: {},
    isLoading: false,
    isLoggedIn: null,
    info: null,
    loggedUser: null,
    updated: false
}

const reducer: Reducer<IAuthState> = (state = init, action: AuthActions) => {
    switch (action.type) {
        case Constants.DATA_REQUESTED:
            return {
                ...state,
                error: {},
                isLoading: action.payload.isLoading
            };
        case Constants.SESSION_SET:
            return {
                ...state,
                isLoggedIn: !!action.payload.data,
                info: action.payload.data
            };
        case Constants.SESSION_USER_SET:
            return {
                ...state,
                loggedUser: action.payload.user || null
            };
        case Constants.DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case Constants.PROFILE_UPDATED:
            return {
                ...state,
                updated: true
            };
        default:
            return state;
    }
}

export default reducer;