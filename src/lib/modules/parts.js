/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import * as PartsTransport from '../transport/parts'

export const MAKES_READY = "parts/MAKES_READY";
export const SPECS_READY = "parts/SPECS_READY";
export const SPECS_DATA_READY = "parts/SPECS_DATA_READY";
export const MODELS_READY = "parts/MODELS_READY";
export const SECTION_DATA_READY = "parts/SECTION_DATA_READY";
export const PARTS_DATA_REQUESTED = "parts/PARTS_DATA_REQUESTED";
export const PARTS_LIST_READY = "parts/PARTS_LIST_READY";
export const PARTS_OEMS_READY = "parts/PARTS_OEMS_READY";
export const PARTS_VEHICLES_READY = "parts/PARTS_VEHICLES_READY";
export const PARTS_DATA_READY = "parts/PARTS_DATA_READY";
export const PARTS_SEARCH_READY = "parts/PARTS_SEARCH_READY";
export const PARTS_TITLE = "parts/PARTS_TITLE";

const initialState = {
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
};

export default (state = initialState, action) => {
    let crumbs;
    switch (action.type) {
        case MAKES_READY:
            crumbs = [];
            crumbs.push({
                title: "Luettelo valmistajista"
            });
            return {
                ...state,
                crumbs,
                makes: action.makes,
                title: null
            };
        case SPECS_READY:
            crumbs = [];
            crumbs.push({
                title: action.maker,
                path: "/" + action.maker
            }, {
                title: action.model
            });
            return {
                ...state,
                crumbs,
                title: action.maker + " - " + action.model,
                specs: action.specs
            };
        case SPECS_DATA_READY:
            crumbs = [];
            crumbs.push({
                title: action.maker,
                path: "/" + action.maker
            }, {
                title: action.model,
                path: "/" + action.maker + "/" + action.model
            }, {
                title: action.data.name
            });
            return {
                ...state,
                crumbs,
                title: action.data.name,
                specData: action.data
            };
        case MODELS_READY:
            crumbs = [];
            crumbs.push({
                title: action.maker
            });
            return {
                ...state,
                crumbs,
                title: action.maker,
                models: action.models
            };
        case SECTION_DATA_READY:
            return {
                ...state,
                sectionData: action.data
            };
        case PARTS_DATA_REQUESTED:
            return {
                ...state,
                parts: null,
                partsInProgress: true
            };
        case PARTS_LIST_READY:
            return {
                ...state,
                partsInProgress: false,
                listParts: action.items
            };
        case PARTS_DATA_READY:
            crumbs = [];
            crumbs.push({
                title: "Määrä: " + action.data.article,
                path: "/search/" + action.data.article
            }, {
                title: action.data.supplier
            });
            return {
                ...state,
                partsInProgress: false,
                title: action.data.supplier + " - " + action.data.article,
                crumbs,
                partData: action.data
            };
        case PARTS_OEMS_READY:
            return {
                ...state,
                oems: action.items
            };
        case PARTS_VEHICLES_READY:
            return {
                ...state,
                vehicles: action.items
            };
        case PARTS_SEARCH_READY:
            return {
                ...state,
                partsInProgress: false,
                parts: action.items
            };
        case PARTS_TITLE:
            return {
                ...state,
               title: action.title,
               crumbs: action.crumbs
            };
        default:
            return state;
    }
};

export const parseInterval = int => {
    int = int.replace(/([0-9]{2}\.)/g, "");
    if (int.indexOf("- ") === int.length - 2) {
        return int + " NYT";
    }
    return int;
};

export const getMakes = name => {
    return dispatch => {
        PartsTransport.getMakes().then(makes => {
            dispatch({
                type: MAKES_READY,
                makes
            })
        })
    }
};

export const getModels = maker => {
    return dispatch => {
        PartsTransport.getModels(maker).then(models => {
            dispatch({
                type: MODELS_READY,
                models,
                maker
            })
        })
    }
};

export const getSpecs = (maker, model) => {
    return dispatch => {
        PartsTransport.getSpecs(maker, model).then(specs => {
            dispatch({
                type: SPECS_READY,
                maker,
                model,
                specs
            })
        })
    }
};

export const getSpecData = (maker, model, specId) => {
    return dispatch => {
        PartsTransport.getSpecData(specId).then(data => {
            dispatch({
                type: SPECS_DATA_READY,
                maker,
                model,
                data
            })
        })
    }
};

export const getSections = (specId, parentSecId) => {
    return PartsTransport.getSections(specId, parentSecId).then(results => {
        return results.map(it => {
            it.key = (parentSecId ? parentSecId + "-" : "") + it.id;
            it.name = it.description;
            return it;
        })
    });
};

export const getSectionData = (secId) => {
    return dispatch => {
        PartsTransport.getSectionData(secId).then(data => {
            dispatch({
                type: SECTION_DATA_READY,
                data
            })
        });
    }
};

export const getParts = (modId, secId) => {
    return dispatch => {
        dispatch({
            type: PARTS_DATA_REQUESTED
        });

        PartsTransport.getParts(modId, secId).then(items => {
            dispatch({
                type: PARTS_LIST_READY,
                items
            })
        })
    }
};

export const getPartData = (supplier, article) => {
    return dispatch => {
        dispatch({
            type: PARTS_DATA_REQUESTED
        });
        PartsTransport.getPartData(supplier, article).then(data => {
            dispatch({
                type: PARTS_DATA_READY,
                data
            })
        })
    }
};

export const getPartOems = (supplier, article) => {
    return dispatch => {
        dispatch({
            type: PARTS_DATA_REQUESTED
        });
        PartsTransport.getPartOems(supplier, article).then(items => {
            dispatch({
                type: PARTS_OEMS_READY,
                items
            })
        })
    }
};

export const getPartVehicles = (supplier, article) => {
    return dispatch => {
        dispatch({
            type: PARTS_DATA_REQUESTED
        });
        PartsTransport.getPartVehicles(supplier, article).then(items => {
            dispatch({
                type: PARTS_VEHICLES_READY,
                items
            })
        })
    }
};

export const doPartsSearch = query => {
    return dispatch => {
        dispatch({
            type: PARTS_DATA_REQUESTED
        });

        PartsTransport.doPartsSearch(query).then(items => {
            dispatch({
                type: PARTS_SEARCH_READY,
                items
            })
        })
    }
};

export const setTitle = (title, crumbs) => {
    return dispatch => {
        dispatch({
            type: PARTS_TITLE,
            title, crumbs
        })
    }
};

export const getPrice = art => {
    return PartsTransport.getPrice(art);
};