import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Page from "./Page";

import { IRootState } from "../modules";
import commonActions from "../modules/common";

const mapStateToProps = ({ common }: IRootState) => ({
  routes: common.routes
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getRoutes: () => commonActions.getRoutes(dispatch)
});

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  Props;

type Props = {
  views: any;
};

class Cmp extends Component<ReduxType> {
  componentDidMount() {
    this.props.getRoutes();
  }

  render() {
    let { routes, views } = this.props;
    return (
      <Switch>
        {routes.map((route: any, i: number) => {
          switch (route.component) {
            case "index":
              return (
                <Route
                  key={i}
                  exact
                  path={route.path}
                  render={props => {
                    return <Page component={views.index} {...props} />;
                  }}
                />
              );
            case "notfound":
              return <Route key={i} component={views.notFound} />;
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
              return (
                <Route
                  key={i}
                  exact
                  path={route.path}
                  render={props => {
                    return <Page component={views.internal} {...props} />;
                  }}
                />
              );
          }
        })}
      </Switch>
    );
  }
}

// typescript workaround as mentioned in react-router docs
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cmp) as any
);
