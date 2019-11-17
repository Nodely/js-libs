/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import * as actions from './functions'
import reducer from './reducer'
import { IFormState } from './types'

export default actions;

export type IFormState = IFormState;

export {
    reducer
};