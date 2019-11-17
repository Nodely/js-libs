/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import {get} from "./base"

export const getMakes = (name?: string) => {
    return get(`/module/parts/proxy/makes/passenger${name ? "?name=" + name : ""}`)
};

export const getModels = (maker: string) => {
    return get(`/module/parts/proxy/makes/passenger/${maker}/models`)
};

export const getSpecs = (maker: string, model: string) => {
    return get(`/module/parts/proxy/makes/passenger/${maker}/models/${model}/modifications`)
};

export const getSpecData = (specId: number) => {
    return get(`/module/parts/proxy/spec/${specId}`)
};

export const getSections = (specId: number, parentSecId?: number) => {
    return get(`/module/parts/proxy/sections/passenger/${specId + (parentSecId ? `?pid=${parentSecId}` : "")}`)
};

export const getSectionData = (secId: number) => {
    return get(`/module/parts/proxy/section/passenger/${secId}`)
};

export const getParts = (modId: number, secId: number) => {
    return get(`/module/parts/proxy/parts/passenger/${modId}/${secId}`)
};

export const getPartData = (supp: string, article: string) => {
    return get(`/module/parts/proxy/part/${supp}/${article}`)
};

export const getPartOems = (supp: string, article: string) => {
    return get(`/module/parts/proxy/part/${supp}/${article}/oems`)
};

export const getPartVehicles = (supp: string, article: string) => {
    return get(`/module/parts/proxy/part/${supp}/${article}/vehicles`)
};

export const doPartsSearch = (query: string) => {
    return get(`/module/parts/proxy/parts/passenger?q=${query}`)
};

export const getPrice = (query: string) => {
    return get(`/module/parts/proxy/parts/price-list?q=${query}`)
};