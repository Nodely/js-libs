/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type FormsActions = ActionType<typeof actions>;

export interface IFormState {
    form: object | null;
    isLoading: boolean;
    error: object | null;
};

export enum Constants {
    DATA_REQUESTED = "@forms/DATA_REQUESTED",
    DATA_ERROR = "@forms/DATA_ERROR",
    FORM_READY = "@forms/FORM_READY"
}