/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as BS from "react-bootstrap";

import App from "./lib/application/App";
import Menu from "./lib/components/Menu";
import Form from "./lib/components/Form";
import Routes from "./lib/components/Routes";
import * as Transport from "./lib/transport";
import { createMarkup } from "./lib/components/Utils";
import Search from "./lib/ui/Search";
import Spinner from "./lib/ui/Spinner";

// React deps
export { React, ReactDOM, PropTypes, BS, App as Nodely };

const Components = {
  Menu,
  Form,
  Routes
};

const UI = {
  Search,
  Spinner
};

export { Transport, Components, UI, createMarkup };
