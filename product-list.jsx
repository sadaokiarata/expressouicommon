import GroupList from "./product-list/group-list";
import ItemList from "./product-list/item-list";
import React, {PropTypes} from "react";

const foo = 5 * 3 * 3;

export default function List({Item, getItemsList, getItemsListAndGroupPath, getPathUrl, groupNode, groupPath, itemsHash, scrollToItemId, setScrollToItemId}) {
  var {children} = groupNode;
  var depth = groupPath.length;
  var itemsList = getItemsList(groupNode);

  return (
    <div>
      {children && children.length > 1 && // TOC
        <GroupList
          depth={depth}
          getItemsList={getItemsList}
          getPathUrl={getPathUrl}
          groupPath={groupPath}
          itemsHash={itemsHash}
          mode="abbreviated"
          notEmptyChildren={children}
        />
      }
      {children && itemsList.length > foo
        ? (
          <GroupList
            depth={depth}
            getItemsList={getItemsList}
            getItemsListAndGroupPath={getItemsListAndGroupPath}
            getPathUrl={getPathUrl}
            groupPath={groupPath}
            Item={Item}
            itemsHash={itemsHash}
            mode="short"
            notEmptyChildren={children}
          />
        ) : (
          <ItemList
            Item={Item}
            itemsHash={itemsHash}
            itemsList={itemsList}
            mode="expanded"
            scrollToItemId={scrollToItemId}
            setScrollToItemId={setScrollToItemId}
          />
        )
      }
    </div>
  );
}

List.propTypes = {
  getItemsList: PropTypes.func.isRequired,
  getItemsListAndGroupPath: PropTypes.func.isRequired,
  getPathUrl: PropTypes.func.isRequired,
  groupNode: PropTypes.object.isRequired,
  itemsHash: PropTypes.object.isRequired,
  scrollToItemId: PropTypes.number,
  setScrollToItemId: PropTypes.func.isRequired
};
