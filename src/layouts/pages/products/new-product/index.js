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

import { useState, useEffect } from "react";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// NewUser page components
// import UserInfo from "layouts/pages/products/new-product/components/UserInfo";
import CustomerInfo from "layouts/pages/products/new-product/components/Customers";
import CustomerLocationInfo from "layouts/pages/products/new-product/components/CustomerLocation";
import OrderInfo from "layouts/pages/products/new-product/components/OrderInfo";
import ProductInfo from "layouts/pages/products/new-product/components/ProductInfo";
import ConfirmationScreen from "layouts/pages/products/new-product/components/Confirmation";
// import Address from "layouts/pages/products/new-product/components/Address";
// import Socials from "layouts/pages/products/new-product/components/Socials";
// import Profile from "layouts/pages/products/new-product/components/Profile";

// NewUser layout schemas for form and form feilds
import validations from "layouts/pages/products/new-product/schemas/validations";
import form from "layouts/pages/products/new-product/schemas/form";
import initialValues from "layouts/pages/products/new-product/schemas/initialValues";

import {
  pullCustomerAddresses,
  convertOrderFormat,
  submitOrder,
  submitQuote,
  getLoginCookie,
} from "utils/koapi";

function getSteps() {
  return ["Order Info", "Customer Info", "Customer Address", "Pricing", "Confirmation"];
}

function NewUser() {
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customerAddresses, setCustomerAddresses] = useState([]);
  const [stagedOrder, setStagedOrder] = useState({});
  const [stagedActions, setStagedActions] = useState(null);
  const [stagedFormattedOrder, setStagedFormattedOrder] = useState({});
  const [currentUser, setCurrentUser] = useState(false);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleBack = () => setActiveStep(activeStep - 1);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getLoginCookie().then((accountData) => {
        console.log(accountData.account);
        if (accountData && accountData.account.email) {
          setCurrentUser(accountData);
          pullCustomerAddresses(accountData.account.email).then((response) => {
            const customers = response;
            console.log(customers);
            setCustomerAddresses(response);
          });
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const sendOrderForProcessing = () => {
    if (stagedActions) {
      if (stagedFormattedOrder.sales && stagedFormattedOrder.sales.quoteType === "Quote") {
        submitQuote(stagedFormattedOrder, "fuel").then((orderSubmisionResponse) => {
          console.log(orderSubmisionResponse);
          stagedActions.setSubmitting(false);
          stagedActions.resetForm();
          stagedActions.setFieldValue("orderItems", []);
          setActiveStep(0);
        });
      } else {
        submitOrder(stagedFormattedOrder, "fuel").then((orderSubmisionResponse) => {
          console.log(orderSubmisionResponse);
          stagedActions.setSubmitting(false);
          stagedActions.resetForm();
          stagedActions.setFieldValue("orderItems", []);
          setActiveStep(0);
        });
      }
    }
  };
  const submitForm = async (values, actions) => {
    // await sleep(1000);
    // eslint-disable-next-line no-alert
    // Clear button components
    await values.orderItems.map((item) => {
      const responseObj = item;
      try {
        delete responseObj.EditBtn;
      } catch (error) {
        console.log("Error deleting item button", error);
      }
      return responseObj;
    });
    setStagedOrder(values);
    setDialogOpen(true);
    const formattedOrder = await convertOrderFormat(values);
    setStagedFormattedOrder(formattedOrder);
    console.log(values);
    console.log(formattedOrder);
    setStagedActions(actions);

    // eslint-disable-next-line no-alert
    // alert(
    //   JSON.stringify(values, (key, value) => (value === null ? "" : value)),
    //   2
    // );
    // // eslint-disable-next-line no-alert
    // alert(
    //   JSON.stringify(formattedOrder, (key, value) => (value === null ? "" : value)),
    //   2
    // );
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };
  function getStepContent(stepIndex, formData) {
    switch (stepIndex) {
      case 0:
        // return <OrderInfo formData={formData} />;
        return <CustomerInfo formData={formData} customerAddresses={customerAddresses} />;
      case 1:
        // return <CustomerInfo formData={formData} customerAddresses={customerAddresses} />;
        return <CustomerLocationInfo formData={formData} customerAddresses={customerAddresses} />; // <Socials formData={formData} />;
      // case 2:
      // return <CustomerLocationInfo formData={formData} customerAddresses={customerAddresses} />; // <Socials formData={formData} />;
      // return <ProductInfo formData={formData} customerAddresses={customerAddresses} />;
      // case 3:
      // return <ProductInfo formData={formData} customerAddresses={customerAddresses} />; // <Profile formData={formData} />;
      // case 4:
      // return <ConfirmationScreen formData={formData} />; // <Profile formData={formData} />;
      default:
        return null;
    }
  }
  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    stagedActions.setSubmitting(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} mb={20} height="65vh">
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to submit this order?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Make sure everything is correct before you shoot it our way please. Once its in, we
              start working on it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={handleDialogClose}>Disagree</MDButton>
            <MDButton onClick={() => sendOrderForProcessing()} autoFocus>
              Agree
            </MDButton>
          </DialogActions>
        </Dialog>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", mt: 8 }}
          spacing={3}
        >
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                          setFieldValue,
                        })}
                        <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "send" : "next"}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            <Footer padding="30px" margin="30px" />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default NewUser;
