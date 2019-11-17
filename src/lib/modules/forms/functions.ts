/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Dispatch } from 'redux';
import * as actions from './actions'
import { FormsActions } from './types'
import * as FormTransport from '../../transport/forms'

export async function loadForm(dispatch: Dispatch<FormsActions>, code: string) {
    dispatch(actions.dataRequested());

    FormTransport.loadForm(code).then(form => {
        dispatch(actions.formReady(form))
    })
};