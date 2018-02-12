/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from "react";
import {loadTemplate} from "../templates";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from "react-router-dom";

const OrdersView = loadTemplate('protected', 'orders');
const ProfileView = loadTemplate('protected', 'profile');

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Component {...props}
                           loadTemplate={loadTemplate.bind(this)}/>
            ) : (
                <Redirect to={"/login"}/>
            )
        }
    />
);

const IndexCmp = ({match, isLoggedIn}) => (
    <Switch>
        <PrivateRoute exact
                      isAuthenticated={isLoggedIn}
                      path={`${match.url}/orders`}
                      component={OrdersView}/>
        <PrivateRoute exact
                      isAuthenticated={isLoggedIn}
                      path={`${match.url}/profile`}
                      component={ProfileView}/>
    </Switch>
)


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexCmp)