/**
 * Created by Ivan Soloviev <support@nodely.me>
 * Date: 12/01/2019
 *
 * Copyright @ Nodely, 2019
 */

import React, { Component, ReactNode } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { IRootState } from "../modules";
import commonActions from "../modules/common";

const mapStateToProps = ({ common, auth }: IRootState) => ({
  items: common.menuItems,
  settings: common.settings,
  loggedUser: auth.loggedUser
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getMenuItems: (code: any) => commonActions.getMenuItems(dispatch, code)
});

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  Props;

type Props = {
  code: any;
  component: ReactNode;

  location: object;
};

type MenuViewProps = {
  code: string;
  items: any[];
  location: object;
  settings: any;
  loggedUser: object | null;
};

class Cmp extends Component<ReduxType> {
  componentDidMount() {
    this.props.getMenuItems(this.props.code);
  }

  render() {
    let { code, items, settings, location, loggedUser } = this.props;
    return React.createElement(
      this.props.component as React.ComponentClass<MenuViewProps>,
      {
        code,
        items: items[code] || [],
        location,
        settings,
        loggedUser
      }
    );
  }
}

// typescript workaround as mentioned in react-router docs
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cmp) as any
);
