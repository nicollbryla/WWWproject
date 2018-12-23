import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { responseToBase64, loadSingleImage } from "../util";
import OverlaidImage from "./OverlaidImage";
import HomeButton from "./HomeButton";

import "./ParallaxPage.css";
import Parallaxer from "./Parallaxer";
class ParallaxPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { images: Array(props.imagesCount).fill("") };
  }

  componentWillMount() {
    const { imagesEndpoint, imagesCount } = this.props;

    Promise.all(fp.times(loadSingleImage(imagesEndpoint), imagesCount))
      .then(fp.map(responseToBase64))
      .then(result => this.setState({ images: result }));
  }

  renderImages = () => {
    const { imageWidth, imageHeight } = this.props;
    const { images } = this.state;
    return images.map((image, i) => (
      <Parallaxer key={`parallax_image_${i}`} i={i}>
        <OverlaidImage
          margin={imageWidth / 10}
          width={imageWidth}
          height={imageHeight}
          image={image}
        />
      </Parallaxer>
    ));
  };

  render() {
    console.log(this.state.images);
    return (
      <div className="ParallaxPage">
        <HomeButton />
        <div className="ParallaxContainer">{this.renderImages()}</div>
      </div>
    );
  }
}

ParallaxPage.propTypes = {
  imagesEndpoint: PropTypes.string,
  imagesCount: PropTypes.number,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number
};

ParallaxPage.defaultProps = {
  imagesEndpoint: "https://picsum.photos/600/600/?random",
  imagesCount: 15,
  imageWidth: 600,
  imageHeight: 600
};

export default ParallaxPage;
