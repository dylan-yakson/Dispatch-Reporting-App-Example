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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

function SigCell({ image, name, color }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDAvatar bgColor={color} src={image} alt={name} size="lg" />
      </MDBox>
      {/* <img height="70" width="70" src={image} alt="Canvas" /> */}
    </MDBox>
  );
}

// Setting default value for the props of SigCell
SigCell.defaultProps = {
  image: "",
  color: "dark",
};

// Typechecking props for the SigCell
SigCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default SigCell;
