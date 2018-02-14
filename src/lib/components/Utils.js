import React from 'react'
import ReactHtmlParser from 'react-html-parser'


/**
 * Parse content and replace given macros
 * @param content HTML based content
 * @param wrappers List of React components for further replacement
 */
export const createMarkup = (content, wrappers) => {
    if (content.indexOf('{Form:') > -1) {
        let parts = content.split(/{Form:(.+)}/gi);
        parts[1] = '<form code="' + parts[1] + '"/>';

        return ReactHtmlParser(parts.join(''), {
            transform: (n, i) => {
                if (n.name === "form") {
                    let props = {...n.attribs};
                    props.key = props.code;
                    return wrappers.Form ? React.createElement(wrappers.Form, props) : null;
                }
            }
        })
    }
    return ReactHtmlParser(content)
};