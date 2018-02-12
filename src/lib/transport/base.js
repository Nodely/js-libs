import 'whatwg-fetch'
import ClientOAuth2 from 'client-oauth2'

export const API_URL = '/rest-api/public';

export const oAuthClient = new ClientOAuth2({
    clientId: window.location.host,
    accessTokenUri: API_URL + '/token',
    authorizationUri: API_URL + '/authorize',
    redirectUri: window.location.protocol + '//' + window.location.host + '/login/callback',
    scopes: ['all']
});

const process = (resource, method, params, isForm) => {
    let formData = null;
    if (isForm) {
        let arr = [];
        formData = new FormData();
        for (let q in params) {
            if (params.hasOwnProperty(q)) {
                arr.push(q + "=" + params[q]);
                formData.append(q, params[q]);
            }
        }
        params = arr.join("&");

    }

    let headers = {};
    if (!isForm)
        headers["Content-Type"] = "application/json";

    // get auth header
    let s = window.localStorage.getItem("NODELY_SESSION");
    if (s) {
        s = JSON.parse(s);
        headers['Authorization'] = s.token_type + ' ' + s.access_token
    }
    return fetch(API_URL + resource, {
        method: method,
        headers,
        credentials: 'include',
        mode: 'cors',
        body: params ? (isForm ? formData : JSON.stringify(params)) : null
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else if (res.status === 401 && resource !== "/loggedInfo") {
            window.localStorage.removeItem("NODELY_SESSION");
            window.location = "/login?to=" + window.location.pathname;
        } else {
            throw res;
        }
    });
};

export const get = (resource) => {
    return process(resource, 'GET');
};

export const post = (resource, params) => {
    return process(resource, 'POST', params);
};

export const postForm = (resource, params) => {
    return process(resource, 'POST', params, true);
};

export const put = (resource, params) => {
    return process(resource, 'PUT', params);
};

export const del = (resource) => {
    return process(resource, 'DELETE');
};

export const getRaw = (uri) => {
    return fetch(uri, {
        method: "GET",
        credentials: 'include',
        mode: 'cors',
    });
};