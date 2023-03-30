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
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// // @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
// import BasicLayout from "layouts/authentication/components/BasicLayout";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Login Methods
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { checkIsLoggedIn, getLoginCookie, setLoginCookie, LogInUser } from "utils/koapi";

function Basic() {
  const [usernameFocus, setusernameFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);
  const [username, setusernameValue] = useState(false);
  const [password, setpasswordValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isAuthenticated, setIsUserLoggedOn] = useState(false);
  const handleLogin = () => {
    if (username && password) {
      LogInUser(username, password).then((response) => {
        const { data } = response;
        if (!data.error) {
          setLoginCookie(JSON.stringify(data)).then((result) => {
            setIsUserLoggedOn(true);
          });
        } else {
          setErrorMessage("Error logging in, please try again or contact IT");
        }
      });
    }
  };
  const setUsername = (e) => {
    setusernameValue(e.target.value);
  };
  const setPassword = (e) => {
    setpasswordValue(e.target.value);
  };
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
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return <Navigate to="/dashboards/sales" />;
  }
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {/* <MDBox mt={4} mb={1}> */}
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                onFocus={(e) => setpasswordFocus(true)}
                onBlur={(e) => setpasswordFocus(false)}
                onChange={setUsername}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                onFocus={(e) => setpasswordFocus(true)}
                onBlur={(e) => setpasswordFocus(false)}
                onChange={setPassword}
                fullWidth
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={() => handleLogin()} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            {/* </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
