import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getRoutes} from '../modules/common'
import Page from './Page'


class Cmp extends Component {

    componentDidMount() {
        this.props.getRoutes();
    }

    render() {
        let {routes, views} = this.props;
        return (
            <Switch>
                {routes.map((route, i) => {
                    switch (route.component) {
                        case "index":
                            return <Route key={i} exact path={route.path}
                                          render={props => {
                                              return <Page component={views.index} {...props}/>
                                          }}/>;
                        case "notfound":
                            return <Route key={i} component={views.notFound}/>;
                            /*
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
                            break;*/
                        default:
                            return <Route key={i} exact path={route.path}
                                          render={props => {
                                              return <Page component={views.internal} {...props}/>
                                          }}/>;
                    }
                })}
            </Switch>
        )
    }
}

Cmp.propTypes = {
    views: PropTypes.element.isRequired
};

const mapStateToProps = state => ({
    routes: state.common.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getRoutes
}, dispatch);

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp))