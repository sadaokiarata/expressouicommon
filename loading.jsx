import InlineSVG from "svg-inline-react";
import React from "react";

import styles from "./loading.sass";
import loadingSvg from "./images/loading-bubbles.svgo";

export default class Loading extends React.Component {
  render() {
    return (
      <InlineSVG className={styles.element} src={loadingSvg}/>
    );
  }
}
