/* globals NODE_ENV */
import classnames from "classnames";
import Globalize from "globalize";
import React from "react";
import RT from "relative-time";

const datetimeFormatter = Globalize.dateFormatter({datetime: "medium"});
const minute = 6e4;

export default class RelativeTime extends React.Component {
  componentWillMount() {
    this.refresh = setInterval(() => this.forceUpdate(), minute);
    this.relativeTime = new RT();
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }

  render() {
    var {children, className, ...otherProps} = this.props;
    if (NODE_ENV !== "production" && !(children instanceof Date)) {
      console.error(new Error(`Invalid children "${this.children}", Date instance expected`));
      return null;
    }
    var date = children;
    return (
      <span
        {...otherProps}
        className={classnames("relative-time", className)}
        title={datetimeFormatter(children)}
      >
        {this.relativeTime.format(date)}
      </span>
    );
  }
}
