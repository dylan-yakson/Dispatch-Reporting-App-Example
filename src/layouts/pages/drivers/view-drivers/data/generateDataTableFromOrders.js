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

/* eslint-disable react/prop-types */
// ProductsList page components
// import IdCell from "layouts/pages/drivers/view-drivers/components/IdCell";
import DefaultCell from "layouts/pages/drivers/view-drivers/components/DefaultCell";
// import OrderStatusCell from "layouts/pages/drivers/view-drivers/components/OrderStatusCell";
// import MoneyCell from "layouts/pages/drivers/view-drivers/components/MoneyCell";
import ActionCell from "layouts/pages/drivers/view-drivers/components/ActionCell";
// import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
// import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const generateDataTableFromOrders = (
  trucks,
  updateFunction,
  reviewOrderFunction,
  emailFunction
) => {
  trucks.sort((a, b) => {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    return -1;
  });
  const FormattedOrders = trucks.map((order) => {
    const tmpObj = {
      name: order.name,
      email: order.email,
      AssignedTruck: order.AssignedTruck,
    };
    return tmpObj;
  });
  const globalUpdateFunction = updateFunction;
  const globalEmailFunction = emailFunction;
  const globalReviewFunction = reviewOrderFunction;
  console.log(FormattedOrders);
  const ReturnedTableData = {
    columns: [
      {
        Header: "edit",
        accessor: "editButton",
        Cell: ({ value }) => (
          <ActionCell
            value={value}
            updateFunction={globalUpdateFunction}
            emailFunction={globalEmailFunction}
            reviewFunction={globalReviewFunction}
            truckList={trucks}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "Assigned Truck",
        accessor: "AssignedTruck",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      // {
      //   Header: "id",
      //   accessor: "vehicle_ID",
      //   Cell: ({ value }) => <DefaultCell value={value} />,
      // },
      // {
      //   Header: "Vehicle Key",
      //   accessor: "vehicle_Key",
      //   Cell: ({ value }) => <DefaultCell value={value} />,
      // },
    ],

    rows: FormattedOrders,
  };

  return ReturnedTableData;
};

export default generateDataTableFromOrders;
