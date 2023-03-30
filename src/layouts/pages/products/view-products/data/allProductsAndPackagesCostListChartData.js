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
// import ProductCell from "layouts/pages/products/view-products/components/ProductCell";
// import RefundsCell from "layouts/pages/products/view-products/components/RefundsCell";
import DefaultCell from "layouts/pages/products/view-products/components/DefaultCell";
// Images
// import nikeV22 from "assets/images/ecommerce/blue-shoe.jpeg";
// import businessKit from "assets/images/ecommerce/black-mug.jpeg";
// import blackChair from "assets/images/ecommerce/black-chair.jpeg";
// import wirelessCharger from "assets/images/ecommerce/bang-sound.jpeg";
// import tripKit from "assets/images/ecommerce/photo-tools.jpeg";
import ActionCell from "layouts/pages/products/view-products/components/ActionCell";
import MoneyCell from "layouts/pages/products/view-products/components/MoneyCell";

const allProductsAndPackagesCostListChartData = (productSalesData, viewSingleProductFunction) => {
  const globalviewButtonFunction = viewSingleProductFunction;
  const tmpResponseObj = {
    columns: [
      // { Header: "id", accessor: "id", Cell: ({ value }) => <IdCell id={value} /> },
      {
        Header: "edit",
        accessor: "productKey",
        Cell: ({ value }) => (
          <ActionCell
            value={value}
            viewButtonFunction={globalviewButtonFunction}
            productList={productSalesData}
          />
        ),
      },
      {
        Header: "Product",
        accessor: "product",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },

      {
        Header: "Package",
        accessor: "ProdPkg_Pkg_Code",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },
      {
        Header: "Vendor",
        accessor: "vendor",
        Cell: ({ value }) => <DefaultCell value={value}>{value}</DefaultCell>,
      },
      {
        Header: "Cost",
        accessor: "cost",
        Cell: ({ value }) => (
          <MoneyCell value={Number(value).toFixed(2)}>{Number(value).toFixed(2)}</MoneyCell>
        ),
      },
      {
        Header: "Quantity Purchased",
        accessor: "quantity",
        Cell: ({ value }) => (
          <MoneyCell value={Number(value).toFixed(2)}>{Number(value).toFixed(2)}</MoneyCell>
        ),
      },
      {
        Header: "Date Purchased",
        accessor: "Formatted_Date_last_purchased",
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
    if (a.datePurchased < b.datePurchased) {
      return 1;
    }
    return -1;
  });
  for (const orderIndex in productSalesData) {
    const currentProduct = productSalesData[orderIndex];
    console.log(currentProduct);
    const tmpRow = {
      product: currentProduct.Description,
      ProdPkg_Pkg_Code: currentProduct.ProdPkg_Pkg_Code,
      cost: currentProduct.Cost,
      productKey: currentProduct.productKey,
      Formatted_Date_last_purchased: currentProduct.Formatted_Date_last_purchased,
      quantity: currentProduct.WhPrchDtl_Order_Qty,
      vendor: currentProduct.Vend_Description,
    };
    tmpResponseObj.rows.push(tmpRow);
  }
  return tmpResponseObj;
};

export default allProductsAndPackagesCostListChartData;
