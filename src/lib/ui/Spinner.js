/**
 * Created by Ivan Soloviev <info@nodely.ru>
 * Date: 02/14/2018
 *
 * Copyright @ Nodely, 2018
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './Spinner.css'

export default class Spinner extends Component {

    static propTypes = {
        isBusy: PropTypes.bool.isRequired,
        skSize: PropTypes.string
    };

    render() {
        return this.props.isBusy ? <div>
            <div className={"sk-spinner sk-fading-circle " + (this.props.skSize === "xs" ? "sk-xs" : "")}>
                <div className="sk-circle1 sk-circle"/>
                <div className="sk-circle2 sk-circle"/>
                <div className="sk-circle3 sk-circle"/>
                <div className="sk-circle4 sk-circle"/>
                <div className="sk-circle5 sk-circle"/>
                <div className="sk-circle6 sk-circle"/>
                <div className="sk-circle7 sk-circle"/>
                <div className="sk-circle8 sk-circle"/>
                <div className="sk-circle9 sk-circle"/>
                <div className="sk-circle10 sk-circle"/>
                <div className="sk-circle11 sk-circle"/>
                <div className="sk-circle12 sk-circle"/>
            </div>
        </div> : null
    }

}