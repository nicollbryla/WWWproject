import React from "react";
import PropTypes from "prop-types";

import OverlaidImage from "./OverlaidImage";
import { isVisible } from "../util";

import "./Scroller.css";
class Scroller extends React.Component {
  state = { images: [], imagesCount: 0, anchorVisible: false, lock: 0 };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    const { imageHeight, imagesPerRow } = this.props;

    const initialCount = Math.round(
      (document.body.clientHeight / imageHeight) * (2 * imagesPerRow)
    );
    const roundedCount = initialCount - (initialCount % imagesPerRow);
    const actualCount = Math.max(imagesPerRow, roundedCount);

    this.appendImages(actualCount);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  setRef = ref => (this.anchor = ref);

  appendImages = count => {
    const { lock } = this.state;
    if (lock > 0) {
      this.setState({ lock: lock + 1 });
      return;
    }
    setTimeout(() => {
      const { lock } = this.state;
      this.setState({ lock: 0 });
      if (lock > 1) {
        this.appendImages();
      }
    }, 2000);
    this.setState({ lock: 1 });
    const { images, imagesCount } = this.state;
    const { imagesPerLoad, loadImages } = this.props;
    const actualCount = count || imagesPerLoad;

    this.setState({ imagesCount: imagesCount + actualCount });

    loadImages(actualCount).then(newImages => {
      this.setState({
        images: images.concat(newImages)
      });
    });
  };

  handleScroll = () => {
    const newAnchorVisible = isVisible(this.anchor);
    const { anchorVisible } = this.state;
    this.setState({ anchorVisible: newAnchorVisible });

    if (!anchorVisible && newAnchorVisible) {
      this.appendImages();
    }
  };

  marginWidth = () => this.props.imageWidth / 4;

  containerWidth = () => {
    const { imageWidth, borderSize, imagesPerRow } = this.props;
    return (
      imagesPerRow * (imageWidth + 2 * this.marginWidth() + 2 * borderSize)
    );
  };

  renderImages = () => {
    const { images, imagesCount } = this.state;
    const empty = Array(imagesCount - images.length).fill("");

    return images
      .concat(empty)
      .map((image, i) => (
        <OverlaidImage
          keyName={`infinite_scroller_image_${i}`}
          margin={this.marginWidth()}
          width={this.props.imageWidth}
          height={this.props.imageHeight}
          image={image}
        />
      ));
  };

  render() {
    const { Anchor } = this.props;

    return (
      <div className="Scroller">
        <div
          className="Scroller-Container"
          style={{
            width: this.containerWidth()
          }}
        >
          {this.renderImages()}
        </div>
        <div className="Anchor" ref={this.setRef}>
          <Anchor />
        </div>
      </div>
    );
  }
}

Scroller.propTypes = {
  Anchor: PropTypes.func,
  loadImages: PropTypes.func,
  imagesPerLoad: PropTypes.number,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imagesPerRow: PropTypes.number,
  borderSize: PropTypes.number
};

Scroller.defaultProps = {
  Anchor: () => <div />,
  imagesPerLoad: 6,
  imageWidth: 200,
  imageHeight: 200,
  imagesPerRow: 3,
  borderSize: 5
};

export default Scroller;
