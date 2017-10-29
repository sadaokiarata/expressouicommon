import classnames from "classnames";
import React from "react";

import styles from "./picker.sass";

var currentOne;

var Picker = React.createClass({
  getInitialState: function() {
    return {
      qty: this.props.qty
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this === currentOne && this.state.qty === 1 && prevState.qty === 0) {
      this.refs.incr.focus();
    }
  },

  componentWillReceiveProps: function(props) {
    this.setState({
      qty: props.qty
    });
  },

  decrQty: function() {
    this.handleChange(+this.state.qty - 1);
  },

  incrQty: function() {
    var qty = +this.state.qty;
    if (qty === 0) {
      currentOne = this;
    }
    this.handleChange(qty + 1);
  },

  settingQty: function(event) {
    this.setState({
      qty: event.target.value
    });
  },

  setQty: function(event) {
    event.preventDefault();
    var qty = +this.state.qty;
    this.handleChange(Math.max(0, qty));
  },

  handleChange: function(qty) {
    if (this.lastQty !== qty) {
      this.lastQty = qty;
      this.props.onChange(qty);
    }
  },

  render: function() {
    var {children, qty} = this.props;
    if (qty === 0) {
      return (
        <div>
          <button type="button" className={classnames(styles.add, "body-button")} onClick={this.incrQty}>
            {children}
          </button>
        </div>
      );
    }

    return (
      <div className={styles.wrap}>
        <button type="button" className={styles.incrDecr + " incr-decr-button"} onClick={this.decrQty}>-</button>
        <form action="#" className={styles.form} onSubmit={this.setQty}>
          <input type="number" className={styles.input}
            value={this.state.qty}
            onBlur={this.setQty}
            onChange={this.settingQty}
          />
        </form>
        <button type="button" ref="incr" className={styles.incrDecr + " incr-decr-button"} onClick={this.incrQty}>+</button>
      </div>
    );
  }
});

export default Picker;
