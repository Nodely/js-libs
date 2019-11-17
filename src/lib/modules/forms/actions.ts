/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { action } from 'typesafe-actions';
import { Constants } from './types';

export function dataRequested() {
    return action(Constants.DATA_REQUESTED)
}

export function formReady(form: any) {
    return action(Constants.FORM_READY, { form })
}