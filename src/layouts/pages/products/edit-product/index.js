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
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";

// Data
import dataTableData from "layouts/pages/products/edit-product/data/dataTableData";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import generateDataTableFromOrders from "layouts/pages/products/edit-product/data/fuelOrderDataTable";
import EditOrder from "layouts/pages/orders-warehouse/edit-order";
import Invoice from "layouts/pages/orders-warehouse/invoice";

import {
  pullCustomerAddresses,
  pullWarehouseOrders,
  pullPreviousPrices,
  pullProductPackages,
  pullProducts,
  pullWarehouseDispatchOrders,
  pullOrderStatus,
} from "utils/koapi";

function OrderList() {
  const { instance, accounts } = useMsal();
  const [menu, setMenu] = useState(null);
  const { login, result, error } = useMsalAuthentication("redirect");
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [OrderStatusAlert, setOrderStatusAlert] = useState(null);
  const [dispatchedOrders, setDispatchedOrders] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState(null);
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState(null);
  const [selectedOrderToReview, setSelectedOrderToReview] = useState(null);
  const [isEditingOrder, setisEditingOrder] = useState(null);
  const [isReviewingOrder, setisReviewingOrder] = useState(null);

  // const { instance, accounts } = useMsal();

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const updateOrderFunction = (order) => {
    // eslint-disable-next-line no-alert
    console.log(`Updating order ${order.PO}`);
    console.log(order);
    // eslint-disable-next-line no-underscore-dangle
    setSelectedOrderToEdit(order);
    setisEditingOrder(true);
  };
  const reviewOrderFunction = (order) => {
    // eslint-disable-next-line no-alert
    console.log(`Editing order ${order.PO}`);
    console.log(order);
    setSelectedOrderToReview(order);
    setisReviewingOrder(true);
  };
  const resendEmailOrderFunction = (order) => {
    // eslint-disable-next-line no-alert
    console.log(`Updating order ${order.PO}`);
    console.log(order);
    // eslint-disable-next-line no-underscore-dangle
    setisEditingOrder(true);
  };
  const refreshButtonFunction = () => {
    setIsLoading(true);
    const { username } = accounts[0];
    console.log(username);
    console.log(accounts[0]);
    pullWarehouseDispatchOrders(username).then((dispatchOrders) => {
      setDispatchedOrders(dispatchOrders);
    });
    pullWarehouseOrders(username).then((response) => {
      const orders = response;
      try {
        pullOrderStatus(username).then((dispatchedOrdersStatus) => {
          console.log("Orders Statuses:");
          console.log(dispatchedOrdersStatus);
          setOrderStatuses(dispatchedOrdersStatus);
          console.log("Orders:");
          console.log(orders);
          console.log("dispatchOrders:");
          console.log(dispatchedOrdersStatus);
          const tableData = generateDataTableFromOrders(
            orders,
            updateOrderFunction,
            reviewOrderFunction,
            resendEmailOrderFunction,
            dispatchedOrdersStatus
          );
          setOrderData(tableData);
          setIsLoading(false);
        });
        // pullWarehouseDispatchOrders(username).then((dispatchOrders) => {
        //   setDispatchedOrders(dispatchOrders);
        //   console.log("Orders:");
        //   console.log(orders);
        //   console.log("dispatchOrders:");
        //   console.log(dispatchOrders);
        //   const tableData = generateDataTableFromOrders(
        //     orders,
        //     updateOrderFunction,
        //     reviewOrderFunction,
        //     resendEmailOrderFunction,
        //     dispatchOrders
        //   );
        //   setOrderData(tableData);
        // });
      } catch (DispatchedOrderError) {
        console.log("Orders:");
        console.log(orders);
        const tableData = generateDataTableFromOrders(
          orders,
          updateOrderFunction,
          reviewOrderFunction,
          resendEmailOrderFunction
        );
        setOrderData(tableData);
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    const { username } = accounts[0];
    console.log(username);
    console.log(accounts[0]);
    pullWarehouseDispatchOrders(username).then((dispatchOrders) => {
      setDispatchedOrders(dispatchOrders);
    });
    pullWarehouseOrders(username).then((response) => {
      const orders = response;
      try {
        pullOrderStatus(username).then((dispatchedOrdersStatus) => {
          console.log("Orders Statuses:");
          console.log(dispatchedOrdersStatus);
          setOrderStatuses(dispatchedOrdersStatus);
          console.log("Orders:");
          console.log(orders);
          console.log("dispatchOrders:");
          console.log(dispatchedOrdersStatus);
          const tableData = generateDataTableFromOrders(
            orders,
            updateOrderFunction,
            reviewOrderFunction,
            resendEmailOrderFunction,
            dispatchedOrdersStatus
          );
          setOrderData(tableData);
          setIsLoading(false);
        });
        // pullWarehouseDispatchOrders(username).then((dispatchOrders) => {
        //   setDispatchedOrders(dispatchOrders);
        //   console.log("Orders:");
        //   console.log(orders);
        //   console.log("dispatchOrders:");
        //   console.log(dispatchOrders);
        //   const tableData = generateDataTableFromOrders(
        //     orders,
        //     updateOrderFunction,
        //     reviewOrderFunction,
        //     resendEmailOrderFunction,
        //     dispatchOrders
        //   );
        //   setOrderData(tableData);
        // });
      } catch (DispatchedOrderError) {
        console.log("Orders:");
        console.log(orders);
        const tableData = generateDataTableFromOrders(
          orders,
          updateOrderFunction,
          reviewOrderFunction,
          resendEmailOrderFunction
        );
        setOrderData(tableData);
        setIsLoading(false);
      }
    });
  }, []);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={refreshButtonFunction}>Refresh</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem>
        <Link to="/orders/new-order-warehouse">new order</Link>
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
    </Menu>
  );
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
  if (isReviewingOrder) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox>
          <MDBox display="flex" justifyContent="center" alignItems="flex-start" mb={2}>
            <MDBox>
              <MDButton
                variant="outlined"
                color="dark"
                onClick={() => {
                  setisReviewingOrder(false);
                }}
              >
                <Link to="/orders/order-list-warehouse">Back</Link>
              </MDButton>
              <MDButton
                variant="outlined"
                color="dark"
                onClick={() => {
                  setisReviewingOrder(false);
                  updateOrderFunction(selectedOrderToReview);
                }}
              >
                Edit Order
              </MDButton>
              <MDButton
                variant="outlined"
                color="dark"
                onClick={() => {
                  setisReviewingOrder(false);
                  updateOrderFunction(selectedOrderToReview);
                }}
              >
                Email Order
              </MDButton>
            </MDBox>
          </MDBox>
          <Invoice
            OrderData={selectedOrderToReview.requestPayload}
            po={selectedOrderToReview.PO}
            orderDate={selectedOrderToReview.createdDate}
          />
        </MDBox>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      {OrderStatusAlert}
      <DashboardNavbar />
      <MDBox>
        {isEditingOrder ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {OrderStatusAlert}
              <EditOrder
                OrderToEdit={selectedOrderToEdit}
                onOrderCompletion={() => setisEditingOrder(false)}
                alertFunction={setOrderStatusAlert}
              />
            </Grid>
            <Grid item xs={12}>
              <Footer padding="30px" margin="30px" />
            </Grid>
          </Grid>
        ) : (
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
                    <Link to="/orders/new-order-warehouse">&nbsp;New Order</Link>
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
            <Card>
              {orderData ? (
                <DataTable table={orderData || []} entriesPerPage={false} canSearch />
              ) : (
                <></>
              )}
            </Card>
          </MDBox>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default OrderList;
