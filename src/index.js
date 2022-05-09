import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
