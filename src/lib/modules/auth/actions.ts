/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { action } from 'typesafe-actions';
import { Constants } from './types';

export function dataRequested() {
    return action(Constants.DATA_REQUESTED, { isLoading: true })
}

export function dataErrored(error: object) {
    return action(Constants.DATA_ERROR, { error })
}

export function setSession(data: any) {
    return action(Constants.SESSION_SET, {data})
}

export function setUserSession(user: any) {
    return action(Constants.SESSION_USER_SET, {user})
}

export function profileIsUpdated() {
    return action(Constants.PROFILE_UPDATED);
}
