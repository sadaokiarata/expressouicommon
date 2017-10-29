/* globals CDN_URL */

import classnames from "classnames";
import {FormatMessage} from "react-globalize";
import Inview from "react-inview";
import LazyLoad from "react-lazyload";
import Loading from "../loading";
import MediaQuery from "react-responsive";
import React, {PropTypes} from "react";
import {scrollIntoViewPort, spreadSlice} from "../util";

// This is a hack, it seems RGWP or GWP has some bug that doesn't load currency
// module used by FormatCurrency.
import Globalize from "globalize"; // eslint-disable-line no-unused-vars

import styles from "./item-list.sass";

function capFromList(value, list) {
  var cap;
  list.some(thisCap => {
    cap = thisCap;
    return value > thisCap;
  });
  return cap;
}

function Abbreviated({caps, itemsHash, itemsList}) {
  let cap = capFromList(itemsList.length, caps);
  itemsList = spreadSlice(itemsList, cap);
  return (
    <ul className={styles.ulMini, "list-inline"}>
      {itemsList.map(function(itemId) {
        var item = itemsHash[itemId] || {};
        var {imgMini = "nopic.png", title} = item;
        return (
          <li key={`il-${itemId}`}>
            <LazyLoad scroll resize once height={50}>
              <img
                src={`${CDN_URL}/images/item/${imgMini}`}
                alt={title}
                width={50}
                height={50}
              />
            </LazyLoad>
          </li>
        );
      })}
    </ul>
  );
}

Abbreviated.propTypes = {
  caps: PropTypes.array.isRequired,
  itemsList: PropTypes.array.isRequired
};

function Short({cap, getPathUrl, itemsHash, itemsListAndGrouPath, onClickMore}) {
  let showMoreButton = itemsListAndGrouPath.length > cap;
  let total = itemsListAndGrouPath.length;

  itemsListAndGrouPath = spreadSlice(itemsListAndGrouPath, cap);

  return (
    <div>
      <ul className={styles.ulMini, "list-inline"}>
        {itemsListAndGrouPath.map(function([itemId, groupPath]) {
          var item = itemsHash[itemId] || {};
          var {imgMini = "nopic.png", title} = item;
          return (
            <li key={`il-${itemId}`}>
              <LazyLoad scroll resize once height={50}>
                <a href={getPathUrl(groupPath, {itemId})}>
                  <img
                    src={`${CDN_URL}/images/item/${imgMini}`}
                    alt={title}
                    width={50}
                    height={50}
                  />
                </a>
              </LazyLoad>
            </li>
          );
        })}
      </ul>
      {showMoreButton && (
        <p><button type="button" className="link-button" onClick={onClickMore}>
          <FormatMessage variables={{count: total}}>{'See all {count} items'}</FormatMessage>
        </button></p>
      )}
    </div>
  );
}

Short.propTypes = {
  getPathUrl: PropTypes.func.isRequired,
  itemsListAndGrouPath: PropTypes.array.isRequired,
  onClickMore: PropTypes.func.isRequired
};

class Expanded extends React.Component {
  componentWillMount() {
    this.setState({
      paginate: this.props.perPage
    });
  }

  componentDidMount() {
    this.scrollIfNeeded();
  }

  componentDidUpdate() {
    this.scrollIfNeeded();
  }

  scrollIfNeeded() {
    var {scrollToItemId} = this.props;
    if (scrollToItemId) {
      if (scrollToItemId in this.itemsRefs) {
        var element = this.itemsRefs[scrollToItemId];
        // Hack to wait until the page route performs its own scolling.
        window.setTimeout(() => {
          this.props.setScrollToItemId(null);
          scrollIntoViewPort(element, {force: true, offset: {y: -100}});
        });
      }
    }
  }

  render() {
    var meristem;
    var {Item, itemsHash, itemsList, perPage, scrollToItemId} = this.props;
    var {paginate} = this.state;
    this.itemsRefs = {};

    if (!scrollToItemId && itemsList.length > paginate) {
      meristem = (
        <li>
          <Inview onInview={() => this.setState({paginate: paginate + perPage})}>
            <FormatMessage>Loading more...</FormatMessage>
          </Inview>
        </li>
      );

      // Paginate
      itemsList = itemsList.slice(0, paginate);
    }

    return (
      <ul className={classnames("item-list--ul", styles.ul)}>
        {itemsList.map(itemId => {
          var item = itemsHash[itemId];
          return (
            <li key={`il-${itemId}`} ref={ref => this.itemsRefs[itemId] = ref}>
              {Item(item)}
            </li>
          );
        })}
        {meristem}
      </ul>
    );
  }
}

Expanded.propTypes = {
  Item: PropTypes.func.isRequired,
  itemsList: PropTypes.array.isRequired,
  scrollToItemId: PropTypes.number,
  setScrollToItemId: PropTypes.func
};

export default class ItemList extends React.Component {
  render() {
    var filteredList, isLoading, originalList;
    var {mode, ...otherProps} = this.props;
    var {itemsHash} = otherProps;
    var isAbbreviated = mode === "abbreviated";
    var isShort = mode === "short";

    if (isShort) {
      originalList = otherProps.itemsListAndGrouPath;
      filteredList = originalList.filter(([itemId]) => itemsHash[itemId]);
      isLoading = originalList.length > filteredList.length;
      otherProps.itemsListAndGrouPath = filteredList;
    } else {
      originalList = otherProps.itemsList;
      filteredList = originalList.filter(itemId => itemsHash[itemId]);
      isLoading = originalList.length > filteredList.length;
      otherProps.itemsList = filteredList;
    }

    return (
      <div className={classnames((isAbbreviated || isShort) ? "item-list--abbreviated" : "item-list", styles.area)}>
        <MediaQuery minDeviceWidth={0} maxDeviceWidth={480}>
          {isAbbreviated && <Abbreviated {...otherProps} />
           || isShort && <Short {...otherProps} cap={6 * 5} />
           || <Expanded {...otherProps} perPage={9} />
          }
        </MediaQuery>
        <MediaQuery minDeviceWidth={481} maxDeviceWidth={980}>
          {isAbbreviated && <Abbreviated {...otherProps} />
           || isShort && <Short {...otherProps} cap={16 * 5}/>
           || <Expanded {...otherProps} perPage={15} />
          }
        </MediaQuery>
        <MediaQuery minDeviceWidth={981}>
          {isAbbreviated && <Abbreviated {...otherProps} />
           || isShort && <Short {...otherProps} cap={16 * 5} />
           || <Expanded {...otherProps} perPage={15} />
          }
        </MediaQuery>
        {isLoading && <p className={styles.meristemArea}><Loading /></p>}
      </div>
    );
  }
}

ItemList.propTypes = {
  itemsHash: PropTypes.object.isRequired,
  mode: PropTypes.string
};
