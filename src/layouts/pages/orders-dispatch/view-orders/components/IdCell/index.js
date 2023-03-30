/* eslint-disable no-underscore-dangle */
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

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IdCell({ order, checked, isCheckedFunction }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox
        defaultChecked={checked}
        onClick={(e) => {
          console.log(order);
          isCheckedFunction(e, order);
        }}
      />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {order ? order.PO : ""}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  order: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  checked: PropTypes.bool,
  isCheckedFunction: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default IdCell;
