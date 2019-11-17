/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Dispatch } from 'redux'
import moment from 'moment'

import * as actions from './actions'
import { CommonActions, IBasket } from './types'
import * as CommonTransport from '../../transport/common'

const PAGE_TITLE = window.document.title;

export async function getMenuItems(dispatch: Dispatch<CommonActions>, code: any) {
    CommonTransport.getMenuItems(code).then(({ items }) => {
        dispatch(actions.menu(code, items))
    })
};

export async function getPage(dispatch: Dispatch<CommonActions>, path: string) {
    if (path === "/") {
        window.document.title = PAGE_TITLE;
        dispatch(actions.page([], [], {}));
        return;
    }
    CommonTransport.getPage(path).then(({ item, crumbs, links }) => {
        window.document.title = item.title;
        dispatch(actions.page(crumbs, links, item))
    })
};

export async function getRoutes(dispatch: Dispatch<CommonActions>, path?: string) {
    dispatch(actions.inProgress());
    CommonTransport.getRoutes(path).then(({ items }) => {
        dispatch(actions.routes(items))
    }).catch(e => {
        if (e.statusCode === 403) {
            e.response.json().then((res: any) => {
                if (res.code === 1000) {
                    window.location.href = "/manager/first-time-wizard"
                }
                dispatch(actions.error(res.message));
            });
            return
        }
        dispatch(actions.error());
    })
};

export async function loadSettings(dispatch: Dispatch<CommonActions>) {
    CommonTransport.loadSettings().then(items => {
        dispatch(actions.settings(items))
    })
};

export async function loadOrders(dispatch: Dispatch<CommonActions>) {
    CommonTransport.loadOrders().then(items => {
        dispatch(actions.orders(items))
    })
};

export async function sign(dispatch: Dispatch<CommonActions>, data: object) {
    CommonTransport.sign(data).then(() => {
        dispatch(actions.sign())
    }).catch(e => {
        e.json().then((err: any) => {
            dispatch(actions.signError(err.error))
        })

    })
};

export async function activate(dispatch: Dispatch<CommonActions>, code: string) {
    CommonTransport.activate(code).then(() => {
        dispatch(actions.activate())
    }).catch(() => {
        dispatch(actions.activateFailed())
    })
};

export async function addToCart(dispatch: Dispatch<CommonActions>, data: object, qty: number, delivery: any) {
    dispatch(actions.basket({
        amount: 0,
        data,
        qty,
        delivery,
        items: []
    }))
};

export async function removeFromCart(dispatch: Dispatch<CommonActions>, id: string) {
    dispatch(actions.basketRemove(id))
};

export async function displayCurrency(price: string) {
    return parseFloat(price).toLocaleString("fi-FI", {
        style: 'currency',
        currency: 'EUR'
    })
};

export async function parseOrderStatus(status: number) {
    switch (status) {
        case 0:
            return "Sijoitettu";
        case 1:
            return "Maksettu";
        case 2:
            return "Valmistunut";
        case 3:
            return "Hylätty";
        case 4:
            return "Epäonnistui";
        default:
            return "Unknown"
    }
};

export async function placeOrder(dispatch: Dispatch<CommonActions>, order: any) {
    dispatch(actions.inProgress());

    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    order.order = moment().format("DDMMYY") + "-" + getRandomInt(1000, 9999);
    order.currency = 3;

    console.log("Order: ", order);

    CommonTransport.placeOrder(order).then(order => {
        dispatch(actions.order(order))
    })
};

export async function loadOrder(dispatch: Dispatch<CommonActions>, id: number) {

    dispatch(actions.inProgress());

    CommonTransport.loadOrder(id).then(order => {
        dispatch(actions.orderReady(order))
    })
};

export async function doPayment(id: number) {
    return CommonTransport.doPayment(id);
};

export async function calculateDeliveryRate(basket: IBasket, settings: any) {
    let rate = parseFloat(settings.delivery_rate);
    let rateCond = parseFloat(settings.delivery_free_condition);
    if (basket.amount > rateCond) {
        rate = 0;
    }
    return rate
};

export async function getQueryStringValue(key: string) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};