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

/* eslint-disable react/prop-types */
// ProductsList page components
// import IdCell from "layouts/pages/orders-dispatch/view-completed/components/IdCell";
import DefaultCell from "layouts/pages/orders-dispatch/view-completed/components/DefaultCell";
// import OrderStatusCell from "layouts/pages/orders-dispatch/view-completed/components/OrderStatusCell";
import SigCell from "layouts/pages/orders-dispatch/view-completed/components/SigCell";
import ItemsCell from "layouts/pages/orders-dispatch/view-completed/components/ItemsCell";
import ActionCell from "layouts/pages/orders-dispatch/view-completed/components/ActionCell";
// import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
// import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const generateDataTableFromOrders = (
  orders,
  updateFunction,
  reviewOrderFunction,
  emailFunction
) => {
  orders.sort((a, b) => {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    return -1;
  });
  const FormattedOrders = orders.map((order) => {
    const formattedString = order.signature.includes("image/png")
      ? order.signature
      : `data:image/png;base64,${order.signature}`;
    const formattedOrderChanges =
      typeof order.changes === "string" ? JSON.parse(order.changes) : order.changes;
    const tmpObj = {
      PO: order.order || "",
      type: order.type || "",
      driver: order.driverInfo.name || "",
      truck: order.driverInfo.AssignedTruck || "",
      customer: order.destinationInfo.Customer || "",
      changes: formattedOrderChanges || [],
      signature: formattedString || "",
      capturedAt: order.coordinates.capturedAt || "",
      // orderStatus: "Awaiting Status Update",
      // eslint-disable-next-line no-underscore-dangle
      editButton: order._id,
    };
    return tmpObj;
  });
  const globalUpdateFunction = updateFunction;
  const globalEmailFunction = emailFunction;
  const globalReviewFunction = reviewOrderFunction;
  console.log(FormattedOrders);
  const ReturnedTableData = {
    columns: [
      // {
      //   Header: "edit",
      //   accessor: "editButton",
      //   Cell: ({ value }) => (
      //     <ActionCell
      //       value={value}
      //       updateFunction={globalUpdateFunction}
      //       emailFunction={globalEmailFunction}
      //       reviewFunction={globalReviewFunction}
      //       ordersList={orders}
      //     />
      //   ),
      // },
      {
        Header: "PO",
        accessor: "PO",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },

      {
        Header: "Customer",
        accessor: "customer",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "Driver",
        accessor: "driver",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      // {
      //   Header: "type",
      //   accessor: "type",
      //   Cell: ({ value }) => <DefaultCell value={value} />,
      // },
      {
        Header: "signature",
        accessor: "signature",
        Cell: ({ value }) => <SigCell image={value} name="Signature" color="transparent" />,
      },
      {
        Header: "Received On",
        accessor: "capturedAt",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "Changes",
        accessor: "changes",
        Cell: ({ value }) => <ItemsCell products={value} />,
      },
    ],

    rows: FormattedOrders,
  };

  return ReturnedTableData;
};

export default generateDataTableFromOrders;
