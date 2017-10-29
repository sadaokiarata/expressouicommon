import {FormatNumber} from "react-globalize";
import React from "react";

import styles from "./counter-notification.sass";

function Qty({count}) {
  return count ? (
    <div className={styles.notificationCount}>
      <FormatNumber>{count}</FormatNumber>
    </div>
  ) : null;
}

export default function CounterNotification({children, count}) {
  return (
    <div className={styles.notificationCountWrapper}>
      <Qty count={count}/>
      {children}
    </div>
  );
}
