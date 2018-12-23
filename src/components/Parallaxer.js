import React from "react";

import { isVisible } from "../util";

class Parallaxer extends React.Component {
  state = { translate: 0 };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  getTranslate = (top, height) => -Math.pow(top / height, 2) * 100;

  handleScroll = () => {
    if (!isVisible(this.ref, h => h)) {
      return;
    }
    const { top, height } = this.ref.getBoundingClientRect();
    this.setState({
      translate: this.getTranslate(top, height)
    });
  };

  setRef = ref => (this.ref = ref);

  render() {
    const { translate } = this.state;
    return (
      <div
        ref={this.setRef}
        style={{ transform: `translateY(${translate}px)` }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Parallaxer;
