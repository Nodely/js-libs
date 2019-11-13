import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {
    getMenuItems
} from '../modules/common'

class Cmp extends Component {

    componentDidMount() {
        this.props.getMenuItems(this.props.code);
    }

    render() {
        let {code, items, settings, location, loggedUser} = this.props;
        const MenuView = this.props.component;
        return <MenuView code={code}
                         items={items[code] || []}
                         location={location}
                         settings={settings}
                         loggedUser={loggedUser}/>
    }
}

Cmp.propTypes = {
    code: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired
};

const mapStateToProps = state => ({
    items: state.common.menuItems,
    settings: state.common.settings,
    loggedUser: state.auth.loggedUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getMenuItems
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp))