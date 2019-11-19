/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import * as BS from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import App from "./application/App";
import Menu from "./components/Menu";
import Form from "./components/Form";
import Routes from "./components/Routes";
import * as Transport from "./transport";
import { createMarkup } from "./components/Utils";
import Search from "./ui/Search";
import Spinner from "./ui/Spinner";

// React deps
export { BS, LinkContainer, App as Nodely };

const Components: any = {
  Menu,
  Form,
  Routes
};

const UI = {
  Search,
  Spinner
};

export { Transport, Components, UI, createMarkup };
