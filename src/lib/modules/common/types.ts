/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type CommonActions = ActionType<typeof actions>;

export interface IBasket{
    data?: any,
    qty?: number,
    amount: number,
    items: Array<any>,
    delivery: {
        type: number
        rate: number
    }
};

export interface ICommonState {
    menuItems: Array<any>
    routes: Array<any>
    crumbs: Array<any>
    links: Array<any>
    page: any
    settings: any
    isBusy: boolean
    orders: Array<any>
    activateAccount: boolean
    signError: boolean
    activationStatus: any
    basket: IBasket
    order: object | null
}

export enum Constants {
    MENU_ITEMS_READY = "@common/MENU_ITEMS_READY",
    PAGE_READY = "@common/PAGE_READY",
    ROUTES_READY = "@common/ROUTES_READY",
    SETTINGS_READY = "@common/SETTINGS_READY",
    ORDERS_READY = "@common/ORDERS_READY",
    REQUEST_IN_PROGRESS = "@common/REQUEST_IN_PROGRESS",
    REQUEST_ERRORED = "@common/REQUEST_ERRORED",
    SIGN_ACTIVATE = "@common/SIGN_ACTIVATE",
    SIGN_ERROR = "@common/SIGN_ERROR",
    ACTIVATE_READY = "@common/ACTIVATE_READY",
    ACTIVATE_ERROR = "@common/ACTIVATE_ERROR",
    BASKET_READY = "@common/BASKET_READY",
    BASKET_ITEM_REMOVE = "@common/BASKET_ITEM_REMOVE",
    ORDER_PLACED = "@common/ORDER_PLACED",
    ORDER_READY = "@common/ORDER_READY"
}