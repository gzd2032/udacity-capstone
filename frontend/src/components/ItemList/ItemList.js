import React from "react";
import Items from "./Items";

export default function ItemList({
  items,
  listType,
  setlistType,
  setItems,
  permissions,
}) {

  return (
    <>
      <h1 className="itemHeader"> {listType}</h1>
      <div className="itemList">
        {(items.length < 1)
          ? <p>no items</p>
          : items.map((item) => {
          return (
            <Items
              key={item.id}
              item={item}
              listType={listType}
              setlistType={setlistType}
              setItems={setItems}
              permissions={permissions}
            />
          )}
        )}
      </div>
    </>
  );
}
