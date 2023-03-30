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
// import ActionCell from "layouts/pages/products/view-products/components/ActionCell";
// import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";
// import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";

const generateDataTableFromOrders = (
  orders
  // updateFunction,
  // reviewOrderFunction,
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
    let orderTotal = 0;
    try {
      orderTotal = Number(order.Price) * Number(order.Quantity);
    } catch (error) {
      console.log("error getting order total");
    }
    const tmpObj = {
      PO: order.Ord_No,
      Package: order.Package,
      Product: order.Prod_Description,
      createdDate: new Date(order.Order_Entry_Date).toDateString(),
      customer: order.Cust_Description,
      price: order.Price,
      total: orderTotal,
      quantity: order.Quantity,
      salesman: order.Salesman || "",
      // orderStatus: "Awaiting Status Update",
      // eslint-disable-next-line no-underscore-dangle
      // editButton: order.PO,
    };
    return tmpObj;
  });
  // const globalUpdateFunction = updateFunction;
  // const globalEmailFunction = emailFunction;
  // const globalReviewFunction = reviewOrderFunction;
  console.log(FormattedOrders);
  const ReturnedTableData = {
    columns: [
      // { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
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
        Header: "customer",
        accessor: "customer",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "salesman",
        accessor: "salesman",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "Package",
        accessor: "Package",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "quantity",
        accessor: "quantity",
        Cell: ({ value }) => <DefaultCell value={value} />,
      },
      {
        Header: "price",
        accessor: "price",
        Cell: ({ value }) => <MoneyCell value={Number(value).toFixed(2)} />,
      },
      {
        Header: "total Value",
        accessor: "total",
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

export default generateDataTableFromOrders;
