/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 02/13/2018
 *
 * Copyright @ Nodely, 2018
 */

import App from './application/App'
import Menu from './components/Menu';
import Form from './components/Form';
import Routes from './components/Routes';
import * as Transport from './transport';
import {createMarkup} from "./components/Utils";
import Search from './ui/Search'
import Spinner from './ui/Spinner'

export default App;

const Components = {
    Menu, Form, Routes
};

const UI = {
    Search, Spinner
};

export {
    Transport,
    Components,
    UI,
    createMarkup
};
