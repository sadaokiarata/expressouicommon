/* globals CDN_URL */

import React from "react";

import CounterNotification from "./counter-notification";

import styles from "./basket-items-summary.sass";

const basketItemsSummaryCap = 7;

export default class BasketItemsSummary extends React.Component {
  render() {
    var {itemsHash, basketHash} = this.props;
    var cappedItemIds = Object.keys(itemsHash);
    cappedItemIds.length = Math.min(cappedItemIds.length, basketItemsSummaryCap);
    return (
      <ul className={styles.basketItemsSummary}>
        {cappedItemIds.map(function(itemId) {
          var item = itemsHash[itemId];
          return (
            <li key={itemId}>
              <CounterNotification count={basketHash[itemId].qty}>
                  <img
                    src={CDN_URL + "/images/item/" + item.imgMini}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
              </CounterNotification>
            </li>
          );
        })}
        {Object.keys(itemsHash).length > basketItemsSummaryCap && <span> ...</span>}
      </ul>
    );
  }
}
