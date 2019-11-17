/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Reducer } from 'redux'
import { IPartsState, PartsActions, Constants } from './types'

const init: IPartsState = {
    makes: [],
    models: [],
    specs: [],
    makeId: null,
    modelId: null,
    specId: null,
    listParts: null,
    partsInProgress: false,
    partData: {},
    specData: {},
    sectionData: {},
    oems: null,
    vehicles: null,
    title: null,
    crumbs: [],
    parts: null
}

const reducer: Reducer<IPartsState> = (state = init, action: PartsActions): IPartsState => {

    let crumbs: Array<any>;
    switch (action.type) {
        case Constants.MAKES_READY:
            crumbs = [];
            crumbs.push({
                title: "Luettelo valmistajista"
            });
            return {
                ...state,
                crumbs,
                makes: action.payload.makes,
                title: null
            };
        case Constants.SPECS_READY:
            crumbs = [];
            crumbs.push({
                title: action.payload.maker,
                path: "/" + action.payload.maker
            }, {
                title: action.payload.model
            });
            return {
                ...state,
                crumbs,
                title: action.payload.maker + " - " + action.payload.model,
                specs: action.payload.specs
            };
        case Constants.SPECS_DATA_READY:
            crumbs = [];
            crumbs.push({
                title: action.payload.maker,
                path: "/" + action.payload.maker
            }, {
                title: action.payload.model,
                path: "/" + action.payload.maker + "/" + action.payload.model
            }, {
                title: action.payload.data.name
            });
            return {
                ...state,
                crumbs,
                title: action.payload.data.name,
                specData: action.payload.data
            };
        case Constants.MODELS_READY:
            crumbs = [];
            crumbs.push({
                title: action.payload.maker
            });
            return {
                ...state,
                crumbs,
                title: action.payload.maker,
                models: action.payload.models
            };
        case Constants.SECTION_DATA_READY:
            return {
                ...state,
                sectionData: action.payload.data
            };
        case Constants.PARTS_DATA_REQUESTED:
            return {
                ...state,
                parts: null,
                partsInProgress: true
            };
        case Constants.PARTS_LIST_READY:
            return {
                ...state,
                partsInProgress: false,
                listParts: action.payload.items
            };
        case Constants.PARTS_DATA_READY:
            crumbs = [];
            crumbs.push({
                title: "Määrä: " + action.payload.data.article,
                path: "/search/" + action.payload.data.article
            }, {
                title: action.payload.data.supplier
            });
            return {
                ...state,
                partsInProgress: false,
                title: action.payload.data.supplier + " - " + action.payload.data.article,
                crumbs,
                partData: action.payload.data
            };
        case Constants.PARTS_OEMS_READY:
            return {
                ...state,
                oems: action.payload.items
            };
        case Constants.PARTS_VEHICLES_READY:
            return {
                ...state,
                vehicles: action.payload.items
            };
        case Constants.PARTS_SEARCH_READY:
            return {
                ...state,
                partsInProgress: false,
                parts: action.payload.items
            };
        case Constants.PARTS_TITLE:
            return {
                ...state,
                title: action.payload.title,
                crumbs: action.payload.crumbs
            };
        default:
            return state;
    }
}

export default reducer;