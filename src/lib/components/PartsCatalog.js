/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import React, {Component} from "react";
import {loadTemplate} from "../templates";
import {getPage} from "../modules/common";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'

const PageView = loadTemplate('layouts', 'parts-catalog');

class IndexCmp extends Component {

    componentDidMount() {
        this.props.getPage(this.props.match.path);
    }

    render() {
        return <PageView loadTemplate={loadTemplate.bind(this)}
                         {...this.props}/>
    }
}


const mapStateToProps = state => ({
    page: state.common.page,
    makes: state.parts.makes,
    crumbs: state.common.crumbs
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPage
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexCmp)