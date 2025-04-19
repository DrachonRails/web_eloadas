import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import KoPapirOllo from "./KoPapirOllo.js";
import Stopper from "./Stopper.js";

function App({ activeApp }) {
  return (
    <div>
      {activeApp === "game" && <KoPapirOllo />}
      {activeApp === "stopper" && <Stopper />}
    </div>
  );
}

let currentApp = "game";
window.setApp = function (app) {
  currentApp = app;
  render();
};

function render() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App activeApp={currentApp} />);
}

render();
