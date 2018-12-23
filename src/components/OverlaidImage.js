import React from "react";

import "./OverlaidImage.css";

export default ({ keyName, margin, width, height, image }) => (
  <div
    key={keyName}
    className="Overlaid-Image"
    style={{
      margin: margin,
      width: width,
      height: height
    }}
  >
    <div
      style={{
        backgroundImage: `url(${image})`,
        width: width,
        height: height
      }}
    />
    <div
      className={
        "Image-Overlay " + (image === "" ? "Image-Overlay--visible" : "")
      }
      style={{
        width: width,
        height: height
      }}
    />
  </div>
);
