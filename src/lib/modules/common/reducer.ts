/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Reducer } from "redux";
import Cookie from "js-cookie";
import { ICommonState, CommonActions, Constants } from "./types";

const emptyBasket = {
  amount: 0,
  items: [],
  delivery: {
    type: 1,
    rate: 0
  }
};

const init: ICommonState = {
  menuItems: [],
  routes: [],
  crumbs: [],
  links: [],
  page: {},
  settings: {},
  isBusy: false,
  orders: [],
  activateAccount: false,
  signError: false,
  activationStatus: null,
  basket: Cookie.get("NODELY_BASKET")
    ? JSON.parse(Cookie.get("NODELY_BASKET") as string)
    : emptyBasket,
  order: null
};

const reducer: Reducer<ICommonState> = (
  state = init,
  action: CommonActions
): ICommonState => {
  switch (action.type) {
    case Constants.MENU_ITEMS_READY:
      return {
        ...state,
        menuItems: {
          ...state.menuItems,
          [action.payload.code]: action.payload.items
        }
      };
    case Constants.ROUTES_READY:
      return {
        ...state,
        isBusy: false,
        routes: action.payload.items
      };
    case Constants.PAGE_READY:
      return {
        ...state,
        page: action.payload.item,
        links: action.payload.links,
        crumbs: action.payload.crumbs
      };
    case Constants.REQUEST_IN_PROGRESS:
      return {
        ...state,
        page: {},
        isBusy: true
      };
    case Constants.SETTINGS_READY:
      let sets: any = {};
      action.payload.items.forEach(c => {
        let v = c.value;
        if (v === "true" || v === "false") v = v === "true";
        sets[c.key] = v;
      });
      return {
        ...state,
        settings: sets
      };
    case Constants.SIGN_ACTIVATE:
      return {
        ...state,
        activateAccount: true
      };
    case Constants.SIGN_ERROR:
      return {
        ...state,
        signError: action.payload.error
      };
    case Constants.ACTIVATE_READY:
      return {
        ...state,
        activationStatus: true
      };
    case Constants.ACTIVATE_ERROR:
      return {
        ...state,
        activationStatus: false
      };
    case Constants.BASKET_READY:
      let basket = { ...state.basket };
      let it = action.payload.data;
      if (it !== null) {
        let exists = false;
        basket.items.map(r => {
          if (r.article === it.article) {
            exists = true;
            if (action.payload.qty) r.qty = action.payload.qty;
            else r.qty++;
          }
          return r;
        });
        if (!exists) {
          it.qty = 1;
          basket.items.push(it);
        }
      }
      let amount = 0;
      basket.items.map(r => {
        return (amount += r.price * r.qty);
      });
      if (action.payload.delivery) {
        basket.delivery = action.payload.delivery;
        amount += action.payload.delivery.rate;
      }
      basket.amount = amount;
      Cookie.set("NODELY_BASKET", JSON.stringify(basket), {
        path: "/",
        expires: 2
      });
      return {
        ...state,
        basket
      };
    case Constants.BASKET_ITEM_REMOVE:
      basket = { ...state.basket };
      basket.items = basket.items.filter(r => r.article !== action.payload.id);
      amount = 0;
      basket.items.map(r => {
        return (amount += r.price * r.qty);
      });
      basket.amount = amount;
      basket.amount += basket.delivery.rate;
      if (basket.items.length === 0) {
        basket.amount = 0;
        Cookie.set("NODELY_BASKET", "");
      } else {
        Cookie.set("NODELY_BASKET", JSON.stringify(basket), {
          path: "/",
          expires: 2
        });
      }
      return {
        ...state,
        basket
      };
    case Constants.ORDER_PLACED:
      Cookie.set("NODELY_BASKET", "");
      document.location.href = "/orders/process/" + action.payload.order.order;
      return {
        ...state,
        basket: emptyBasket
      };
    case Constants.ORDER_READY:
      return {
        ...state,
        order: action.payload.order
      };
    case Constants.ORDERS_READY:
      return {
        ...state,
        orders: action.payload.items
      };
    default:
      return state;
  }
};

export default reducer;
