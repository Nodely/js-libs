import React from "react";
import parse from 'html-react-parser';

/**
 * Parse content and replace given macros
 * @param content HTML based content
 * @param wrappers List of React components for further replacement
 */
export const createMarkup = (content: string, wrappers?: any) => {
  if (content.indexOf("{Form:") > -1) {
    let parts = content.split(/{Form:(.+)}/gi);
    parts[1] = '<form code="' + parts[1] + '"/>';

    let opts: any = {
      transform: (n: any, i: number) => {
        if (n.name === "form") {
          let props = { ...n.attribs };
          props.key = props.code;
          return wrappers.Form
            ? React.createElement(wrappers.Form, props)
            : null;
        }
      }
    }
    return parse(parts.join(""), opts);
  }
  return parse(content);
};
