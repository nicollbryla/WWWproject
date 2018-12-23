import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import Scroller from "./Scroller";
import Spinner from "./Spinner";
import HomeButton from "./HomeButton";
import { responseToBase64, loadSingleImage } from "../util";

import "./InfinitePage.css";
class InfinitePage extends React.PureComponent {
  loadImages = imagesCount =>
    Promise.all(
      fp.times(loadSingleImage(this.props.imagesEndpoint), imagesCount)
    ).then(fp.map(responseToBase64));

  render() {
    return (
      <div className="InfinitePage">
        <HomeButton />

        <Scroller loadImages={this.loadImages} Anchor={Spinner} />
      </div>
    );
  }
}

InfinitePage.propTypes = {
  imagesEndpoint: PropTypes.string
};

InfinitePage.defaultProps = {
  imagesEndpoint: "https://picsum.photos/200/200/?random"
};

export default InfinitePage;
