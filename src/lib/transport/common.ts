/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import {get, getRaw, postForm, post, put, API_URL} from './base'
import Cookies from 'js-cookie'

export const getMenuItems = (code: any) => {
    return get(`/menu/${code}`)
};

export const getPage = (path: string) => {
    return get(`/page/by/path/${encodeURIComponent(path)}`)
};

export const getRoutes = (path?: string) => {
    path = path ? encodeURIComponent(path) : "";
    return get(`/navigation/routes/${path}`)
};

export const loadSettings = () => {
    return get(`/configs`)
};

export const loadOrders = () => {
    return get(`/protected/orders`)
};

export const authorize = (uri:string) => {
    return getRaw(uri);
};

export const login = (user: string, pass: string) => {
    return postForm(`/login`, {user, pass}).then(res => {
        // set last used email to cookie
        Cookies.set('NODELY_SITE_USERNAME', user, {path: "/", expires: 10});

        function getQueryStringValue(key: string) {
            return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        }

        let f = getQueryStringValue("to");
        if (f) {
            Cookies.set('LOGIN_REDIRECT', f, {path: "/"});
        }
        window.location.href = API_URL + res;
    });
};

export const getLoggedInfo = () => {
    return get(`/loggedInfo`)
};

export const sign = (data: any) => {
    return put(`/sign`, data);
};

export const activate = (code: string) => {
    return put(`/activate/${code}`);
};

export const placeOrder = (order: any) => {
    return post(`/protected/order/place`, order)
};

export const loadOrder = (id: number) => {
    return get(`/protected/order/${id}`)
};

export const doPayment = (id: number) => {
    return post(`/protected/order/payout`, {id})
};

export const updateProfile = (data: any) => {
    return post(`/protected/profile`, data);
};

export const sendForm = (code: string, data: any) => {
    return post(`/form/${code}/send`, data);
};