/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React, {Component} from "react";
import {loadTemplate} from "../templates";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import {Route, Switch} from "react-router-dom";
import {addToCart, placeOrder, removeFromCart, loadOrder, displayCurrency, doPayment, calculateDeliveryRate} from "../modules/common";

const CartView = loadTemplate('orders', 'cart');
const ProcessView = loadTemplate('orders', 'process');

class IndexCmp extends Component {

    render() {
        let {match, basket, settings, loggedUser, isBusy} = this.props;
        return <Switch>
            <Route exact path={`${match.url}/cart`} render={props => {
                return <CartView loadTemplate={loadTemplate.bind(this)}
                                 basket={basket}
                                 onUpdate={this.props.addToCart.bind(this)}
                                 onRemove={this.props.removeFromCart.bind(this)}
                                 onCheckout={this.props.placeOrder.bind(this)}
                                 rootUrl={match.url}
                                 settings={settings}
                                 loggedUser={loggedUser}
                                 calculateDeliveryRate={calculateDeliveryRate}
                                 isBusy={isBusy}
                                 {...props}/>
            }}/>
            <Route exact path={`${match.url}/process/:orderId`} render={props => {
                return <ProcessView loadTemplate={loadTemplate.bind(this)}
                                    rootUrl={match.url}
                                    basket={basket}
                                    settings={settings}
                                    displayCurrency={displayCurrency}
                                    doPayment={doPayment}
                                    loadOrder={this.props.loadOrder.bind(this)}
                                    {...props}/>
            }}/>
        </Switch>
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    loggedUser: state.auth.loggedUser,
    basket: state.common.basket,
    settings: state.common.settings,
    isBusy: state.common.isBusy
});

const mapDispatchToProps = dispatch => bindActionCreators({
    addToCart,
    placeOrder,
    removeFromCart,
    loadOrder
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexCmp)