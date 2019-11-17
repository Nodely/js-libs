/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AuthActions = ActionType<typeof actions>;

export interface IAuthState {
    error: any;
    isLoading: boolean;
    isLoggedIn: boolean | null;
    info: object | null;
    loggedUser: object | null;
    updated: boolean;
};

export enum Constants {
    DATA_REQUESTED = "@auth/DATA_REQUESTED",
    DATA_ERROR = "@auth/DATA_ERROR",
    DATA_LOADED = "@auth/DATA_LOADED",
    SESSION_SET = "@auth/SESSION_SET",
    SESSION_USER_SET = "@auth/SESSION_USER_SET",
    PROFILE_UPDATED = "@auth/PROFILE_UPDATED"
}