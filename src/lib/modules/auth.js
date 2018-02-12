import * as AuthTransport from '../transport/common'

export const DATA_REQUESTED = "auth/DATA_REQUESTED";
export const DATA_ERROR = "auth/DATA_ERROR";
export const DATA_LOADED = "auth/DATA_LOADED";
export const SESSION_SET = "auth/SESSION_SET";
export const SESSION_USER_SET = "auth/SESSION_USER_SET";
export const PROFILE_UPDATED = "auth/PROFILE_UPDATED";

const initialState = {
    error: {},
    isLoading: false,
    isLoggedIn: null,
    info: null,
    loggedUser: null,
    updated: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DATA_REQUESTED:
            return {
                ...state,
                error: {},
                isLoading: true
            };
        case DATA_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case SESSION_SET:
            return {
                ...state,
                isLoggedIn: !!action.data,
                info: action.data
            };
        case SESSION_USER_SET:
            return {
                ...state,
                loggedUser: action.user || null
            };
        case DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case PROFILE_UPDATED:
            return {
                ...state,
                updated: true
            };
        default:
            return state;
    }
}

export const doLogin = (uri, user, pass) => {
    return dispatch => {

        dispatch({
            type: DATA_REQUESTED
        });

        if (user.trim().length === 0) {
            return dispatch({
                type: DATA_ERROR,
                error: {
                    text: "Sähköpostiä ei ole määritelty",
                    user: true
                }
            })
        }
        if (pass.trim().length === 0) {
            return dispatch({
                type: DATA_ERROR,
                error: {
                    text: "Salasanaa ei ole määritetty",
                    pass: true
                }
            })
        }

        AuthTransport.authorize(uri).then(() => {
            AuthTransport.login(user, pass).catch(e => {
                let text = "Virhe sisäänkirjautumisessa. Tarkista käyttäjätunnus ja/tai salasana.";
                if (e.status === 400) {
                    text = "Virheellinen pyyntö";
                } else if (e.status === 403) {
                    text = "Käyttäjää ei ole vahvistettu"
                }
                dispatch({
                    type: DATA_ERROR,
                    error: {
                        text
                    }
                })
            })
        });
    }
};

let ls = window.localStorage;

export const setSession = data => {
    return dispatch => {
        ls.setItem("NODELY_SESSION", JSON.stringify(data));
        dispatch({
            type: SESSION_SET,
            data
        })
    }
};

export const setUserToSession = user => {
    return dispatch => {
        ls.setItem("NODELY_CUSTOMER", JSON.stringify(user));
        dispatch({
            type: SESSION_USER_SET,
            user
        })
    }
};

export const getSession = () => {
    return dispatch => {
        let s = ls.getItem("NODELY_SESSION");
        if (!s) {
            return dispatch({
                type: SESSION_SET
            });
        }
        AuthTransport.getLoggedInfo().then(u => {
            dispatch({
                type: SESSION_SET,
                data: JSON.parse(s)
            });
            dispatch({
                type: SESSION_USER_SET,
                user: u
            });
        }).catch(() => {
            clearSession();
            dispatch({
                type: SESSION_SET
            });
            dispatch({
                type: SESSION_USER_SET
            });
        })
    }
};

export const clearSession = () => {
    ls.removeItem("NODELY_SESSION");
    ls.removeItem("NODELY_CUSTOMER");
};

export const getLoggedInfo = () => {
    return AuthTransport.getLoggedInfo();
};

export const updateProfile = data => {
    return dispatch => {
        AuthTransport.updateProfile(data).then(() => {
            setUserToSession(data);
            dispatch({
                type: PROFILE_UPDATED
            })
        })
    }
};