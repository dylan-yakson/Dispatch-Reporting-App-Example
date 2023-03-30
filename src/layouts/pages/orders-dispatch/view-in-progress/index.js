/* eslint-disable no-underscore-dangle */
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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAlert from "components/MDAlert";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";

// Data
import generateDataTableFromOrders from "layouts/pages/orders-dispatch/view-in-progress/data/generateDataTableFromOrders";
import DispatchOrder from "layouts/pages/orders-dispatch/dispatchMultipleOrders";
import Invoice from "layouts/pages/orders-dispatch/invoice";

import {
  PullOrdersInProgress,
  PullOrdersReadyForDispatch,
  pullPreviousPrices,
  pullProductPackages,
  pullProducts,
  pullOrderStatus,
  pullFuelOrders,
  sendOrderConfirmationEmail,
} from "utils/koapi";

function OrderList() {
  const [menu, setMenu] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [warehouseOrderData, setwarehouseOrderData] = useState(null);
  const [FuelOrderData, setFuelOrderData] = useState(null);
  const [OrderStatusAlert, setOrderStatusAlert] = useState(null);
  const [dispatchedOrders, setDispatchedOrders] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState(null);
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState(null);
  const [selectedOrderToReview, setSelectedOrderToReview] = useState(null);
  const [isDispatchingOrder, setisDispatchingOrder] = useState(null);
  const [isReviewingOrder, setisReviewingOrder] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isActiveResendEmailAlert, setResendEmailAlert] = useState(null);
  const [emailToSendTo, setEmailToResendSendTo] = useState(null);
  const [orderToEmail, setorderToEmail] = useState(null);
  const [activeOrders, setactiveOrders] = useState(null);
  const [ordersChecked, setOrdersChecked, getOrdersChecked] = useState(null);
  // const { instance, accounts } = useMsal();

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);
  const TestOrdersChecked = [];
  const updateOrderFunction = (order) => {
    // eslint-disable-next-line no-alert
    console.log(`Updating order ${order.PO}`);
    console.log(order);
    // eslint-disable-next-line no-underscore-dangle
    setSelectedOrderToEdit(order);
    setisDispatchingOrder(true);
  };
  const isCheckedFunction = (e, order) => {
    console.log(order);
    setisLoading(true);
    const isTicked = e.target.value;
    const tmpOrdersChecked = ordersChecked || [];
    const filteredOrders = ordersChecked
      ? TestOrdersChecked.filter((tmpOrder) => tmpOrder.PO === order.PO)
      : [];
    console.log("orders currently checked");
    console.log(tmpOrdersChecked);
    console.log("Filtered Order");
    console.log(filteredOrders);
    // if (filteredOrders.length > 1) {
    //   tmpOrdersChecked = tmpOrdersChecked.filter((tmpOrder) => tmpOrder.PO !== order.PO);
    // } else {
    //   tmpOrdersChecked.push(order);
    // }
    TestOrdersChecked.push(order);
    console.log("Temp Order");
    console.log(TestOrdersChecked);
    setOrdersChecked(TestOrdersChecked);
    setisLoading(false);
  };
  const handleMultiDispatchFunction = () => {
    console.log("orders currently checked");
    console.log(ordersChecked);
    setisDispatchingOrder(true);
  };
  const reviewOrderFunction = (order) => {
    // eslint-disable-next-line no-alert
    console.log(`Editing order ${order.PO}`);
    console.log(order);
    setSelectedOrderToReview(order);
    setisReviewingOrder(true);
  };
  const refreshButtonFunction = () => {
    setisLoading(true);
    PullOrdersInProgress().then((dispatchOrders) => {
      setDispatchedOrders(dispatchOrders);
      console.log(dispatchOrders);
      const tmpfuelOrders = dispatchOrders.filter((order) => order.type === "Bulk Fuel");
      const tmpwarehouseOrders = dispatchOrders.filter((order) => order.type === "Warehouse");
      const warehouseTableData = generateDataTableFromOrders(
        tmpwarehouseOrders,
        updateOrderFunction,
        reviewOrderFunction,
        isCheckedFunction,
        []
      );
      const fuelTableData = generateDataTableFromOrders(
        tmpfuelOrders,
        updateOrderFunction,
        reviewOrderFunction,
        isCheckedFunction,
        []
      );
      // setOrderData(tableData);
      setwarehouseOrderData(warehouseTableData);
      setFuelOrderData(fuelTableData);
      setisLoading(false);
    });
  };
  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleMultiDispatchFunction()}>Dispatch</MenuItem>
      <MenuItem onClick={closeMenu}>Cancel</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
    </Menu>
  );
  useEffect(() => {
    setisLoading(true);
    PullOrdersInProgress().then((dispatchOrders) => {
      setDispatchedOrders(dispatchOrders);
      console.log(dispatchOrders);
      const tmpfuelOrders = dispatchOrders.filter((order) => order.type === "Bulk Fuel");
      const tmpwarehouseOrders = dispatchOrders.filter((order) => order.type === "Warehouse");
      const warehouseTableData = generateDataTableFromOrders(
        tmpwarehouseOrders,
        updateOrderFunction,
        reviewOrderFunction,
        isCheckedFunction,
        []
      );
      const fuelTableData = generateDataTableFromOrders(
        tmpfuelOrders,
        updateOrderFunction,
        reviewOrderFunction,
        isCheckedFunction,
        []
      );
      // setOrderData(tableData);
      setwarehouseOrderData(warehouseTableData);
      setFuelOrderData(fuelTableData);
      setisLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox display="flex" justifyContent="center" alignItems="flex-start" mb={2}>
          <CircularProgress center />
        </MDBox>
      </DashboardLayout>
    );
  }
  if (isDispatchingOrder) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DispatchOrder
              orders={ordersChecked}
              onOrderCompletion={() => {
                setisDispatchingOrder(false);
                setisLoading(false);
              }}
              alertFunction={setOrderStatusAlert}
            />
          </Grid>
          <Grid item xs={12}>
            <Footer padding="30px" margin="30px" />
          </Grid>
        </Grid>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {OrderStatusAlert}
      <DashboardNavbar />
      <MDBox>
        {/* {isDispatchingOrder ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DispatchOrder
                OrderToEdit={ordersChecked}
                onOrderCompletion={() => {
                  setisDispatchingOrder(false);
                  setisLoading(false);
                }}
                alertFunction={setOrderStatusAlert}
              />
            </Grid>
            <Grid item xs={12}>
              <Footer padding="30px" margin="30px" />
            </Grid>
          </Grid>
        ) : ( */}
        <MDBox my={3}>
          <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <MDBox display="flex">
              <MDBox ml={1}>
                <MDButton variant="outlined" color="dark" onClick={refreshButtonFunction}>
                  <Icon>refresh</Icon>
                  &nbsp;Refresh
                </MDButton>
              </MDBox>
              <MDBox ml={1}>
                <MDButton variant="outlined" color="dark" onClick={refreshButtonFunction}>
                  <Icon>add</Icon>
                  <Link to="/orders/new-order-fuel">&nbsp;New Order</Link>
                </MDButton>
              </MDBox>
              <MDBox>
                <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                  Actions&nbsp;
                  <Icon>keyboard_arrow_down</Icon>
                </MDButton>
                {renderMenu}
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox my={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Card>
                  <h4 style={{ textAlign: "center", marginTop: "20px" }}>WAREHOUSE</h4>

                  {warehouseOrderData ? (
                    <DataTable table={warehouseOrderData || []} entriesPerPage={false} canSearch />
                  ) : (
                    <></>
                  )}
                </Card>{" "}
              </Grid>
              <Grid item xs={12} lg={6}>
                <Card>
                  <h4 style={{ textAlign: "center", marginTop: "20px" }}>FUEL</h4>
                  {FuelOrderData ? (
                    <DataTable table={FuelOrderData || []} entriesPerPage={false} canSearch />
                  ) : (
                    <></>
                  )}
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        {/* )} */}
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderList;
