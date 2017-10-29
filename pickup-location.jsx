import classnames from "classnames";
import {FormatMessage} from "react-globalize";
import React from "react";

import styles from "./pickup-location.sass";

class Long extends React.Component {
  render() {
    var {className, order, ...otherProps} = this.props;
    var {pickupLocation} = order;
    if (!pickupLocation) {
      return null;
    }
    var {address, telephoneNumber} = pickupLocation;
    var {street, state, city} = address;
    return (
      <div {...otherProps} className={classnames(styles.longArea, className)}>
        <p className={styles.addressArea}>
          <FormatMessage>Address:</FormatMessage><br/>
          {street}<br/>
          <FormatMessage variables={{city, state}}>{
            '{city} - {state}'
          }</FormatMessage>
        </p>
        <p className={styles.telephoneNumberArea}>
          <FormatMessage>Telephone:</FormatMessage><br/>
          {telephoneNumber}
        </p>
      </div>
    );
  }
}

class Short extends React.Component {
  render() {
    var {order, ...otherProps} = this.props;
    var {pickupLocation} = order;
    if (!pickupLocation) {
      return null;
    }
    var {name, address, telephoneNumber} = pickupLocation;
    var {street} = address;
    return (
      <span {...otherProps} title={`${street}, ${telephoneNumber}`}>
        {name}
      </span>
    );
  }
}

export default class PickupLocation extends React.Component {
  render() {
    var {mode, ...otherProps} = this.props;
    if (mode === "short") {
      return <Short {...otherProps}/>;
    }
    // mode === "long"
    return <Long {...otherProps}/>;
  }
}
