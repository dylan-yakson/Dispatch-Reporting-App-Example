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
// {
//   labels: ["Facebook", "Direct", "Organic", "Referral"],
//   datasets: {
//     label: "Projects",
//     backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
//     data: [15, 20, 12, 60],
//   },
// };

const formatCustomerBreakdownData = (customerProducts) => {
  const labels = [];
  const customerOrderTotalData = [];
  const data = customerProducts
    .map((product) => {
      const tmpProduct = product;
      tmpProduct.totalAmountSpent = product.Quantity * product.Price;
      return tmpProduct;
    })
    .sort((a, b) => {
      if (a.totalAmountSpent < b.totalAmountSpent) {
        return 1;
      }
      return -1;
    });

  // const data = analyticsData.customerData;
  // data.sort((a, b) => a.TotalAmountPurchased < b.TotalAmountPurchased);
  for (const customerDataIndex in data) {
    const product = data[customerDataIndex];
    console.log(product);
    if (product.itemDesc && product.itemDesc.length > 0) {
      labels.push(product.Salesman.slice(0, 25));
      customerOrderTotalData.push(product.Quantity * product.Price);
    }
  }

  const tmpResponseObj = {
    labels,
    datasets: {
      label: "Projects",
      backgroundColors: ["info", "error", "dark", "secondary", "primary", "green", "yellow"],
      data: customerOrderTotalData,
      entriesPerPage: "5",
    },
  };
  return tmpResponseObj;
};

export default formatCustomerBreakdownData;
