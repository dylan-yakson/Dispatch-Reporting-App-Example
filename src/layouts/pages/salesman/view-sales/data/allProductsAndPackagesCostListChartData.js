/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
// import ProductCell from "layouts/pages/salesman/view-sales/components/ProductCell";
// import RefundsCell from "layouts/pages/salesman/view-sales/components/RefundsCell";
import DefaultCell from "layouts/pages/salesman/view-sales/components/DefaultCell";
// Images
// import nikeV22 from "assets/images/ecommerce/blue-shoe.jpeg";
// import businessKit from "assets/images/ecommerce/black-mug.jpeg";
// import blackChair from "assets/images/ecommerce/black-chair.jpeg";
// import wirelessCharger from "assets/images/ecommerce/bang-sound.jpeg";
// import tripKit from "assets/images/ecommerce/photo-tools.jpeg";
import ActionCell from "layouts/pages/salesman/view-sales/components/ActionCell";
// import MoneyCell from "layouts/pages/salesman/view-sales/components/MoneyCell";

const formatAllSalesChartData = (productSalesData, viewSingleProductFunction) => {
  const globalviewButtonFunction = viewSingleProductFunction;
  const tmpResponseObj = {
    columns: [
      // { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
      {
        Header: "edit",
        accessor: "SalesPerson_Key",
        Cell: ({ value }) => (
          <ActionCell
            value={value}
            viewButtonFunction={globalviewButtonFunction}
            productList={productSalesData}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "SalesPerson_Name",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },

      {
        Header: "Email",
        accessor: "SalesPerson_Email",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },
      {
        Header: "Phone",
        accessor: "SalesPerson_Phone_1",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },
    ],
    rows: [
      // {
      //   product: <ProductCell image={nikeV22} name="Nike v22 Running" orders={8.232} />,
      //   value: <DefaultCell>$130.992</DefaultCell>,
      //   adsSpent: <DefaultCell>$9.500</DefaultCell>,
      //   refunds: <RefundsCell value={13} icon={{ color: "success", name: "keyboard_arrow_up" }} />,
      // },
    ],
  };

  productSalesData.sort((a, b) => {
    if (a.SalesPerson_Name < b.SalesPerson_Name) {
      return 1;
    }
    return -1;
  });
  for (const orderIndex in productSalesData) {
    const currentProduct = productSalesData[orderIndex];
    console.log(currentProduct);
    const tmpRow = {
      SalesPerson_Name: currentProduct.SalesPerson_Name,
      SalesPerson_Phone_1: currentProduct.SalesPerson_Phone_1,
      SalesPerson_Email: currentProduct.SalesPerson_Email,
      SalesPerson_Key: currentProduct.SalesPerson_Key,
    };
    tmpResponseObj.rows.push(tmpRow);
  }
  return tmpResponseObj;
};

export default formatAllSalesChartData;
