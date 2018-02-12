import React from 'react'

import {
    loadTemplate
} from '../templates'

const NotFoundView = loadTemplate('layouts', '404');

export default () => (
    <NotFoundView />
)
