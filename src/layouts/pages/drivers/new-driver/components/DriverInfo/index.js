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
import { useEffect, useState } from "react";
// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// NewUser page components
import MDDatePicker from "components/MDDatePicker";
import MDInput from "components/MDInput";
import FormField from "layouts/pages/drivers/new-driver/components/FormFields/FormField";
import { ErrorMessage, Field } from "formik";

import { pullOriginWarehouses, getLoginCookie } from "utils/koapi";

function OrderInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { driverName, driverEmail, driverAssignedTruck } = formField;
  const [originWarehouseLocations, setOriginWarehouseLocations] = useState({});
  const orderFilterDate = new Date(Date.now());
  orderFilterDate.setDate(orderFilterDate.getDate() - 1);
  const {
    driverName: driverNameV,
    driverEmail: driverEmailV,
    driverAssignedTruck: driverAssignedTruckV,
  } = values;
  useEffect(() => {
    const tmpOriginWarehouseLocations = pullOriginWarehouses();
    setOriginWarehouseLocations(tmpOriginWarehouseLocations);

    // Set Sales Data
    getLoginCookie().then((accountData) => {
      if (accountData && accountData.account.email) {
        setFieldValue("salesName", accountData.account.name);
        setFieldValue("salesEmail", accountData.account.email.toLowerCase());
      }
    });
  }, []);
  const itemMargins = "5px 0px 25px 0px";
  return (
    <MDBox>
      <MDTypography variant="h5">Driver Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={driverName.type}
              label={driverName.label}
              name={driverName.name}
              value={driverNameV}
              placeholder={driverName.placeholder}
            />
            <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
              <ErrorMessage name={driverName.name} />
            </MDTypography>
          </Grid>
          <Grid item xs={12}>
            <FormField
              type={driverEmail.type}
              label={driverEmail.label}
              name={driverEmail.name}
              value={driverEmailV}
              placeholder={driverEmail.placeholder}
            />
            <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
              <ErrorMessage name={driverEmail.name} />
            </MDTypography>
          </Grid>
          {originWarehouseLocations.length > 0 ? (
            <Grid item xs={12} sm={12} margin={itemMargins}>
              {/* <FormField type="text" label="Name" /> */}
              <MDBox>
                <MDBox display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    {driverAssignedTruck.name}
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  placeholder={driverAssignedTruck.placeholder}
                  defaultValue="Quote"
                  options={originWarehouseLocations.map((item) => item.address)}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                  onSelect={(val) => setFieldValue("driverAssignedTruck", val.target.value)}
                  value={driverAssignedTruckV}
                />
                <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
                  <ErrorMessage name={driverAssignedTruck.name} />
                </MDTypography>
              </MDBox>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </MDBox>
    </MDBox>
    // <MDBox>
    //   <MDTypography variant="h5" fontWeight="bold">
    //     Profile
    //   </MDTypography>
    //   <MDBox mt={1.625}>
    //     <Grid container spacing={1}>
    //       <Grid item xs={12}>
    //         <FormField
    //           type={publicEmail.type}
    //           label={publicEmail.label}
    //           name={publicEmail.name}
    //           value={publicEmailV}
    //           placeholder={publicEmail.placeholder}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <FormField
    //           type={bio.type}
    //           label={bio.label}
    //           name={bio.name}
    //           value={bioV}
    //           placeholder={bio.placeholder}
    //           multiline
    //           rows={5}
    //         />
    //       </Grid>
    //     </Grid>
    //   </MDBox>
    // </MDBox>
  );
}

// typechecking props for Profile
OrderInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default OrderInfo;
