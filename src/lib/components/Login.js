/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 12/17/2017
 *
 * Copyright @ Nodely, 2017
 */

import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import {doLogin, setSession, getLoggedInfo, setUserToSession, clearSession} from "../modules/auth";
import {oAuthClient} from "../transport/base"
import {Route, Switch} from "react-router-dom";
import Cookie from 'js-cookie'

const LoginView = loadTemplate('login', 'login');
const ResetPasswordView = loadTemplate('login', 'login');
const SignupView = loadTemplate('login', 'signup');
const ActivateView = loadTemplate('login', 'activate');

class Cmp extends Component {

    componentDidMount() {
        if (!this.props.settings.authorization) {
            this.props.history.push("/404");
        }
        if (this.props.isLoggedIn) {
            this.props.history.push("/protected/profile");
        }
    }

    render() {
        let {match} = this.props;
        return <Switch>
            <Route exact path={`${match.url}`} render={props => {
                return <LoginView oAuthClient={oAuthClient}
                                  loadTemplate={loadTemplate.bind(this)}
                                  doLogin={this.props.doLogin}
                                  settings={this.props.settings}
                                  error={this.props.error}
                                  {...props}/>
            }}/>
            <Route path={`${match.url}/signup`} component={SignupView}/>
            <Route path={`${match.url}/password`} component={ResetPasswordView}/>
            <Route path={`${match.url}/activate/:code`} component={ActivateView}/>
            <Route path={`${match.url}/out`} render={() => {
                clearSession();
                window.location = "/";
                return null
            }}/>
            <Route path={`${match.url}/callback`} render={() => {
                oAuthClient.token.getToken(this.props.location)
                    .then(user => {
                        this.props.setSession(user.data);
                        getLoggedInfo().then(u => {
                            this.props.setUserToSession(u);
                            let f = Cookie.get('LOGIN_REDIRECT');
                            this.props.history.push(f || "/");
                        });
                    });
                return null;
            }}/>
        </Switch>
    }
}


const mapStateToProps = state => ({
    settings: state.common.settings,
    error: state.auth.error,
    isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators({
    doLogin,
    setUserToSession,
    setSession
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp)