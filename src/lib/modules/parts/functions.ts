/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { Dispatch } from 'redux'

import * as actions from './actions'
import { PartsActions } from './types'
import * as PartsTransport from '../../transport/parts'

export const parseInterval = (int: string) => {
    int = int.replace(/([0-9]{2}\.)/g, "");
    if (int.indexOf("- ") === int.length - 2) {
        return int + " NYT";
    }
    return int;
};

export async function getMakes(dispatch: Dispatch<PartsActions>, name: string) {
    PartsTransport.getMakes().then(makes => {
        dispatch(actions.makes(makes))
    })
}

export async function getModels(dispatch: Dispatch<PartsActions>, maker: string) {
    PartsTransport.getModels(maker).then(models => {
        dispatch(actions.models(models, maker))
    })
};

export async function getSpecs(dispatch: Dispatch<PartsActions>, maker: string, model: string) {
    PartsTransport.getSpecs(maker, model).then(specs => {
        dispatch(actions.specs(maker, model, specs))
    })
};

export async function getSpecData(dispatch: Dispatch<PartsActions>, maker: string, model: string, specId: number) {
    PartsTransport.getSpecData(specId).then(data => {
        dispatch(actions.specData(maker, model, data))
    })
};

export async function getSections(specId: number, parentSecId: number) {
    return PartsTransport.getSections(specId, parentSecId).then(results => {
        return results.map((it: any) => {
            it.key = (parentSecId ? parentSecId + "-" : "") + it.id;
            it.name = it.description;
            return it;
        })
    });
};

export async function getSectionData(dispatch: Dispatch<PartsActions>, secId: number) {
    PartsTransport.getSectionData(secId).then(data => {
        dispatch(actions.sectionData(data))
    })
};

export async function getParts(dispatch: Dispatch<PartsActions>, modId: number, secId: number) {
    dispatch(actions.dataRequested());

    PartsTransport.getParts(modId, secId).then(items => {
        dispatch(actions.listReady(items))
    })
};

export async function getPartData(dispatch: Dispatch<PartsActions>, supplier: string, article: string) {
    dispatch(actions.dataRequested());

    PartsTransport.getPartData(supplier, article).then(data => {
        dispatch(actions.partsReady(data))
    })
};

export async function getPartOems(dispatch: Dispatch<PartsActions>, supplier: string, article: string) {
    dispatch(actions.dataRequested());

    PartsTransport.getPartOems(supplier, article).then(items => {
        dispatch(actions.oemsReady(items))
    })
};

export async function getPartVehicles(dispatch: Dispatch<PartsActions>, supplier: string, article: string) {
    dispatch(actions.dataRequested());

    PartsTransport.getPartVehicles(supplier, article).then(items => {
        dispatch(actions.vehiclesReady(items))
    })
};

export async function doPartsSearch(dispatch: Dispatch<PartsActions>, query: string) {
    dispatch(actions.dataRequested());

    PartsTransport.doPartsSearch(query).then(items => {
        dispatch(actions.searchReady(items))
    })
};

export async function setTitle(dispatch: Dispatch<PartsActions>, title: string, crumbs: Array<any>) {
    dispatch(actions.title(title, crumbs))
};

export async function getPrice(art: string) {
    return PartsTransport.getPrice(art);
};