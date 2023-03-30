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
import { useEffect } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/InvoiceDisplayTable";

function ItemsCell({ products }) {
  useEffect(() => {
    console.log("PRODUCTS HERE");
    console.log(products);
  }, []);
  return (
    <MDBox p={3}>
      <MDBox width="100%" overflow="auto">
        {products && products.length > 0 ? (
          <DataTable
            usePagination={false}
            table={{
              columns: [
                { Header: "Description", accessor: "item" },
                { Header: "Package", accessor: "itemPackage" },
                { Header: "Ordered", accessor: "originalQuantity" },
                { Header: "Delivered", accessor: "updatedQuantity" },
                { Header: "stickings", accessor: "stickings" },
              ],
              rows: products.map((item) => {
                const orderItem = item;
                orderItem.stickings = `Stick 1: ${orderItem.stickFirst} | Stick 2:  ${orderItem.stickFirst}`;
                return orderItem;
              }),
            }}
          />
        ) : (
          <></>
        )}
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the ItemsCell
ItemsCell.propTypes = {
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ItemsCell;
