/* eslint-disable guard-for-in */
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

import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "layouts/pages/products/view-products/components/DefaultStatisticsCard";
import SelectedCustomerCard from "layouts/pages/products/view-products/components/SelectedCustomerCard";

import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
// import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import EventCalendar from "examples/Calendar";
// import calendarEventsData from "layouts/pages/widgets/data/calendarEventsData";

// import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable";

// Sales dashboard components
import ChannelsChart from "layouts/pages/products/view-products/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/pages/products/view-products/data/defaultLineChartData";

import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";
import PieChart from "examples/Charts/PieChart";

// API & Data Functions
import {
  pullMonthlySalesAnalytics,
  pullWarehouseOrders,
  pullCustomerAddresses,
  pullWarehouseDispatchOrders,
  sendOrderConfirmationEmail,
  pullAllOrders,
  pullReportingProducts,
  pullProductData,
  getLoginCookie,
} from "utils/koapi";
// import generateAnalyticsDataFromOrders from "utils/analyticsapi";
import generateAnalyticsDataFromOrders from "utils/customerAnalyticsApi";
import formatRevenueChartData from "layouts/pages/products/view-products/data/revenueChartData";
// import generateDataTableFromOrders from "layouts/pages/orders-warehouse/view-orders/data/fuelOrderDataTable";
import generateDataTableFromOrders from "layouts/pages/products/view-products/data/warehouseCustomerDataTable";
import formatCustomerRevenueData from "layouts/pages/products/view-products/data/customerRevenueData";
import formatCustomerBreakdownData from "layouts/pages/products/view-products/data/customerBreakdownChartData";
import formatTopProductsData from "layouts/pages/products/view-products/data/topProductsChartData";
import formatAllpackagesCostListChartData from "layouts/pages/products/view-products/data/allPackagesCostListChartData";
import allProductsAndPackagesCostListChartData from "layouts/pages/products/view-products/data/allProductsAndPackagesCostListChartData";

import formatSelectedOrderProductData from "layouts/pages/products/view-products/data/selectedProductChartData";

import formatTopCustomersChartData from "layouts/pages/products/view-products/data/topCustomersChartData";
import formatCalendarEventData from "layouts/pages/products/view-products/data/calendarOrderData";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import EditWarehouseOrder from "layouts/pages/orders-warehouse/edit-order";
import EditFuelOrder from "layouts/pages/orders-fuel/edit-order";

import Invoice from "layouts/pages/orders-warehouse/invoice";
import FuelInvoice from "layouts/pages/orders-fuel/invoice";

import {
  getOrderQuantityDifferences,
  getRevenueDifferences,
  getCustomerCountDifferences,
} from "layouts/pages/products/view-products/data/differenceFormulations";

function Sales() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("Yearly");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("Yearly");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("Yearly");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);
  const [analyticalData, setAnalyticalData] = useState(null);
  const [monthlyRevenueChartData, setmonthlyRevenueChartData] = useState(null);
  const [CustomerBreakdownChartData, setCustomerBreakdownChartData] = useState(null);
  const [TopProductsChartData, setTopProductsChartData] = useState(null);
  const [TopCustomersChartData, setTopCustomersChartData] = useState(null);
  const [OrderQuantityDifferenceObj, setOrderQuantityDifferenceObj] = useState(null);
  const [CustomerCountDifferenceObj, setCustomerCountDifferenceObj] = useState(null);
  const [ProductList, setProductList] = useState(null);
  const [ProductCostList, setProductCostList] = useState(null);
  const [ProductPackagesCostList, setProductPackagesCostList] = useState(null);
  const [SelectedCustomerOrders, SetSelectedCustomerOrders] = useState(null);
  const [CustomerOrderTableData, setCustomerOrderTableData] = useState(null);
  const [AllProductPricesTableData, setAllProductPricesTableData] = useState(null);
  const [ProductSelected, setProductSelected] = useState(null);
  const [calendarEventData, setCalendarEventData] = useState(null);
  const [CalendarAlert, setCalendarAlert] = useState(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState(null);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showAllPrices, setshowAllPrices] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [OrderStatusAlert, setOrderStatusAlert] = useState(null);
  const [dispatchedOrders, setDispatchedOrders] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState(null);
  const [selectedOrderToEdit, setSelectedOrderToEdit] = useState(null);
  const [selectedOrderToReview, setSelectedOrderToReview] = useState(null);
  const [isEditingOrder, setisEditingOrder] = useState(null);
  const [isReviewingOrder, setisReviewingOrder] = useState(null);
  const [isActiveResendEmailAlert, setResendEmailAlert] = useState(null);
  const [emailToSendTo, setEmailToResendSendTo] = useState(null);
  const [orderToEmail, setorderToEmail] = useState(null);
  const [currentUser, setCurrentUser] = useState(false);

  // DefaultStatisticsCard handler for the dropdown action

  const viewSingleProductFunction = (singleProductName) => {
    console.log(singleProductName);
    const customerNameVal = singleProductName;
    console.log("SELECTED PRODUCT");
    console.log(singleProductName);
    const ProductSelectedFilter = singleProductName;
    console.log(ProductSelectedFilter);
    setProductSelected(ProductSelectedFilter);
    if (ProductSelectedFilter) {
      setIsLoading(true);
      setshowAllPrices(false);
      pullReportingProducts()
        .then((products) => {
          const tmpProductCostList = products.ProductCostData;
          const filteredProductCostList = tmpProductCostList.filter((product) => {
            if (product.productKey === ProductSelectedFilter.productKey) {
              return true;
            }
            return false;
          });
          console.log(filteredProductCostList);
          const tmpTopProductsChartData = formatTopProductsData(filteredProductCostList);
          // SetSelectedCustomerOrders(productData.productCostData);
          const revenueTableData = formatCustomerRevenueData(filteredProductCostList);
          setmonthlyRevenueChartData(revenueTableData);
          setTopProductsChartData(tmpTopProductsChartData);
          const filteredAllPackagesProductCostList = tmpProductCostList.filter((product) => {
            if (
              product.Description === ProductSelectedFilter.Description &&
              product.RowNumber === "1"
            ) {
              return true;
            }
            return false;
          });
          const tmpAllPackagesCostList = formatAllpackagesCostListChartData(
            filteredAllPackagesProductCostList
          );
          setProductPackagesCostList(tmpAllPackagesCostList);
          pullProductData(ProductSelectedFilter.Id, ProductSelectedFilter.Description)
            .then((orders) => {
              orders
                .filter((order) => {
                  if (order.productKey === customerNameVal) {
                    return true;
                  }
                  return false;
                })
                .sort((a, b) => {
                  if (a.Order_Entry_Date < b.Order_Entry_Date) {
                    return 1;
                  }
                  return -1;
                });
              const tableData = generateDataTableFromOrders(orders);
              setCustomerOrderTableData(tableData);
              const tmpcustomerBreakdownChartData = formatCustomerBreakdownData(orders);
              setCustomerBreakdownChartData(tmpcustomerBreakdownChartData);
              setIsLoading(false);
            })
            .catch((mehIneedACoffeeThisllwork) => {
              console.log(mehIneedACoffeeThisllwork);
              setIsLoading(false);
            });

          // });
          // const revenueDifferenceLabel = getRevenueDifferences(ProductSelected.orders);
          // setrevenueDifferenceObj(revenueDifferenceLabel);
          setSelectedOrderToReview(null);
          setSelectedOrderProducts(null);
        })
        .catch((PullReportingProductsError) => {
          console.log(PullReportingProductsError);
          setIsLoading(false);
        });
    }
  };
  const handleSelectedProduct = (customerSelect) => {
    console.log(customerSelect);
    const customerNameVal = customerSelect.target.value;
    console.log("SELECTED PRODUCT");
    console.log(customerNameVal);
    const ProductSelectedFilter = ProductList.filter(
      (value) => value.productKey === customerNameVal
    )[0];
    console.log(ProductSelectedFilter);
    if (ProductSelectedFilter.productKey !== ProductSelected.productKey) {
      setProductSelected(ProductSelectedFilter);
      // const tmpcustomerBreakdownChartData = formatCustomerBreakdownData(
      //   ProductSelectedFilter.products
      // );
      // setCustomerBreakdownChartData(tmpcustomerBreakdownChartData);
      // pullProductData(ProductSelectedFilter).then((productData) => {
      const filteredProductCostList = ProductCostList.filter((product) => {
        if (product.productKey === ProductSelectedFilter.productKey) {
          return true;
        }
        return false;
      });
      console.log(filteredProductCostList);
      const tmpTopProductsChartData = formatTopProductsData(filteredProductCostList);
      // SetSelectedCustomerOrders(productData.productCostData);
      const revenueTableData = formatCustomerRevenueData(filteredProductCostList);
      setmonthlyRevenueChartData(revenueTableData);
      setTopProductsChartData(tmpTopProductsChartData);
      const filteredAllPackagesProductCostList = ProductCostList.filter((product) => {
        if (
          product.Description === ProductSelectedFilter.Description &&
          product.RowNumber === "1"
        ) {
          return true;
        }
        return false;
      });
      const tmpAllPackagesCostList = formatAllpackagesCostListChartData(
        filteredAllPackagesProductCostList
      );
      setProductPackagesCostList(tmpAllPackagesCostList);
      setIsLoading(true);
      pullProductData(ProductSelectedFilter.Id, ProductSelectedFilter.Description)
        .then((orders) => {
          orders
            .filter((order) => {
              if (order.productKey === customerNameVal) {
                return true;
              }
              return false;
            })
            .sort((a, b) => {
              if (a.Order_Entry_Date < b.Order_Entry_Date) {
                return 1;
              }
              return -1;
            });
          const tableData = generateDataTableFromOrders(orders);
          setCustomerOrderTableData(tableData);
          const tmpcustomerBreakdownChartData = formatCustomerBreakdownData(orders);
          setCustomerBreakdownChartData(tmpcustomerBreakdownChartData);
          setIsLoading(false);
        })
        .catch((mehIneedACoffeeThisllwork) => {
          console.log(mehIneedACoffeeThisllwork);
          setIsLoading(false);
        });

      // });
      // const revenueDifferenceLabel = getRevenueDifferences(ProductSelected.orders);
      // setrevenueDifferenceObj(revenueDifferenceLabel);
      setSelectedOrderToReview(null);
      setSelectedOrderProducts(null);
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLoginCookie().then((accountData) => {
        console.log(accountData.account);
        if (accountData && accountData.account.email) {
          setCurrentUser(accountData);
          setIsLoading(true);
          pullReportingProducts(accountData.account.email).then((products) => {
            console.log(products);
            // const analyticsData = generateAnalyticsDataFromOrders(products);
            // console.log(analyticsData);
            setProductCostList(products.ProductCostData);
            setAnalyticalData(products.products);
            // console.log(analyticsData);
            setProductList(products.products);
            const tmpProductPrices = products.ProductCostData.filter((order) => {
              if (order.RowNumber === "1") {
                return true;
              }
              return false;
            }).sort((a, b) => {
              if (a.Order_Entry_Date < b.Order_Entry_Date) {
                return 1;
              }
              return -1;
            });
            const tmpProductPricesTableData = allProductsAndPackagesCostListChartData(
              tmpProductPrices,
              viewSingleProductFunction
            );
            setAllProductPricesTableData(tmpProductPricesTableData);
            setIsLoading(false);
          });
        }
      });
    }
    return () => {
      isMounted = false;
    };
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
  if (showAllPrices) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        {OrderStatusAlert}
        <MDBox py={3}>
          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MDBox>
                  <MDBox my={3}>
                    <Card>
                      <MDBox pt={3} px={3} center>
                        <MDTypography variant="h5" fontWeight="medium">
                          All Costs
                        </MDTypography>
                      </MDBox>
                      {AllProductPricesTableData ? (
                        <DataTable
                          title="Order Search"
                          table={AllProductPricesTableData || []}
                          entriesPerPage={5}
                          canSearch
                        />
                      ) : (
                        <></>
                      )}
                    </Card>
                  </MDBox>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {OrderStatusAlert}
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} lg={6}>
              <MDButton
                variant="outlined"
                color="dark"
                onClick={() => {
                  setshowAllPrices(true);
                }}
              >
                <Link to="/products/view-products">Back</Link>
              </MDButton>
            </Grid>
            <br />
            {/* <Grid item xs={6} sm={6} lg={6}>
              <MDButton
                variant="outlined"
                color="dark"
                style={{ float: "right" }}
                onClick={() => {
                  setshowAllPrices(true);
                }}
              >
                <Link to="/products/view-products">Refresh</Link>
              </MDButton>
            </Grid> */}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <></>
              {/* {revenueDifferenceObj ? (
                <DefaultStatisticsCard
                  title="sales"
                  percentage={{
                    color: revenueDifferenceObj.color,
                    value: revenueDifferenceObj.label,
                    label: `since last month ($${revenueDifferenceObj.lastYearsRevenue})`,
                  }}
                  dropdown={{
                    action: openSalesDropdown,
                    menu: renderMenu(salesDropdown, closeSalesDropdown),
                    value: salesDropdownValue,
                  }}
                />
              ) : (
                <></>
              )} */}
            </Grid>
            <Grid item xs={12} sm={4}>
              {ProductList ? (
                <SelectedCustomerCard
                  title="product selected"
                  ProductList={ProductList}
                  dropdown={{
                    action: handleSelectedProduct,
                    value: ProductSelected ? ProductSelected.productKey : "",
                  }}
                />
              ) : (
                <MDBox display="flex" justifyContent="center" alignItems="flex-start" mb={2}>
                  <CircularProgress center />
                </MDBox>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <></>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  pt={2}
                  px={2}
                >
                  <MDTypography variant="h6">Recent Orders</MDTypography>
                  <Tooltip title="See your top 5 Customers" placement="bottom" arrow>
                    <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
                      <Icon>priority_high</Icon>
                    </MDButton>
                  </Tooltip>
                </MDBox>
                <MDBox mt={3}>
                  {CustomerBreakdownChartData ? (
                    <Grid container alignItems="center">
                      <Grid item lg={7} md={12} xs={12}>
                        {CustomerBreakdownChartData.labels.map((label, index) => (
                          <MDBox mb={2}>
                            <MDBadgeDot
                              color={CustomerBreakdownChartData.datasets.backgroundColors[index]}
                              size="md"
                              badgeContent={label}
                              variant="gradient"
                            />
                          </MDBox>
                        ))}
                      </Grid>
                      <Grid item lg={5} md={12} xs={12}>
                        <MDBox pr={1}>
                          <PieChart chart={CustomerBreakdownChartData} height="13.5rem" />
                        </MDBox>
                      </Grid>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </MDBox>
              </Card>{" "}
            </Grid> */}
            <Grid item xs={12} lg={6}>
              <Card>
                <MDBox pt={3} px={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Cost for all Packages
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="medium" color="success">
                    {ProductSelected && ProductSelected.Description
                      ? ProductSelected.Description
                      : ""}
                  </MDTypography>
                </MDBox>
                {analyticalData && ProductPackagesCostList ? (
                  <MDBox py={1}>
                    <DataTable
                      table={ProductPackagesCostList}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                  </MDBox>
                ) : (
                  <></>
                )}
              </Card>
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <HorizontalBarChart title="Sales by age" chart={horizontalBarChartData} />
            </Grid> */}
            <Grid item xs={12} lg={6}>
              <Card>
                <MDBox pt={3} px={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Last few times we bought
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="medium" color="success">
                    {ProductSelected && ProductSelected.Description
                      ? ProductSelected.Description
                      : ""}
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="medium" color="success">
                    {ProductSelected && ProductSelected.ProdPkg_Pkg_Code
                      ? ProductSelected.ProdPkg_Pkg_Code
                      : ""}
                  </MDTypography>
                </MDBox>
                {analyticalData && TopProductsChartData ? (
                  <MDBox py={1}>
                    <DataTable
                      table={TopProductsChartData}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                  </MDBox>
                ) : (
                  <></>
                )}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          {/* <Grid container spacing={3}>
            <Grid item xs={12}>
              {monthlyRevenueChartData ? (
                <DefaultLineChart
                  title="Sales by Month"
                  description={
                    <MDBox display="flex" justifyContent="space-between">
                      <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                        <Tooltip
                          title="See amount sold for the past 12 months"
                          placement="left"
                          arrow
                        >
                          <MDButton
                            variant="outlined"
                            color="secondary"
                            size="small"
                            circular
                            iconOnly
                          >
                            <Icon>priority_high</Icon>
                          </MDButton>
                        </Tooltip>
                      </MDBox>
                    </MDBox>
                  }
                  chart={monthlyRevenueChartData}
                />
              ) : (
                <></>
              )}
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs={12} lg={4} sm={4}>
              <MDBox>
                <MDBox my={3}>
                  <Card>
                    {CustomerOrderTableData && selectedOrderForReview && selectedOrderProducts ? (
                      <>
                        <MDBox pt={3} px={3}>
                          <MDTypography variant="h6" fontWeight="medium">
                            Selected Order Products
                          </MDTypography>
                        </MDBox>
                        <MDBox py={1}>
                          <DataTable
                            table={selectedOrderProducts}
                            entriesPerPage={false}
                            showTotalEntries={false}
                            isSorted={false}
                            noEndBorder
                          />
                        </MDBox>
                      </>
                    ) : (
                      <></>
                    )}
                  </Card>
                </MDBox>
              </MDBox>
            </Grid>
            {selectedOrderProducts && ProductSelected && ProductSelected.Description ? (
              <Grid item xs={12} sm={8} lg={8}>
                <MDBox>
                  <MDBox my={3}>
                    <Card>
                      <MDBox pt={3} px={3} center>
                        <MDTypography variant="h5" fontWeight="medium">
                          Past Order Search
                        </MDTypography>
                      </MDBox>
                      {CustomerOrderTableData ? (
                        <DataTable
                          title="Order Search"
                          table={CustomerOrderTableData || []}
                          entriesPerPage={5}
                          canSearch
                        />
                      ) : (
                        <></>
                      )}
                    </Card>
                  </MDBox>
                </MDBox>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <MDBox>
                  <MDBox my={3}>
                    <Card>
                      <MDBox pt={3} px={3} center>
                        <MDTypography variant="h5" fontWeight="medium">
                          All Orders for{" "}
                          {ProductSelected && ProductSelected.Description
                            ? ProductSelected.Description
                            : ""}
                        </MDTypography>
                      </MDBox>
                      {CustomerOrderTableData ? (
                        <DataTable
                          title="Order Search"
                          table={CustomerOrderTableData || []}
                          entriesPerPage={5}
                          canSearch
                        />
                      ) : (
                        <></>
                      )}
                    </Card>
                  </MDBox>
                </MDBox>
              </Grid>
            )}
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          {/* <Grid item xs={12} lg={12}>
            {CalendarAlert}
            {useMemo(
              () =>
                calendarEventData ? (
                  <EventCalendar
                    header={{ title: "Order Deliveries" }}
                    initialView="dayGridMonth"
                    initialDate={new Date(Date.now())}
                    events={calendarEventData}
                    selectable
                    editable
                    eventClick={(info) => {
                      console.log(info.event);
                      const eventTitle = info.event.title;
                      const eventStartDate = info.event.start;
                      setCalendarAlert(
                        <MDAlert color="dark">
                          Delivery for {eventTitle} @ {new Date(eventStartDate).toDateString()}
                          <MDAlertCloseIcon
                            onClick={() => {
                              setCalendarAlert(null);
                            }}
                          >
                            &times;
                          </MDAlertCloseIcon>
                        </MDAlert>
                      );
                      // eslint-disable-next-line no-alert
                    }}
                  />
                ) : (
                  <></>
                ),
              [calendarEventData]
            )}
          </Grid> */}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Sales;
