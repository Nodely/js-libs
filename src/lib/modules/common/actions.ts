/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { action } from 'typesafe-actions';
import { Constants, IBasket } from './types';

export function inProgress() {
    return action(Constants.REQUEST_IN_PROGRESS)
}

export function menu(code: string, items: Array<any>) {
    return action(Constants.MENU_ITEMS_READY, { code, items })
}

export function page(crumbs: Array<any>, links: Array<any>, item: any) {
    return action(Constants.PAGE_READY, { crumbs, links, item })
}

export function routes(items: Array<any>) {
    return action(Constants.ROUTES_READY, { items })
}

export function error(message?: string) {
    return action(Constants.REQUEST_ERRORED, { message })
}

export function settings(items: Array<any>) {

    return action(Constants.SETTINGS_READY, { items })
}

export function orders(items: Array<any>) {
    return action(Constants.ORDERS_READY, { items })
}

export function sign() {
    return action(Constants.SIGN_ACTIVATE)
}

export function signError(error: any) {
    return action(Constants.SIGN_ERROR, { error })
}

export function activate() {
    return action(Constants.ACTIVATE_READY)
}

export function activateFailed() {
    return action(Constants.ACTIVATE_ERROR)
}

export function basket(basket: IBasket) {
    return action(Constants.BASKET_READY, basket)
}

export function basketRemove(id: any) {
    return action(Constants.BASKET_ITEM_REMOVE, { id })
}

export function order(order: any) {
    return action(Constants.ORDER_PLACED, { order })
}

export function orderReady(order: any) {
    return action(Constants.ORDER_READY, { order })
}
