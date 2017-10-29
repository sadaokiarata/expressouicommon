/* globals URI_PREFIX */

import React from "react";

var uriPrefix = URI_PREFIX;

export default class Link extends React.Component {
  render() {
    var {children, href, ...otherProps} = this.props;

    return (
      <a href={`${uriPrefix}${href}`} {...otherProps}>{children}</a>
    );
  }
}
