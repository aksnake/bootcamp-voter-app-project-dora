import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { VoterApp } from "./components/VoterApp";
import { BrowserRouter as Router } from "react-router-dom";

import { voterAppStore } from "./stores/voterAppStore";


render(
  <Provider store={voterAppStore}>
    <Router>
      <VoterApp/>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
