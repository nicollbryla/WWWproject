import React from "react";
import PropTypes from "prop-types";
import SnakeContainer from "./SnakeContainer";
import { withRouter } from "react-router-dom";

import "./SnakeMenu.css";
class SnakeMenu extends React.Component {
  state = { path: "" };

  updatePath = newPath => {
    this.setState({ path: newPath });
  };

  updateCloseAll = newCloseAll => {
    this.setState({ closeAll: newCloseAll });
  };

  render() {
    const { items } = this.props;
    const { path, closeAll } = this.state;
    return (
      <div className="SnakeMenu">
        <SnakeContainer
          items={items}
          activePath={path}
          path=""
          updatePath={this.updatePath}
          updateCloseAll={this.updateCloseAll}
          closeAll={closeAll}
        />
      </div>
    );
  }
}

SnakeMenu.propTypes = {
  items: PropTypes.array
};

export default withRouter(SnakeMenu);
