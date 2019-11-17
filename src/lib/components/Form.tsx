/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 01/21/2018
 *
 * Copyright @ Nodely, 2018
 */

import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import * as BS from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

import { IRootState } from "../modules";
import formsActions from "../modules/forms";

const mapStateToProps = ({ common, forms }: IRootState) => ({
  form: forms.form,
  settings: common.settings
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  loadForm: (code: any) => formsActions.loadForm(dispatch, code)
});

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  Props;

interface Props {
  code: any;
  onChange: Function;
  onRef: Function;
  fieldsOnly: boolean;
  colLabel: number;
  colControl: number;
  skipCaptcha: boolean;
  values?: any;
  loadForm: Function;
  settings: any;
  form: any;
}

class Cmp extends Component<ReduxType> {
  static defaultProps = {
    fieldsOnly: false,
    colLabel: 2,
    colControl: 10,
    skipCaptcha: false,
    values: null
  };

  state = {
    captcha: null
  };

  componentDidMount() {
    this.props.loadForm(this.props.code);
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    let { form, colLabel, colControl, settings, skipCaptcha } = this.props;
    let fields = [];
    if (form) {
      form.props.forEach((f: any, idx: number) => {
        fields.push(
          <BS.FormGroup as={BS.Row} key={idx}>
            <BS.Form.Label column sm={colLabel}>
              {f.title}
              {f.required && <span className="text-danger">*</span>}
            </BS.Form.Label>
            <BS.Col sm={colControl}>{this.parseFields(f)}</BS.Col>
          </BS.FormGroup>
        );
      });
      if (form.withCaptcha && !skipCaptcha && settings.captcha_site_key) {
        fields.push(
          <BS.Col
            sm={{ span: colControl, offset: colLabel }}
            key={"re-captcha"}
          >
            <ReCAPTCHA
              ref="recaptcha"
              sitekey={settings.captcha_site_key}
              onChange={this.onCaptchaChange.bind(this)}
            />
          </BS.Col>
        );
      }
    }
    return fields;
  }

  parseFields(f: any) {
    let val = "";
    let { values } = this.props;
    if (values !== null && values) {
      val = values[f.code] || "";
    }
    switch (f.type) {
      case "text":
        return (
          <BS.FormControl
            id={f.code}
            as="textarea"
            value={val}
            onChange={this.onFieldChange.bind(this)}
          />
        );
      default:
        return (
          <BS.FormControl
            id={f.code}
            type="text"
            value={val}
            onChange={this.onFieldChange.bind(this)}
          />
        );
    }
  }

  onFieldChange(e: any) {
    this.props.onChange({
      target: {
        id: e.target.id,
        value: e.target.value
      }
    });
  }

  onCaptchaChange(captcha: any) {
    this.setState({ captcha });
  }

  validate(values: any, doSkipCaptcha: boolean) {
    let { props } = this.props.form;
    for (let i = 0; i < props.length; i++) {
      let f = props[i];
      let v = values[f.code];
      if (f.required && (!v || v.trim().length === 0)) return f.code;
    }
    if (this.state.captcha === null && !doSkipCaptcha) return "captcha";
    return undefined;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cmp);
