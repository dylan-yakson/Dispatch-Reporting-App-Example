/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, useLocation } from "react-router-dom";
// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { PublicClientApplication } from "@azure/msal-browser";
// import { PublicClientApplication } from "@azure/msal-node";

import { createStore } from "redux";
import allReducers from "reducers/index";
import { CustomNavigationClient } from "utils/NavigationClient";
import App from "App";

const store = createStore(allReducers);

ReactDOM.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
