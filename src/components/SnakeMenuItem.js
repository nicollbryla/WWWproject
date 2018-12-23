import React from "react";
import PropTypes from "prop-types";
import { startsWith, delay } from "lodash";
import SnakeContainer from "./SnakeContainer";

import "./SnakeMenuItem.css";

export default class SnakeMenuItem extends React.PureComponent {
  isVisible = () => {
    const { path, activePath } = this.props;
    return (
      path.length - activePath.length <= 1 &&
      startsWith(activePath, path.slice(0, -1))
    );
  };

  doCloseAll = () => {
    const { updatePath, closeAll } = this.props;
    if (closeAll) {
      updatePath("");
    }
  };

  handleMouseEnter = visible => () => {
    if (!visible) return;
    console.log("ENTER");
    const { path, updatePath, updateCloseAll } = this.props;
    updatePath(path);
    updateCloseAll(false);
    delay(() => updateCloseAll(true), 300);
  };

  handleMouseLeave = visible => () => {
    if (!visible) return;
    console.log("LEAVE");
    delay(this.doCloseAll, 200);
  };

  render() {
    const {
      item,
      path,
      activePath,
      updatePath,
      closeAll,
      updateCloseAll
    } = this.props;
    const visible = this.isVisible();
    const className =
      "SnakeMenuItem " + (visible ? "SnakeMenuItem--visible" : "");

    const sides = [
      { right: -270 * item.tabs.length, top: 0 },
      { bottom: -53 * item.tabs.length, left: 0, flexDirection: "column" }
    ];
    const side = sides[path.length % 2];
    const buttonStyle =
      visible && path.slice(0, -1) !== activePath && path !== activePath
        ? { opacity: 0.7 }
        : {};
    return (
      <React.Fragment>
        <button
          className={className}
          onClick={item.onClick}
          onMouseEnter={this.handleMouseEnter(visible)}
          onMouseLeave={this.handleMouseLeave(visible)}
          style={buttonStyle}
        >
          {item.title}
        </button>
        {visible && (
          <SnakeContainer
            side={side}
            items={item.tabs}
            activePath={activePath}
            path={path}
            updatePath={updatePath}
            updateCloseAll={updateCloseAll}
            closeAll={closeAll}
          />
        )}
      </React.Fragment>
    );
  }
}

SnakeMenuItem.propTypes = {
  item: PropTypes.object,
  path: PropTypes.string,
  activePath: PropTypes.string,
  updatePath: PropTypes.func,
  closeAll: PropTypes.bool,
  updateCloseAll: PropTypes.func
};
