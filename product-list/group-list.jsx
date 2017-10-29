import classnames from "classnames";
import ItemList from "./item-list";
import MediaQuery from "react-responsive";
import React, {PropTypes} from "react";
import Router from "../router";

import styles from "./group-list.sass";

const bigMaxCap = 3;

function AbbreviatedGroupList({getPathUrl, groupPath, notEmptyChildren, ...otherProps}) {
  return (
    <section className={classnames("group--abbreviated-list", styles.abbreviatedArea)}>
      <ul className={classnames("list-inline", styles.abbreviatedArea)}>
        {notEmptyChildren.sort(([groupNodeA, itemsListA], [groupNodeB, itemsListB]) => { // eslint-disable-line no-unused-vars
          return itemsListB.length - itemsListA.length;
        }).map(([groupNode, itemsList]) => {
          var {id, name} = groupNode;
          var thisGroupPath = groupPath.concat(groupNode);
          var href = getPathUrl(thisGroupPath);
          return (
            <li key={id}
              className={classnames("group--abbreviated-list-li", styles.abbreviatedItem)}
              onClick={() => {
                // This is a catch all click in this LI area.
                Router.navigate(href);
              }}
            >
              <h3>
                <a href={href} className={styles.abbreviatedItem}>
                  {name}
                </a>
              </h3>
              <span className={styles.abbreviatedItem}>{itemsList.length}</span>
              <ItemList {...otherProps} mode="abbreviated" itemsList={itemsList}/>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

AbbreviatedGroupList.propTypes = {
  getPathUrl: PropTypes.func.isRequired
};

function ShortGroupList({getItemsListAndGroupPath, groupPath, notEmptyChildren, ...otherProps}) {
  const {getPathUrl} = otherProps;
  return (
    <section className={classnames("group--short-list", styles.shortArea)}>
      <ul className={classnames("list-inline", styles.shortAreaItem)}>
        {notEmptyChildren.sort(([groupNodeA, itemsListA], [groupNodeB, itemsListB]) => { // eslint-disable-line no-unused-vars
          return itemsListB.length - itemsListA.length;
        }).map(([groupNode, itemsList]) => {
          var {id, name} = groupNode;
          var groupSizeStyle = itemsList.length > bigMaxCap ? "--l" : "--s";
          var thisGroupPath = groupPath.concat(groupNode);
          var itemsListAndGrouPath = getItemsListAndGroupPath(groupNode, thisGroupPath);
          var href = getPathUrl(thisGroupPath);
          return (
            <li key={id} className={classnames(groupSizeStyle, styles.shortAreaItem)}>
              <h3>
                <a href={href} className={styles.shortAreaItem}>
                  {name}
                </a>
              </h3>
              <ItemList {...otherProps} mode="short" groupPath={thisGroupPath} itemsListAndGrouPath={itemsListAndGrouPath}
                onClickMore={() => Router.navigate(href)}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

ShortGroupList.propTypes = {
  getItemsListAndGroupPath: PropTypes.func.isRequired,
  getPathUrl: PropTypes.func.isRequired
};

function FullGroupList({depth, groupPath, notEmptyChildren, ...otherProps}) {
  return (
    <section>
      {notEmptyChildren.map(([groupNode, itemsList]) => {
        var {id, name} = groupNode;
        var thisGroupPath = groupPath.concat(groupNode);
        return (
          <div key={id}>
            {depth === 0 &&
              <div className={classnames("group--title", styles.headerArea)}>
                <h2 style={{display: "inline-block"}}>{name}</h2>
              </div>
            }
            {depth > 0 &&
              <div className={classnames("group--title", styles.headerArea)}>
                <h3 style={{display: "inline-block"}}>{name}</h3>
              </div>
            }
            <ItemList {...otherProps} groupPath={thisGroupPath} itemsList={itemsList}/>
          </div>
        );
      })}
    </section>
  );
}

FullGroupList.propTypes = {
  depth: PropTypes.number.isRequired,
  groupPath: PropTypes.array.isRequired
};

export default class GroupList extends React.Component {
  render() {
    var {mode, getItemsList, ...otherProps} = this.props;

    otherProps.notEmptyChildren = otherProps.notEmptyChildren
      .map(groupNode => [groupNode, getItemsList(groupNode)]);

    return (
      mode === "abbreviated"
        ? (
          <div>
            <MediaQuery minDeviceWidth={0} maxDeviceWidth={480}>
              <AbbreviatedGroupList {...otherProps} caps={[1]}/>
            </MediaQuery>
            <MediaQuery minDeviceWidth={481} maxDeviceWidth={980}>
              <AbbreviatedGroupList {...otherProps} caps={[bigMaxCap, 1]}/>
            </MediaQuery>
            <MediaQuery minDeviceWidth={981}>
              <AbbreviatedGroupList {...otherProps} caps={[bigMaxCap, 1]}/>
            </MediaQuery>
          </div>
        )
        : <ShortGroupList {...otherProps}/>
    );
  }
}

GroupList.propTypes = {
  getItemsList: PropTypes.func.isRequired,
  mode: PropTypes.string,
  notEmptyChildren: PropTypes.array.isRequired
};
