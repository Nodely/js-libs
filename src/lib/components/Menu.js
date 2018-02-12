import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {loadTemplate} from '../templates'
import {withRouter} from 'react-router-dom'

import {
    getMenuItems
} from '../modules/common'

class Cmp extends Component {

    static propTypes = {
        code: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.getMenuItems(this.props.code);
    }

    render() {
        let {code, items, settings, location, loggedUser} = this.props;
        const MenuView = loadTemplate('menu', code);
        return <MenuView items={items[code] || []}
                         location={location}
                         settings={settings}
                         loggedUser={loggedUser}/>
    }
}

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