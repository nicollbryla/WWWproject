import React from "react";
import SnakeMenuItem from "./SnakeMenuItem";

import "./SnakeContainer.css";

export default ({
  side,
  items,
  path,
  activePath,
  updatePath,
  updateCloseAll,
  closeAll
}) => (
  <div className="SnakeContainer" style={side}>
    {items.map((tab, i) => {
      const newPath = path + `${i}`;
      return (
        <SnakeMenuItem
          item={tab}
          activePath={activePath}
          path={newPath}
          updatePath={updatePath}
          updateCloseAll={updateCloseAll}
          closeAll={closeAll}
          key={`snake_menu_item_${newPath}`}
        />
      );
    })}
  </div>
);
