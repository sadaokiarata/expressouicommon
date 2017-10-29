import $ from "jquery";
import classnames from "classnames";
import {FormatMessage} from "react-globalize";
import React from "react";

import "./jquery-ui.js";
import "./jquery-ui.css";

import styles from "./auth-nav.sass";

function popupUI() {
  $("#nav-user--popup")
    .detach()
    .appendTo("#app > div")
    .popup({
      managed: true, // Do not focus on first tabbable element when opened.
      position: {
        my: "right top",
        at: "right bottom",
        offset: "0 20"
      },
      trigger: $("#nav-user--button")
    });
}

function popupUIDestroy() {
  $("#nav-user--popup").remove();
}

export default class NavUser extends React.Component {
  componentDidMount() {
    popupUI();
  }

  componentDidUpdate() {
    popupUI();
  }

  componentWillReceiveProps(nextProps) {
    // Has logged out, close menu.
    if (nextProps.me && !nextProps.me.email) {
      $("#nav-user--popup").popup("close");
    }
  }

  componentWillUnmount() {
    popupUIDestroy();
  }

  render() {
    var {children, me} = this.props;
    if (me.email) {
      return (
        <div>
          <button id="nav-user--button" className={classnames("link-button", styles.button)}>
            <img
              src={me.picture.url}
              alt={me.name}
              className={styles.img}
              width="32"
              height="32"
            />
            <span className={styles.name}>{me.first_name}</span>
          </button>
          <div id="nav-user--popup" className={styles.popup}>
            {children}
            <div className={styles.popupArrow}/>
          </div>
        </div>
      );
    }

    return (
      <a href="/auth" className={styles.link}>
        <FormatMessage>Login</FormatMessage>
      </a>
    );
  }
}
