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
import IdCell from "layouts/pages/orders-dispatch/view-orders/components/IdCell";
import DefaultCell from "layouts/pages/orders-dispatch/view-orders/components/DefaultCell";
// import OrderStatusCell from "layouts/pages/orders-dispatch/view-orders/components/OrderStatusCell";
import MoneyCell from "layouts/pages/orders-dispatch/view-orders/components/MoneyCell";
import ActionCell from "layouts/pages/orders-dispatch/view-orders/components/ActionCell";
import ItemsCell from "layouts/pages/orders-dispatch/view-orders/components/ItemsCell";
// import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
// import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const generateDataTableFromOrders = (
  orders,
  updateFunction,
  reviewOrderFunction,
  isCheckedFunction
) => {
  orders.sort((a, b) => {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    return -1;
  });
  const FormattedOrders = orders.map((order) => {
    // const AlternativePO = `DJ0${order.PO}${new Date(order.createdDate)
    //   .getFullYear()
    //   .toString()
    //   .substr(-2)}`;
    // const DispatchedOrder = dispatchOrders
    //   ? dispatchOrders.filter(
    //       (dispatchedOrder) =>
    //         dispatchedOrder.PO === order.PO || dispatchedOrder.PO === AlternativePO
    //     )
    //   : [];
    // console.log("DISPATCH ORDERS SENT TO WH TABLE");
    // console.log(dispatchOrders);
    // if (DispatchedOrder[0]) {
    //   // const OrderStatus = DispatchedOrder[0].status
    //   //   ? `${DispatchedOrder[0].status}`
    //   //   : "Order Awaiting Status Update";
    //   const tmpObj = {
    //     PO: order.PO,
    //     createdDate: order.createdDate,
    //     customer: order.requestPayload.destination.Customer,
    //     total: order.TotalAmount || 0,
    //     // orderStatus: OrderStatus,
    //     // eslint-disable-next-line no-underscore-dangle
    //     editButton: order._id,
    //   };
    //   return tmpObj;
    // }
    const tmpObj = {
      PO: order.PO,
      createdDate: order.createdDate,
      customer: order.requestPayload.destination.Customer,
      total: order.TotalAmount || 0,
      products: order.requestPayload.items.items,
      // orderStatus: "Awaiting Status Update",
      // eslint-disable-next-line no-underscore-dangle
      editButton: order,
    };
    return tmpObj;
  });
  const globalUpdateFunction = updateFunction;
  const globalReviewFunction = reviewOrderFunction;
  const globalIsCheckedFunction = isCheckedFunction;
  console.log(FormattedOrders);
  const ReturnedTableData = {
    columns: [
      {
        Header: "edit",
        accessor: "editButton",
        Cell: ({ value }) => (
          <IdCell order={value} isCheckedFunction={globalIsCheckedFunction} ordersList={orders} />
          // <ActionCell
          //   value={value}
          //   updateFunction={globalUpdateFunction}
          //   emailFunction={globalEmailFunction}
          //   reviewFunction={globalReviewFunction}
          //   ordersList={orders}
          // />
        ),
      },
      // {
      //   Header: "PO",
      //   accessor: "PO",
      //   Cell: ({ value }) => <DefaultCell value={value} />,
      // },

      {
        Header: "customer",
        accessor: "customer",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },

      {
        Header: "Products",
        accessor: "products",
        Cell: ({ value }) => <ItemsCell products={value} />,
      },
      {
        Header: "createdDate",
        accessor: "createdDate",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "total",
        accessor: "total",
        Cell: ({ value }) => <MoneyCell value={Number(value).toFixed(2)} />,
      },
    ],

    rows: FormattedOrders,
  };

  return ReturnedTableData;
};

export default generateDataTableFromOrders;
