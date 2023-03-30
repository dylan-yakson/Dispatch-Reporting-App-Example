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

import checkout from "layouts/pages/drivers/new-driver/schemas/form";

const {
  formField: {
    // Sales
    driverName,
    driverEmail,
    driverAssignedTruck,
  },
} = checkout;

export default {
  [driverName.name]: "",
  [driverEmail.name]: "",
  [driverAssignedTruck.name]: "",
};
