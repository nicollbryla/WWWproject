import React from "react";

import { withRouter } from "react-router-dom";

import "./HomeButton.css";
const HomeButton = ({ history }) => (
  <button className="HomeButton" onClick={() => history.push("/home")}>
    Home
  </button>
);

export default withRouter(HomeButton);
