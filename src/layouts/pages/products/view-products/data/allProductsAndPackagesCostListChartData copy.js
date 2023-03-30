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
import ProductCell from "layouts/pages/products/view-products/components/ProductCell";
// import RefundsCell from "layouts/pages/products/view-products/components/RefundsCell";
import DefaultCell from "layouts/pages/products/view-products/components/DefaultCell";
// Images
import nikeV22 from "assets/images/ecommerce/blue-shoe.jpeg";
// import businessKit from "assets/images/ecommerce/black-mug.jpeg";
// import blackChair from "assets/images/ecommerce/black-chair.jpeg";
// import wirelessCharger from "assets/images/ecommerce/bang-sound.jpeg";
// import tripKit from "assets/images/ecommerce/photo-tools.jpeg";
import ActionCell from "layouts/pages/products/view-products/components/ActionCell";

const allProductsAndPackagesCostListChartData = (productSalesData, viewSingleProductFunction) => {
  const globalviewButtonFunction = viewSingleProductFunction;
  const tmpResponseObj = {
    columns: [
      {
        Header: "edit",
        accessor: "productKey",
      },
      { Header: "Product", accessor: "product" },
      { Header: "Package", accessor: "ProdPkg_Pkg_Code" },
      { Header: "Vendor", accessor: "vendor", align: "center" },
      { Header: "Cost", accessor: "cost", align: "center" },
      { Header: "Quantity Purchased", accessor: "quantity", align: "center" },
      { Header: "Date Purchased", accessor: "Formatted_Date_last_purchased" },
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
  const top6Products = productSalesData.slice(0, 7);
  for (const orderIndex in top6Products) {
    const currentProduct = top6Products[orderIndex];

    const tmpRow = {
      product: (
        <ProductCell
          value={currentProduct.Description}
          image={nikeV22}
          name={currentProduct.Description}
          orders={currentProduct.orderCount}
        />
      ),
      ProdPkg_Pkg_Code: (
        <DefaultCell value={currentProduct.ProdPkg_Pkg_Code}>
          {currentProduct.ProdPkg_Pkg_Code}
        </DefaultCell>
      ),
      cost: <DefaultCell value={currentProduct.Cost}>${currentProduct.Cost}</DefaultCell>,
      productKey: (
        <ActionCell
          value={currentProduct.productKey}
          viewButtonFunction={globalviewButtonFunction}
          ordersList={productSalesData}
        />
      ),
      Formatted_Date_last_purchased: (
        <DefaultCell value={currentProduct.Formatted_Date_last_purchased}>
          {currentProduct.Formatted_Date_last_purchased}
        </DefaultCell>
      ),
      quantity: (
        <DefaultCell value={currentProduct.WhPrchDtl_Order_Qty}>
          {currentProduct.WhPrchDtl_Order_Qty}
        </DefaultCell>
      ),
      vendor: (
        <DefaultCell value={currentProduct.Vend_Description}>
          {currentProduct.Vend_Description}
        </DefaultCell>
      ),
      // TotalAmountPurchased: (
      //   <DefaultCell>${Number(currentProduct.TotalAmountPurchased).toFixed(2)}</DefaultCell>
      // ),
    };
    tmpResponseObj.rows.push(tmpRow);
  }
  return tmpResponseObj;
};

export default allProductsAndPackagesCostListChartData;
