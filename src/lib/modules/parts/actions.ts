/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */
import { action } from 'typesafe-actions'
import { Constants } from './types'

export function dataRequested() {
    return action(Constants.PARTS_DATA_REQUESTED)
}

export function makes(makes: Array<any>) {
    return action(Constants.MAKES_READY, { makes })
}

export function models(models: Array<any>, maker: string) {
    return action(Constants.MODELS_READY, { models, maker })
}

export function specs(maker: string, model: string, specs: Array<any>) {
    return action(Constants.SPECS_READY, { maker, model, specs })
}

export function specData(maker: string, model: string, data: any) {
    return action(Constants.SPECS_DATA_READY, { maker, model, data })
}

export function sectionData(data: object) {
    return action(Constants.SECTION_DATA_READY, { data })
}

export function listReady(items: Array<object>) {
    return action(Constants.PARTS_LIST_READY, { items })
}

export function partsReady(data: any) {
    return action(Constants.PARTS_DATA_READY, { data })
}

export function oemsReady(items: Array<object>) {
    return action(Constants.PARTS_OEMS_READY, { items })
}

export function vehiclesReady(items: Array<object>) {

    return action(Constants.PARTS_VEHICLES_READY, { items })
}

export function searchReady(items: Array<object>) {
    return action(Constants.PARTS_SEARCH_READY, { items })
}

export function title(title: string, crumbs: Array<any>) {
    return action(Constants.PARTS_TITLE, { title, crumbs })
}