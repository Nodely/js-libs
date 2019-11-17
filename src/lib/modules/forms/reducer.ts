/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Reducer } from 'redux'
import { IFormState, FormsActions, Constants } from './types'

const init: IFormState = {
    form: null,
    isLoading: false,
    error: null
}

const reducer: Reducer<IFormState> = (state = init, action: FormsActions): IFormState => {
    switch (action.type) {
        case Constants.DATA_REQUESTED:
            return {
                ...state,
                error: null,
                isLoading: true
            };
        case Constants.FORM_READY:
            return {
                ...state,
                isLoading: false,
                form: action.payload.form
            };
        default:
            return state;
    }
}

export default reducer;
