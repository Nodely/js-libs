/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type PartsActions = ActionType<typeof actions>;

export interface IPartsState {
    makes: Array<any>;
    models: Array<any>;
    specs: Array<any>;
    makeId: string | null;
    modelId: string | null;
    specId: string | null;
    listParts: Array<any> | null;
    partsInProgress: boolean;
    partData: object;
    specData: object;
    sectionData: object;
    oems: object | null;
    vehicles: object | null;
    title: string | null;
    crumbs: Array<any>;
    parts: object | null;
};

 export enum Constants {
    MAKES_READY = "@parts/MAKES_READY",
    SPECS_READY = "@parts/SPECS_READY",
    SPECS_DATA_READY = "@parts/SPECS_DATA_READY",
    MODELS_READY = "@parts/MODELS_READY",
    SECTION_DATA_READY = "@parts/SECTION_DATA_READY",
    PARTS_DATA_REQUESTED = "@parts/PARTS_DATA_REQUESTED",
    PARTS_LIST_READY = "@parts/PARTS_LIST_READY",
    PARTS_OEMS_READY = "@parts/PARTS_OEMS_READY",
    PARTS_VEHICLES_READY = "@parts/PARTS_VEHICLES_READY",
    PARTS_DATA_READY = "@parts/PARTS_DATA_READY",
    PARTS_SEARCH_READY = "@parts/PARTS_SEARCH_READY",
    PARTS_TITLE = "@parts/PARTS_TITLE"
 }