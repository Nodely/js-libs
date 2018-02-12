/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import * as CommonTransport from '../transport/common'
import Cookie from 'js-cookie'
import moment from 'moment'

export const MENU_ITEMS_READY = "common/MENU_ITEMS_READY";
export const PAGE_READY = "common/PAGE_READY";
export const ROUTES_READY = "common/ROUTES_READY";
export const SETTINGS_READY = "common/SETTINGS_READY";
export const ORDERS_READY = "common/ORDERS_READY";
export const REQUEST_IN_PROGRESS = "common/REQUEST_IN_PROGRESS";
export const SIGN_ACTIVATE = "common/SIGN_ACTIVATE";
export const SIGN_ERROR = "common/SIGN_ERROR";
export const ACTIVATE_READY = "common/ACTIVATE_READY";
export const ACTIVATE_ERROR = "common/ACTIVATE_ERROR";
export const BASKET_READY = "common/BASKET_READY";
export const BASKET_ITEM_REMOVE = "common/BASKET_ITEM_REMOVE";
export const ORDER_PLACED = "common/ORDER_PLACED";
export const ORDER_READY = "common/ORDER_READY";

const popularMakes = [
    {
        id: 16,
        name: "BMW"
    },
    {
        id: 184,
        name: "KIA"
    },
    {
        id: 72,
        name: "MAZDA"
    },
    {
        id: 74,
        name: "MERCEDES-BENZ"
    },
    {
        id: 5,
        name: "AUDI"
    },
    {
        id: 111,
        name: "TOYOTA"
    },
    {
        id: 120,
        name: "VOLVO"
    },
    {
        id: 121,
        name: "VW"
    },
    {
        id: 77,
        name: "MITSUBISHI"
    },
    {
        id: 138,
        name: "CHEVROLET"
    },
    {
        id: 21,
        name: "CITROËN"
    },
    {
        id: 2887,
        name: "CHERY"
    },
    {
        id: 20,
        name: "CHRYSLER"
    },
    {
        id: 80,
        name: "NISSAN"
    },
    {
        id: 35,
        name: "FIAT"
    },
    {
        id: 106,
        name: "SKODA"
    },
    {
        id: 107,
        name: "SUBARU"
    },
    {
        id: 84,
        name: "OPEL"
    },
    {
        id: 36,
        name: "FORD"
    },
    {
        id: 45,
        name: "HONDA"
    },
    {
        id: 1526,
        name: "INFINITI"
    },
    {
        id: 819,
        name: "CADILLAC"
    },
    {
        id: 109,
        name: "SUZUKI"
    },
    {
        id: 183,
        name: "HYUNDAI"
    },
    {
        id: 93,
        name: "RENAULT"
    },
    {
        id: 104,
        name: "SEAT"
    },
    {
        id: 88,
        name: "PEUGEOT"
    },
    {
        id: 55,
        name: "IVECO"
    },
    {
        id: 1820,
        name: "LAND ROVER"
    },
    {
        id: 882,
        name: "JEEP"
    }
];

export const emptyBasket = {
    amount: 0,
    items: [],
    delivery: {
        type: 1,
        rate: 0
    }
};

const initialState = {
    menuItems: [],
    routes: [],
    crumbs: [],
    links: [],
    page: {},
    settings: {},
    isBusy: false,
    popularMakes,
    orders: [],
    activateAccount: false,
    signError: false,
    activationStatus: null,
    basket: Cookie.get('NODELY_BASKET') ? JSON.parse(Cookie.get('NODELY_BASKET')) : emptyBasket,
    order: null
};

const PAGE_TITLE = window.document.title;

export default (state = initialState, action) => {
    switch (action.type) {
        case MENU_ITEMS_READY:
            return {
                ...state,
                menuItems: {
                    ...state.menuItems,
                    [action.code]: action.items
                }
            };
        case ROUTES_READY:
            return {
                ...state,
                isBusy: false,
                routes: action.items
            };
        case PAGE_READY:
            return {
                ...state,
                page: action.item,
                links: action.links,
                crumbs: action.crumbs
            };
        case REQUEST_IN_PROGRESS:
            return {
                ...state,
                page: {},
                isBusy: true
            };
        case SETTINGS_READY:
            let sets = {};
            action.items.forEach(c => {
                let v = c.value;
                if (v === "true" || v === "false")
                    v = v === "true";
                sets[c.key] = v;
            });
            return {
                ...state,
                settings: sets
            };
        case SIGN_ACTIVATE:
            return {
                ...state,
                activateAccount: true
            };
        case SIGN_ERROR:
            return {
                ...state,
                signError: action.error
            };
        case ACTIVATE_READY:
            return {
                ...state,
                activationStatus: true
            };
        case ACTIVATE_ERROR:
            return {
                ...state,
                activationStatus: false
            };
        case BASKET_READY:
            let basket = {...state.basket};
            let it = action.data;
            if (it !== null) {
                let exists = false;
                basket.items.map(r => {
                    if (r.article === it.article) {
                        exists = true;
                        if (action.qty)
                            r.qty = action.qty;
                        else
                            r.qty++;
                    }
                    return r
                });
                if (!exists) {
                    it.qty = 1;
                    basket.items.push(it);
                }
            }
            let amount = 0;
            basket.items.map(r => {
                return amount += r.price * r.qty;
            });
            if (action.delivery) {
                basket.delivery = action.delivery;
                amount += action.delivery.rate
            }
            basket.amount = amount;
            Cookie.set('NODELY_BASKET', JSON.stringify(basket), {path: "/", expires: 2});
            return {
                ...state,
                basket
            };
        case BASKET_ITEM_REMOVE:
            basket = {...state.basket};
            basket.items = basket.items.filter(r => r.article !== action.id);
            amount = 0;
            basket.items.map(r => {
                return amount += r.price * r.qty;
            });
            basket.amount = amount;
            basket.amount += basket.delivery.rate;
            if (basket.items.length === 0) {
                basket.amount = 0;
                Cookie.set('NODELY_BASKET', '');
            } else {
                Cookie.set('NODELY_BASKET', JSON.stringify(basket), {path: "/", expires: 2});
            }
            return {
                ...state,
                basket
            };
        case ORDER_PLACED:
            Cookie.set('NODELY_BASKET', "");
            document.location = "/orders/process/" + action.order.order;
            return {
                ...state,
                basket: emptyBasket
            };
        case ORDER_READY:
            return {
                ...state,
                order: action.order
            };
        case ORDERS_READY:
            return {
                ...state,
                orders: action.items
            };
        default:
            return state;
    }
};

export const getMenuItems = (code) => {
    return dispatch => {
        return CommonTransport.getMenuItems(code).then(({items}) => {
            dispatch({
                type: MENU_ITEMS_READY,
                code,
                items
            })
        })
    }
};

export const getPage = (path) => {
    return dispatch => {
        if (path === "/") {
            window.document.title = PAGE_TITLE;
            dispatch({
                type: PAGE_READY,
                crumbs: [],
                links: [],
                item: {}
            });
            return;
        }
        return CommonTransport.getPage(path).then(({item, crumbs, links}) => {
            window.document.title = item.title;
            dispatch({
                type: PAGE_READY,
                crumbs,
                links,
                item
            });
        })
    }
};

export const getRoutes = (path) => {
    return dispatch => {
        dispatch({
            type: REQUEST_IN_PROGRESS
        });
        return CommonTransport.getRoutes(path).then(({items}) => {
            dispatch({
                type: ROUTES_READY,
                items
            })
        })
    }
};

export const loadSettings = () => {
    return dispatch => {
        CommonTransport.loadSettings().then(items => {
            dispatch({
                type: SETTINGS_READY,
                items
            })
        })
    }
};

export const loadOrders = () => {
    return dispatch => {
        CommonTransport.loadOrders().then(items => {
            dispatch({
                type: ORDERS_READY,
                items
            })
        })
    }
};

export const sign = data => {
    return dispatch => {
        CommonTransport.sign(data).then(() => {
            dispatch({
                type: SIGN_ACTIVATE
            })
        }).catch(e => {
            e.json().then(err => {
                dispatch({
                    type: SIGN_ERROR,
                    error: err.error
                })
            })

        })
    }
};

export const activate = code => {
    return dispatch => {
        CommonTransport.activate(code).then(() => {
            dispatch({
                type: ACTIVATE_READY
            })
        }).catch(() => {
            dispatch({
                type: ACTIVATE_ERROR
            })
        })
    }
};

export const addToCart = (data, qty, delivery) => {
    return dispatch => {

        dispatch({
            type: BASKET_READY,
            data,
            qty,
            delivery
        })
    }
};

export const removeFromCart = id => {
    return dispatch => {
        dispatch({
            type: BASKET_ITEM_REMOVE,
            id
        })
    }
};

export const displayCurrency = price => {
    return parseFloat(price).toLocaleString("fi-FI", {
        style: 'currency',
        currency: 'EUR'
    })
};

export const parseOrderStatus = status => {
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

export const placeOrder = order => {
    return dispatch => {
        dispatch({
            type: REQUEST_IN_PROGRESS
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        order.order = moment().format("DDMMYY") + "-" + getRandomInt(1000, 9999);
        order.currency = 3;

        console.log("Order: ", order);

        CommonTransport.placeOrder(order).then(order => {
            dispatch({
                type: ORDER_PLACED,
                order
            });
        })
    }
};

export const loadOrder = id => {
    return dispatch => {
        dispatch({
            type: REQUEST_IN_PROGRESS
        });

        CommonTransport.loadOrder(id).then(order => {
            dispatch({
                type: ORDER_READY,
                order
            });
        });
    }
};

export const doPayment = id => {
    return CommonTransport.doPayment(id);
};

export const calculateDeliveryRate = (basket, settings) => {
    let rate = parseFloat(settings.delivery_rate);
    let rateCond = parseFloat(settings.delivery_free_condition);
    if (basket.amount > rateCond) {
        rate = 0;
    }
    return rate
};

export const getQueryStringValue = key => {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};