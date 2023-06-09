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
import FormField from "layouts/pages/orders-sitetosite/new-order/components/FormFields/FormField";
import { ErrorMessage, Field } from "formik";

import { pullOriginWarehouses, getLoginCookie } from "utils/koapi";

function OrderInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { isQuoteOrOrder, customerType, deliveryByDate, quoteNum, originAddress } = formField;
  const [originWarehouseLocations, setOriginWarehouseLocations] = useState([{}]);
  const [currentUser, setCurrentUser] = useState(false);

  const {
    quoteNum: quoteNumV,
    isQuoteOrOrder: isQuoteOrOrderV,
    deliveryByDate: deliveryByDateV,
    customerType: customerTypeV,
    originAddress: originAddressV,
  } = values;
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLoginCookie().then((accountData) => {
        console.log(accountData.account);
        if (accountData && accountData.account.email) {
          setCurrentUser(accountData);
          const tmpOriginWarehouseLocations = pullOriginWarehouses();
          setOriginWarehouseLocations(tmpOriginWarehouseLocations);
          // Set Sales Data
          setFieldValue("salesName", accountData.account.name);
          setFieldValue("salesEmail", accountData.account.email.toLowerCase());
          setFieldValue("isQuoteOrOrder", "Order");
          setFieldValue("customerType", "End User");
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const itemMargins = "5px 0px 25px 0px";
  return (
    <MDBox>
      <MDTypography variant="h5">Order Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormField
              type={quoteNum.type}
              label={quoteNum.label}
              name={quoteNum.name}
              value={quoteNumV}
              placeholder={quoteNum.placeholder}
            />
            <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
              <ErrorMessage name={quoteNum.name} />
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
                    {originAddress.name}
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  placeholder={originAddress.placeholder}
                  options={originWarehouseLocations.map((item) => item.address)}
                  renderInput={(params) => <MDInput {...params} variant="standard" />}
                  onSelect={(val) => {
                    const selectedValue = val.target.value;
                    console.log(selectedValue);
                    setFieldValue("originAddress", selectedValue);
                    const destinationAddressVal = val.target.value;
                    const addressSelected = originWarehouseLocations.filter(
                      (value) => value.name === destinationAddressVal
                    )[0];
                    if (val && addressSelected) {
                      console.log(val);
                      console.log(addressSelected);
                      console.log("CHANGING NAME");
                      setFieldValue("originAddress", addressSelected.address);
                    }
                  }}
                  value={originAddressV}
                />
                <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
                  <ErrorMessage name={originAddress.name} />
                </MDTypography>
              </MDBox>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        {/* <Grid container spacing={3}>
           <Grid item xs={12} sm={6} margin={itemMargins}>
            <MDBox>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Quote or Order?
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="Order"
                options={["Order", "Quote"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
                onSelect={(val) => setFieldValue("isQuoteOrOrder", val.target.value)}
                value={isQuoteOrOrderV}
              />
              <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
                <ErrorMessage name={isQuoteOrOrder.name} />
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6} margin={itemMargins}>
            <MDBox>
              <MDBox display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Customer Type?
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="End User"
                options={["End User", "Distributor"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
                onSelect={(val) => setFieldValue("customerType", val.target.value)}
                value={customerTypeV}
              />
              <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
                <ErrorMessage name={customerType.name} />
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid> */}
      </MDBox>
      <MDBox mt={3} fullWidth>
        <Grid container spacing={3}>
          <Grid item margin={itemMargins}>
            <MDBox>
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Needing Delivery By&nbsp;&nbsp;
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <MDDatePicker
          input={{ placeholder: "Select a date" }}
          options={{ minDate: new Date(Date.now()) }}
          onChange={(val) => {
            console.log(val);
            setFieldValue("deliveryByDate", val);
          }}
          fullWidth
          value={deliveryByDateV}
        />
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={deliveryByDate.name} />
        </MDTypography>
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
