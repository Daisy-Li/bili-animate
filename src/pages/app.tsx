import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.scss";

import Banner from "../components/Banner";

ReactDOM.render(
  <div className="App">
    <Banner />
  </div>,
  document.getElementById("app") as HTMLElement
);
