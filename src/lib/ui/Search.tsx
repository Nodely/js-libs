import React, {Component} from 'react'
import {
    FormGroup,
    FormControl,
    InputGroup,
} from 'react-bootstrap'

class SearchInput extends Component<SearchInputProps, SearchInputState> {

    static defaultProps = {throttle: 1000};

    _throttleTimeout: any;
    
    constructor(props: any) {
        super(props);
        this.state = {
            searchTerm: props.value || ""
        }
    }

    render() {
        let {id, placeholder} = this.props;
        return (
            <FormGroup controlId={id}>
                <InputGroup size="sm">
                    <InputGroup.Prepend><span className="fa fa-search"/></InputGroup.Prepend>
                    <FormControl placeholder={placeholder} onChange={this.updateSearch.bind(this)} value={this.state.searchTerm}/>
                </InputGroup>
            </FormGroup>
        )
    }

    updateSearch(e: any) {
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

    filter(keys: any) {
        return filter(this.state.searchTerm, keys || this.props.filterKeys);
    }
}

const filter = (term: string, keys: any) => {

    const _getValuesForKey = function (key: string, _item: any) {
        let keys = key.split('.');
        let results = [_item];
        keys.forEach(function (_key) {
            let tmp: any = [];
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

    return (item: any) => {
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

type SearchInputState = {
    searchTerm: string;
}

export type SearchInputProps = {
    id: string;
    placeholder?: string;
    filterKeys?: any;
    onChange: Function;
    throttle: number;
}

export default SearchInput