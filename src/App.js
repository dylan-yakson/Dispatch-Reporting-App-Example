/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
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

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// // import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// Material Dashboard 2 PRO React routes
import routes from "routes";
import SignInBasic from "layouts/pages/sign-in/signin";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Auth Components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { checkIsLoggedIn, getLoginCookie, setLoginCookie, LogInUser } from "utils/koapi";
import noCopyPrint from "utils/noprint";
// MSAL Imports

export default function App({ pca }) {
  const [isAuthenticated, setIsUserLoggedOn] = useState(null);
  // const { login, result, error } = useMsalAuthentication("redirect");
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [controller, dispatch] = useMaterialUIController();
  /* eslint-disable no-unused-vars */
  /* eslint-disable no-undef */
  /* eslint-disable no-restricted-globals */
  /* eslint-disable no-multi-assign */
  /*
NoPrint.js V1.0
Created by PDFAntiCopy.com
*/
  // document.body.oncopy = function () {
  //   return false;
  // };
  // document.body.oncontextmenu = function () {
  //   return false;
  // };
  // document.body.onselectstart = document.body.ondrag = function () {
  //   return false;
  // };
  // document.onkeydown = function () {
  //   if (event.ctrlKey === true && event.keyCode === 83) {
  //     event.preventDefault();
  //   }
  // };
  // const c = document.createElement("span");
  // c.style.display = "none";
  // c.style.postion = "absolute";
  // c.style.background = "#000";
  // const first = document.body.firstChild;
  // const wraphtml = document.body.insertBefore(c, first);
  // c.setAttribute("width", document.body.scrollWidth);
  // c.setAttribute("height", document.body.scrollHeight);
  // c.style.display = "block";
  // const cssNode3 = document.createElement("style");
  // cssNode3.type = "text/css";
  // cssNode3.media = "print";
  // cssNode3.innerHTML = "body{display:none}";
  // document.head.appendChild(cssNode3);
  // const cssNode2 = document.createElement("style");
  // cssNode2.type = "text/css";
  // cssNode2.media = "screen";
  // cssNode2.innerHTML =
  //   "div{-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}";
  // document.head.appendChild(cssNode2);
  // document.body.style.cssText =
  //   "-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;";

  // function toBlur() {
  //   if (autoBlur)
  //     document.body.style.cssText =
  //       "-webkit-filter: blur(5px);-moz-filter: blur(5px);-ms-filter: blur(5px);-o-filter: blur(5px);filter: blur(5px);";
  // }

  // function toClear() {
  //   document.body.style.cssText =
  //     "-webkit-filter: blur(0px);-moz-filter: blur(0px);-ms-filter: blur(0px);-o-filter: blur(0px);filter: blur(0px);";
  // }

  // document.onclick = function (event) {
  //   toClear();
  // };

  // document.onmouseleave = function (event) {
  //   toBlur();
  // };

  // document.onblur = function (event) {
  //   toBlur();
  // };

  // document.addEventListener("keyup", (e) => {
  //   if (e.key === "PrintScreen") {
  //     if (noScreenshot) {
  //       navigator.clipboard.writeText("");
  //     }
  //   }
  // });

  // document.addEventListener("keydown", (e) => {
  //   if (e.ctrlKey && e.key === "p") {
  //     if (noPrint) {
  //       e.cancelBubble = true;
  //       e.preventDefault();
  //       e.stopImmediatePropagation();
  //     }
  //   }
  // });

  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  // useEffect(() => {
  //   console.log("changed path");
  // }, [location.pathname]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  // useEffect(() => {
  //   // document.documentElement.scrollTop = 0;
  //   // document.scrollingElement.scrollTop = 0;
  // }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        // if (!route.accessibleWithoutAuth) {
        //   return (
        //     <Route
        //       exact
        //       path={route.route}
        //       element={
        //         <>
        //         {isAuthenticated && (
        //           route.component
        //             )}
        //             {!isAuthenticated && (
        //                  <Navigate to="/authentication/sign-in/basic" />
        //             )}
        //         </>
        //       }
        //       key={route.key}
        //     />
        //   );

        //   // <Route exact path={route.route} element={route.component} key={route.key} />;
        // }
        return (
          <Route exact path={route.route} element={<>{isAuthenticated && route.component}</>} />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      checkIsLoggedIn().then((data) => {
        setIsUserLoggedOn(data);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <SignInBasic />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {!isAuthenticated ? <Navigate to="/authentication/sign-in" /> : <></>}

      {isAuthenticated && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Key Performance Orders"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
          {configsButton} */}
        </>
      )}
      {/* {layout === "vr" && <Configurator />} */}
      <Routes>{getRoutes(routes)}</Routes>
    </ThemeProvider>
  );
}
