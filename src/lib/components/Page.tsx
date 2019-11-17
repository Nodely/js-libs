/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React, { PureComponent } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IRootState } from "../modules";
import commonActions from "../modules/common";

const mapStateToProps = ({ common }: IRootState) => ({
  page: common.page,
  crumbs: common.crumbs,
  links: common.links
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getPage: (path: string) => commonActions.getPage(dispatch, path)
});

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  Props;

type Props = {
  component: React.ReactNode;

  match: any;
  page: any;
};

class Cmp extends PureComponent<ReduxType> {
  componentDidMount() {
    this.props.getPage(this.props.match.path);
  }

  componentWillReceiveProps(props: any) {
    if (props.match.path !== this.props.match.path) {
      this.props.getPage(props.match.path);
    }
  }

  render() {
    let element = React.createElement(
      this.props.component as React.ComponentClass<any>,
      this.props
    );
    if (this.props.match.path === "/") return element;
    return this.props.page.id ? element : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cmp);
