/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import {get} from "./base"

export const loadForm = (code: string) => {
    return get(`/form/${code}`)
};
