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
// import IdCell from "layouts/pages/orders-warehouse/view-orders/components/IdCell";
import DefaultCell from "layouts/pages/orders-warehouse/view-orders/components/DefaultCell";
// import OrderStatusCell from "layouts/pages/orders-warehouse/view-orders/components/OrderStatusCell";
import MoneyCell from "layouts/pages/orders-warehouse/view-orders/components/MoneyCell";
// import OrderItemCell from "layouts/pages/salesman/view-sales/components/orderItemCell";
import ActionCell from "layouts/pages/salesman/view-sales/components/salesOrderCell";
// import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
// import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const generateDataTableFromSalesOrders = (
  orders,
  // updateFunction,
  reviewOrderFunction
  // emailFunction
) => {
  orders.sort((a, b) => {
    if (a.Order_Entry_Date < b.Order_Entry_Date) {
      return 1;
    }
    return -1;
  });
  console.log("=============== LOOK HERE FOOL ===================");
  console.log(orders);
  const FormattedOrders = orders.map((order) => {
    const tmpObj = {
      PO: order.PO,
      customer: order.requestPayload.destination.Customer,
      items: order.requestPayload.items.items,
      createdDate: new Date(order.createdDate).toDateString(),
      totalAmount: order.TotalAmount,
      // orderStatus: "Awaiting Status Update",
      // eslint-disable-next-line no-underscore-dangle
      viewButton: order.PO,
    };
    return tmpObj;
  });
  // const globalUpdateFunction = updateFunction;
  // const globalEmailFunction = emailFunction;
  const globalReviewFunction = reviewOrderFunction;
  console.log(FormattedOrders);
  const ReturnedTableData = {
    columns: [
      // { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
      {
        Header: "View",
        accessor: "viewButton",
        Cell: ({ value }) => (
          <ActionCell value={value} viewButtonFunction={globalReviewFunction} ordersList={orders} />
        ),
      },
      {
        Header: "PO",
        accessor: "PO",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },

      {
        Header: "customer",
        accessor: "customer",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      // {
      //   Header: "Items",
      //   accessor: "items",
      //   Cell: ({ value }) => <OrderItemCell value={value} />,
      // },
      {
        Header: "total Value",
        accessor: "totalAmount",
        Cell: ({ value }) => <MoneyCell value={Number(value).toFixed(2)} />,
      },
      {
        Header: "created Date",
        accessor: "createdDate",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      // {
      //   Header: "product",
      //   accessor: "product",
      //   Cell: ({ value }) => {
      //     const [name, data] = value;

      //     return (
      //       <DefaultCell
      //         value={typeof value === "string" ? value : name}
      //         suffix={data.suffix || false}
      //       />
      //     );
      //   },
      // },
    ],

    rows: FormattedOrders,
    entitiesPerPage: 5,
  };

  return ReturnedTableData;
};

export default generateDataTableFromSalesOrders;
