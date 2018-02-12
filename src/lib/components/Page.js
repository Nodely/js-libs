import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
    getPage
} from '../modules/common'

import {
    loadTemplate
} from '../templates'

const PageIndexView = loadTemplate('layouts', 'index');
const PageInternalView = loadTemplate('layouts', 'internal');

class IndexCmp extends Component {

    componentDidMount() {
        this.props.getPage(this.props.match.path)
    }

    componentWillReceiveProps(props) {
        if (props.match.path !== this.props.match.path) {
            console.log("Index: ", props.match);
            this.props.getPage(this.props.match.path)
        }
    }

    render() {
        return <PageIndexView loadTemplate={loadTemplate.bind(this)}
                              page={this.props.page}
                              {...this.props}/>
    }
}

class InternalCmp extends React.PureComponent {

    componentDidMount() {
        this.props.getPage(this.props.match.path)
    }

    componentWillReceiveProps(props) {
        if (props.match.path !== this.props.match.path) {
            console.log("Internal: ", props.match);
            this.props.getPage(this.props.match.path)
        }
    }

    render() {
        return this.props.page.id ? <PageInternalView loadTemplate={loadTemplate.bind(this)}
                                                      page={this.props.page}
                                                      crumbs={this.props.crumbs}
                                                      links={this.props.links}/> : null
    }
}

const mapStateToProps = state => ({
    page: state.common.page,
    crumbs: state.common.crumbs,
    links: state.common.links
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getPage
}, dispatch);

export const Index = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndexCmp);

export const Internal = connect(
    mapStateToProps,
    mapDispatchToProps
)(InternalCmp);