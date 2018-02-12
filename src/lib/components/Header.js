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
import {withRouter} from "react-router-dom";

const HeaderView = loadTemplate('misc', 'header');

class Cmp extends React.Component {
    render() {
        return (
            <HeaderView loadTemplate={loadTemplate.bind(this)}
                        {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.common.settings,
    loggedUser: state.auth.loggedUser
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp))