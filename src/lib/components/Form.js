/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React from 'react';
import PropType from 'prop-types';
import {connect} from "react-redux";
import {loadForm} from "../modules/forms";
import {bindActionCreators} from "redux";
import * as BS from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha'

class Cmp extends React.Component {

    state = {
        captcha: null
    };

    componentDidMount() {
        this.props.loadForm(this.props.code);
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        let {form, colLabel, colControl, settings, skipCaptcha} = this.props;
        let fields = [];
        if (form) {
            form.props.forEach((f, idx) => {
                fields.push(
                    <BS.FormGroup key={idx}>
                        <BS.Col componentClass={BS.ControlLabel} sm={colLabel}>
                            {f.title}{f.required &&
                        <span className="text-danger">*</span>}</BS.Col>
                        <BS.Col sm={colControl}>
                            {this.parseFields(f)}
                        </BS.Col>
                    </BS.FormGroup>
                );
            });
            if (form.withCaptcha && !skipCaptcha && settings.captcha_site_key) {
                fields.push(
                    <BS.Col sm={colControl} smOffset={colLabel} key={"re-captcha"}>
                        <ReCAPTCHA
                            ref="recaptcha"
                            sitekey={settings.captcha_site_key}
                            onChange={this.onCaptchaChange.bind(this)}
                        />
                    </BS.Col>
                )
            }
        }
        return fields;
    }

    parseFields(f) {
        let val = "";
        let {values} = this.props;
        if (values !== null && values) {
            val = values[f.code] || ""
        }
        switch (f.type) {
            case "text":
                return <BS.FormControl id={f.code}
                                       componentClass="textarea"
                                       value={val}
                                       onChange={this.onFieldChange.bind(this)}/>;
            default:
                return <BS.FormControl id={f.code}
                                       type="text"
                                       value={val}
                                       onChange={this.onFieldChange.bind(this)}/>;
        }
    }

    onFieldChange(e) {
        this.props.onChange({
            target: {
                id: e.target.id,
                value: e.target.value
            }
        })
    }

    onCaptchaChange(captcha) {
        this.setState({captcha})
    }

    validate(values, doSkipCaptcha) {
        let {props} = this.props.form;
        for (let i = 0; i < props.length; i++) {
            let f = props[i];
            let v = values[f.code];
            if (f.required && (!v || v.trim().length === 0))
                return f.code;
        }
        if (this.state.captcha === null && !doSkipCaptcha)
            return "captcha";
        return undefined;
    }
}

Cmp.propTypes = {
    code: PropType.string.isRequired,
    onChange: PropType.func.isRequired,
    onRef: PropType.func.isRequired,
    fieldsOnly: PropType.bool,
    colLabel: PropType.number,
    colControl: PropType.number,
    skipCaptcha: PropType.bool,
    values: PropType.object
};

Cmp.defaultProps = {
    fieldsOnly: false,
    colLabel: 2,
    colControl: 10,
    skipCaptcha: false,
    values: null,
};

const mapStateToProps = state => ({
    form: state.forms.form,
    settings: state.common.settings
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadForm
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cmp)