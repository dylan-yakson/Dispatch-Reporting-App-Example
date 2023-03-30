/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
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
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

// Billing page components
import Bill from "layouts/pages/orders-dispatch/dispatch/components/Bill";
import { DispatchOrderToDriver } from "utils/koapi";

function Drivers({ drivers, order, setDispatchStatusAlertFunction }) {
  const [availableDrivers, setavailableDrivers] = useState(false);
  const [selectedDriver, setselectedDriver] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setavailableDrivers(drivers);
    console.log(drivers);
  }, []);
  function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      // eslint-disable-next-line no-param-reassign
      property = property.substr(1);
    }

    // eslint-disable-next-line func-names
    return function (a, b) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property]);
      }
      return a[property].localeCompare(b[property]);
    };
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const dispatchOrderToDriver = (selectedDriverResponse) => {
    console.log(selectedDriverResponse);
    setselectedDriver(selectedDriverResponse);
    setDialogOpen(true);
  };
  const handleDispatchOrderCompletion = (driverToDispatch, OrderToDispatch) => {
    console.log(driverToDispatch);
    console.log(OrderToDispatch);
    for (const i in OrderToDispatch) {
      const currentOrder = OrderToDispatch[i];
      DispatchOrderToDriver(currentOrder, driverToDispatch).then((response) => {
        console.log(response);
        setDispatchStatusAlertFunction(
          <MDAlert color="success">
            Order has been Dispatched to {driverToDispatch.name || ""}
            <MDAlertCloseIcon
              onClick={() => {
                setDispatchStatusAlertFunction(null);
              }}
            >
              &times;
            </MDAlertCloseIcon>
          </MDAlert>
        );
      });
    }
    setDialogOpen(false);
  };

  return (
    <Card id="delete-account">
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to dispatch this order to{" "}
          {selectedDriver ? selectedDriver.name : ""}?
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Make sure everything is correct before you shoot it our way please. Once its in, we
            start working on it.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleDialogClose}>Disagree</MDButton>
          <MDButton onClick={() => handleDispatchOrderCompletion(selectedDriver, order)} autoFocus>
            Agree
          </MDButton>
        </DialogActions>
      </Dialog>
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Drivers Available
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {drivers ? (
            drivers
              .sort(dynamicSort("name"))
              .map((driver) => (
                <Bill driver={driver} dispatchOrderFunction={dispatchOrderToDriver} />
              ))
          ) : (
            <></>
          )}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the Bill
Drivers.propTypes = {
  drivers: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  order: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  setDispatchStatusAlertFunction: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

export default Drivers;
