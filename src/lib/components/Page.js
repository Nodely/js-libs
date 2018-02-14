/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getPage} from '../modules/common'

class Cmp extends React.PureComponent {

    componentDidMount() {
        this.props.getPage(this.props.match.path)
    }

    componentWillReceiveProps(props) {
        if (props.match.path !== this.props.match.path) {
            this.props.getPage(props.match.path)
        }
    }

    render() {
        let element = React.createElement(this.props.component, this.props);
        if (this.props.match.path === "/")
            return element;
        return this.props.page.id ? element : null
    }
}

Cmp.propTypes = {
    component: PropTypes.element.isRequired
};

const mapStateToProps = state => ({
    page: state.common.page,
    crumbs: state.common.crumbs,
    links: state.common.links
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPage
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp);