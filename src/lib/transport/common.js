/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import {get, getRaw, postForm, post, put, API_URL} from './base'
import Cookies from 'js-cookie'

export const getMenuItems = (code) => {
    return get(`/menu/${code}`)
};

export const getPage = (path) => {
    return get(`/page/by/path/${encodeURIComponent(path)}`)
};

export const getRoutes = (path) => {
    path  = path ? encodeURIComponent(path) : "";
    return get(`/navigation/routes/${path}`)
};

export const loadSettings = () => {
    return get(`/configs`)
};

export const loadOrders = () => {
    return get(`/protected/orders`)
};

export const authorize = uri => {
    return getRaw(uri);
};

export const login = (user, pass) => {
    return postForm(`/login`, {user, pass}).then(res => {
        // set last used email to cookie
        Cookies.set('NODELY_SITE_USERNAME', user, {path: "/", expires: 10});

        function getQueryStringValue(key) {
            return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        }

        let f = getQueryStringValue("to");
        if (f) {
            Cookies.set('LOGIN_REDIRECT', f, {path: "/"});
        }
        window.location = API_URL + res;
    });
};

export const getLoggedInfo = () => {
    return get(`/loggedInfo`)
};

export const sign = data => {
    return put(`/sign`, data);
};

export const activate = code => {
    return put(`/activate/${code}`);
};

export const placeOrder = order => {
    return post(`/protected/order/place`, order)
};

export const loadOrder = id => {
    return get(`/protected/order/${id}`)
};

export const doPayment = id => {
    return post(`/protected/order/payout`, {id})
};

export const updateProfile = data => {
    return post(`/protected/profile`, data);
};

export const sendForm = (code, data) => {
    return post(`/form/${code}/send`, data);
};