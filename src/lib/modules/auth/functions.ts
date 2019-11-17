/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Dispatch } from 'redux'
import * as actions from './actions'
import { AuthActions } from './types'
import * as AuthTransport from '../../transport/common'

export async function doLogin(dispatch: Dispatch<AuthActions>, uri: string, user: string, pass: string) {

    dispatch(actions.dataRequested());

    if (user.trim().length === 0) {
        return dispatch(actions.dataErrored({
            text: "Sähköpostiä ei ole määritelty",
            user: true
        }));
    }
    if (pass.trim().length === 0) {
        return dispatch(actions.dataErrored({
            text: "Salasanaa ei ole määritetty",
            pass: true
        }));
    }

    AuthTransport.authorize(uri).then(() => {
        AuthTransport.login(user, pass).catch(e => {
            let text = "Virhe sisäänkirjautumisessa. Tarkista käyttäjätunnus ja/tai salasana.";
            if (e.status === 400) {
                text = "Virheellinen pyyntö";
            } else if (e.status === 403) {
                text = "Käyttäjää ei ole vahvistettu"
            }
            dispatch(actions.dataErrored({ text }));
        })
    });
}

let ls = window.localStorage;

export const setSession = (dispatch: Dispatch<AuthActions>, data: object) => {
    ls.setItem("NODELY_SESSION", JSON.stringify(data));
    dispatch(actions.setSession(data));
};

export const setUserToSession = (dispatch: Dispatch<AuthActions>, user: object) => {
        ls.setItem("NODELY_CUSTOMER", JSON.stringify(user));
        dispatch(actions.setUserSession(user));
};

export async function getSession(dispatch: Dispatch<AuthActions>) {
    let s = ls.getItem("NODELY_SESSION");
    if (!s) {
        return dispatch(actions.setSession(null));
    }
    AuthTransport.getLoggedInfo().then(u => {
        dispatch(actions.setSession(JSON.parse(s as string)));
        dispatch(actions.setUserSession(u));
    }).catch(() => {
        clearSession();
        dispatch(actions.setSession(null));
        dispatch(actions.setUserSession(null));
    })
};

export const clearSession = () => {
    ls.removeItem("NODELY_SESSION");
    ls.removeItem("NODELY_CUSTOMER");
};

export async function getLoggedInfo() {
    return AuthTransport.getLoggedInfo();
};

export async function updateProfile(dispatch: Dispatch<AuthActions>, data: object) {
    AuthTransport.updateProfile(data).then(() => {
        setUserToSession(dispatch, data);
        dispatch(actions.profileIsUpdated());
    });
};