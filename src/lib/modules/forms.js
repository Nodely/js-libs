/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */
import * as FormTransport from '../transport/forms'

export const DATA_REQUESTED = "forms/DATA_REQUESTED";
export const DATA_ERROR = "forms/DATA_ERROR";
export const FORM_READY = "forms/FORM_READY";

const initialState = {
    form: null,
    isLoading: false,
    error: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_REQUESTED:
            return {
                ...state,
                error: {},
                isLoading: true
            };
        case DATA_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case FORM_READY:
            return {
                ...state,
                isLoading: false,
                form: action.form
            };
        default:
            return state;
    }
}

export const loadForm = code => {
    return dispatch => {
        dispatch({
            type: DATA_REQUESTED
        });

        FormTransport.loadForm(code).then(form => {
            dispatch({
                type: FORM_READY,
                form
            })
        })
    }
};