/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/23/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from "react";
import {loadTemplate} from "../templates";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const BasketView = loadTemplate('misc', 'basket');

class Cmp extends React.Component {
    render() {
        return (
            <BasketView loadTemplate={loadTemplate.bind(this)}
                        {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.common.settings,
    loggedUser: state.auth.loggedUser,
    basket: state.common.basket
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp)