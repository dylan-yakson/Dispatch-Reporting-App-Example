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

// @mui material components
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 PRO React components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Dispatch page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
// import PaymentMethod from "layouts/pages/orders-dispatch/dispatch/components/PaymentMethod";
// import Invoices from "layouts/pages/orders-dispatch/dispatch/components/Invoices";
import Drivers from "layouts/pages/orders-dispatch/dispatch/components/Drivers";
import Invoice from "layouts/pages/orders-dispatch/invoice";

import {
  pullCustomerAddresses,
  PullOrdersReadyForDispatch,
  pullPreviousPrices,
  pullProductPackages,
  pullProducts,
  pullOrderStatus,
  pullFuelOrders,
  sendOrderConfirmationEmail,
  PullWarehouseTrucks,
  PullDrivers,
} from "utils/koapi";

function Dispatch({ OrderToEdit, onOrderCompletion, alertFunction }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drivers, setDrivers] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [DispatchStatusAlert, setDispatchStatusAlert] = useState(false);

  const [quoteOrOrder, setIsQuoteOrOrder] = useState(
    OrderToEdit.requestPayload.sales.quoteType || "ORDER"
  );

  useEffect(() => {
    setisLoading(true);
    PullDrivers().then((availableDrivers) => {
      setDrivers(availableDrivers);
      console.log(availableDrivers);
      setisLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="flex-start" mb={2}>
        <CircularProgress center />
      </MDBox>
    );
  }
  return (
    <MDBox mt={4}>
      {DispatchStatusAlert}
      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Drivers
              drivers={drivers}
              order={OrderToEdit}
              setDispatchStatusAlertFunction={setDispatchStatusAlert}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Invoice
              OrderData={OrderToEdit.requestPayload}
              po={OrderToEdit.PO}
              orderDate={OrderToEdit.createdDate}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
Dispatch.propTypes = {
  OrderToEdit: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  onOrderCompletion: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  alertFunction: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Dispatch;
