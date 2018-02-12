import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {Route, Switch} from 'react-router-dom'

import {
    getRoutes
} from '../modules/common'

import {
    Index as PageIndex,
    Internal as PageInternal
} from './Page'

import PartsCatalogView from './PartsCatalog'
import LoginView from './Login'
import ProtectedView from './Protected'
import OrdersView from './Orders'

import NotFound from './NotFound'

class Cmp extends Component {

    componentDidMount() {
        this.props.getRoutes();
    }

    render() {
        let {routes} = this.props;
        return (
            <Switch>
                {routes.map((route, i) => {
                    let Comp;
                    switch (route.component) {
                        case "index":
                            Comp = <Route key={i} exact path={route.path} component={PageIndex}/>;
                            break;
                        case "notfound":
                            Comp = <Route key={i} component={NotFound}/>;
                            break;
                        case "parts-catalog":
                            Comp = <Route key={i} path={route.path} component={PartsCatalogView}/>;
                            break;
                        case "login":
                            Comp = <Route key={i} path={route.path} component={LoginView}/>;
                            break;
                        case "protected":
                            Comp = <Route key={i} path={route.path} component={ProtectedView}/>;
                            break;
                        case "orders":
                            Comp = <Route key={i} path={route.path} component={OrdersView}/>;
                            break;
                        default:
                            Comp = <Route key={i} exact path={route.path} component={PageInternal}/>;
                    }
                    return Comp;
                })}
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    routes: state.common.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getRoutes
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp)