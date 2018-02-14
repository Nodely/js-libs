import React, {Component} from 'react'
import {
    FormGroup,
    FormControl,
    InputGroup,
} from 'react-bootstrap'
import PropTypes from 'prop-types'

class SearchInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: props.value || ""
        }
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        throttle: PropTypes.number,
        filterKeys: PropTypes.array
    };

    render() {
        let {id, placeholder} = this.props;
        return (
            <FormGroup controlId={id}>
                <InputGroup bsSize="small">
                    <InputGroup.Addon><span className="fa fa-search"/></InputGroup.Addon>
                    <FormControl placeholder={placeholder} onChange={this.updateSearch.bind(this)} value={this.state.searchTerm}/>
                </InputGroup>
            </FormGroup>
        )
    }

    updateSearch(e) {
        let searchTerm = e.target.value.toLowerCase();
        this.setState({
            searchTerm
        }, () => {
            if (this._throttleTimeout) {
                clearTimeout(this._throttleTimeout);
            }
            this._throttleTimeout = setTimeout(() => {
                if (this.props.onChange) {
                    this.props.onChange(searchTerm);
                }
            }, this.props.throttle);
        });
    }

    filter(keys) {
        return SearchInput.filter(this.state.searchTerm, keys || this.props.filterKeys);
    }
}

SearchInput.filter = (term, keys) => {

    const _getValuesForKey = function (key, _item) {
        let keys = key.split('.');
        let results = [_item];
        keys.forEach(function (_key) {
            let tmp = [];
            results.forEach(result => {
                if (result) {
                    if (result instanceof Array) {
                        result.forEach(function (res) {
                            tmp.push(res[_key]);
                        });
                    } else {
                        tmp.push(result[_key]);
                    }
                }
            });
            results = tmp;
        });
        return results.map((result) => {
            if (typeof result === 'string') {
                return result.toLowerCase();
            } else {
                return null;
            }
        });
    };

    return (item) => {
        if (term === '') {
            return true;
        }
        // escape special symbols to ensure `term` is a valid regex
        term = term.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");

        if (keys) {
            if (typeof keys === 'string') {
                keys = [keys];
            }
            for (let i = 0; i < keys.length; i++) {
                let values = _getValuesForKey(keys[i], item);

                let found = false;
                // eslint-disable-next-line
                values.forEach(value => {
                    try {
                        if (value && value.search(term) !== -1) {
                            found = true;
                        }
                    } catch (e) {
                    }
                });
                if (found) {
                    return true;
                }
            }
            return false;
        } else {
            try {
                let stringValue = item.toLowerCase();
                return (stringValue.search(term) !== -1);
            } catch (e) {
                return false;
            }
        }
    };
};

SearchInput.defaultProps = {throttle: 1000};

export default SearchInput