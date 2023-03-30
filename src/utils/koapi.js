import axios from "axios";
import { Storage } from "@capacitor/storage";

const pullProducts = () => {
  const config = {
    method: "get",
    url: "/api/getProducts",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const products = response.data;
      return products;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullProductPackages = (productId) => {
  const config = {
    method: "get",
    url: "/api/getProductPackages",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      id: productId,
    },
  };

  return axios(config)
    .then((response) => {
      console.log(JSON.stringify(response));
      const products = response.data;
      return products;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullPreviousPrices = (userEmail, productId, productPackage = "") => {
  const config = {
    method: "post",
    url: "/api/getProductPreviousPrices",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
      id: productId,
      package: productPackage,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const products = response.data;
      return products;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const sendCustomerAddressRequestEmail = (userEmail, Address) => {
  console.log(Address);
  const config = {
    method: "post",
    url: "/api/sendCustomerAddressCreationEmail",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
    data: JSON.stringify(Address),
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const sendQuoteConfirmationEmail = (userEmail, externalEmail, orderType, orderNumber) => {
  const config = {
    method: "post",
    url: "/api/resendQuoteEmail",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
      externalEmail,
      orderType,
      ordernumber: orderNumber,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const sendOrderConfirmationEmail = (userEmail, externalEmail, orderType, orderNumber) => {
  const config = {
    method: "post",
    url: "/api/resendOrderEmail",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
      externalEmail,
      orderType,
      ordernumber: orderNumber,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullAllOrdersAllSalesmen = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullAllOrdersAllSales",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullAllOrders = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullAllOrders",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const setViewedAnnouncements = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/viewedAnnouncements",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullAnnouncements = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullAnnouncements",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullWarehouseOrders = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullOrders",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullSiteToSiteOrders = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullSiteToSiteOrders",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullWarehouseQuotes = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullQuotes",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullFuelOrders = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullFuelOrders",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullFuelQuotes = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullFuelQuotes",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullMonthlySalesAnalytics = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/orderapp/salesCustomersAnalytics",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullMonthlySalesAnalyticsFuel = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/orderapp/salesCustomersAnalyticsFuel",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullWarehouseDispatchOrders = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/orderapp/pullWarehouseOrdersBySalesman",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullOrderStatus = (userEmail) => {
  const config = {
    method: "get",
    url: "/api/pullOrdersStatusByEmail",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: userEmail,
    },
  };

  return axios(config)
    .then((response) => {
      console.log(response);
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullCustomerAddresses = () => {
  const config = {
    method: "get",
    url: "/api/getCustomerAddresses",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
    },
  };

  return axios(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const orders = response.data;
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullOriginWarehouses = () => {
  const originAddresses = [
    {
      id: 0,
      address: `Warehouse Address 1
    `,
      name: "Warehouse Address 1",
    },
    {
      id: 1,
      address: `Warehouse Address 2
    `,
      name: "Warehouse Address 2",
    },
  ];
  return originAddresses;
};
const submitOrder = (order, orderType) => {
  const orderSubmitConfig = {
    method: "post",
    url: "/api/submitOrder",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      orderType: orderType || "warehouse",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(order),
  };

  return axios(orderSubmitConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const submitSiteToSiteOrder = (order, orderType) => {
  const orderSubmitConfig = {
    method: "post",
    url: "/api/submitSiteToSiteOrder",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      orderType: orderType || "warehouse",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(order),
  };

  return axios(orderSubmitConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const submitQuote = (order, orderType) => {
  const orderSubmitConfig = {
    method: "post",
    url: "/api/submitQuote",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      orderType: orderType || "warehouse",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(order),
  };

  return axios(orderSubmitConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const updateOrder = (order, orderType, orderNumber) => {
  const orderSubmitConfig = {
    method: "post",
    url: "/api/editOrder",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      ordertype: orderType || "warehouse",
      ordernumber: orderNumber,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(order),
  };

  return axios(orderSubmitConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const pullReportingProducts = (productID, productDESC) => {
  const pullProductDataConfig = {
    method: "get",
    url: "/reporting/pullProducts",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      ProductId: productID,
      ProductDesc: productDESC,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios(pullProductDataConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullProductData = (productID, productDESC) => {
  const pullProductDataConfig = {
    method: "get",
    url: "/reporting/pullProductData",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      ProductId: productID,
      ProductDesc: productDESC,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios(pullProductDataConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullOrdersForSalesman = (salesEmail) => {
  const pullProductDataConfig = {
    method: "get",
    url: "/reporting/pullSalesOrders",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      salesemail: salesEmail,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios(pullProductDataConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullSalesTeam = () => {
  const pullProductDataConfig = {
    method: "get",
    url: "/reporting/pullSalesTeam",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios(pullProductDataConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const pullSalesPersonAnalytics = (salesEmail) => {
  const pullProductDataConfig = {
    method: "get",
    url: "/reporting/pullSalesOrderAnalytics",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      "Content-Type": "application/json",
      salesemail: salesEmail,
      "Access-Control-Allow-Origin": "*",
    },
  };

  return axios(pullProductDataConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const updateQuote = (order, orderType, orderNumber) => {
  const orderSubmitConfig = {
    method: "post",
    url: "/api/editQuote",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      ordertype: orderType || "warehouse",
      ordernumber: orderNumber,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(order),
  };

  return axios(orderSubmitConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const convertOrderFormat = (initialOrder) => {
  console.log("CONVERTING ORDER FORMAT");
  console.log(initialOrder);
  const orderTemplate = {
    sales: {
      firstname: initialOrder.salesName.split(" ")[0] || initialOrder.salesName,
      lastname: initialOrder.salesName.split(" ")[1] || initialOrder.salesName,
      email: initialOrder.salesEmail,
      quotenum: initialOrder.quoteNum,
      quoteType: initialOrder.isQuoteOrOrder,
      deliveryDate: initialOrder.deliveryByDate[0] || initialOrder.deliveryByDate,
      phoneNumber: "",
      salesmanID: 0,
      customerType: initialOrder.customerType,
      custTypeID: initialOrder.customerTypeId,
    },
    origin: {
      OriginAddress: initialOrder.originAddress,
    },
    destination: {
      Address1: initialOrder.destinationAddress1,
      State: initialOrder.destinationState || "",
      City: initialOrder.destinationCity,
      ZipCode: initialOrder.destinationZip,
      Customer: initialOrder.customerName,
      CustomerID: initialOrder.customerId,
      LocationID: initialOrder.customerLocationID,
    },
    items: {
      PurchaseOrderNumber: initialOrder.quoteNum,
      customerEmail: "", // TODO
      items: initialOrder.orderItems.map((item) => {
        const tmpObj = {
          Description: item.Description,
          ID: item.ID,
          Package: item.Package,
          PackageID: 1,
          Quantity: item.Quantity,
          PricePerGal: item.Price,
        };
        return tmpObj;
      }),
      lineItemTotal: 0,
      containerShipment: initialOrder.containerShipment || false,
      containerNumber: initialOrder.containerNumber || "",
      notes: initialOrder.orderNotes || "",
    },
  };
  return orderTemplate;
};
const convertToSchemaFormat = (order) => {
  const formattedOrder = order.requestPayload;
  console.log("CONVERTING ORDER FORMAT");
  console.log(formattedOrder);
  const orderTemplate1 = {
    salesName: `${formattedOrder.sales.firstname} ${formattedOrder.sales.lastname}`,
    salesEmail: formattedOrder.sales.email,
    quoteNum: formattedOrder.sales.quotenum,
    isQuoteOrOrder: formattedOrder.sales.quoteType,
    deliveryByDate: formattedOrder.sales.deliveryDate,
    customerType: formattedOrder.sales.customerType,
    customerTypeId: formattedOrder.sales.custTypeID,
    originAddress: formattedOrder.origin.OriginAddress,
    destinationAddress1: formattedOrder.destination.Address1,
    destinationState: formattedOrder.destination.State,
    destinationCity: formattedOrder.destination.City,
    destinationZip: formattedOrder.destination.ZipCode,
    customerName: formattedOrder.destination.Customer,
    customerId: formattedOrder.destination.CustomerID,
    customerLocationID: formattedOrder.destination.LocationID,
    orderItems: formattedOrder.items.items.map((item) => {
      // Check if item.Package is a string or object
      let tmpObj;
      try {
        if (item.Package && item.Package.charAt && item.Package.charAt(0)) {
          tmpObj = {
            Description: item.Description,
            ID: item.ID,
            Package: item.Package,
            Quantity: item.Quantity,
            Price: item.PricePerGal,
          };
          return tmpObj;
        }
      } catch (error) {
        tmpObj = {
          Description: item.Description,
          ID: item.ID,
          Package: item.Package.packName,
          Quantity: item.Quantity,
          Price: item.PricePerGal,
        };
      }
      return tmpObj;
    }),
    containerNumber: formattedOrder.items.containerNumber,
    containerShipment: formattedOrder.items.containerShipment,
    orderNotes: formattedOrder.items.notes,
  };
  return orderTemplate1;
};

const pullFuelProducts = () => {
  const fuelLookupItems = [
    { ID: "LSD", Description: "LSD" },
    { ID: "LED DYED LSD *", Description: "DLSD" },
    { ID: "CONV SUP 93", Description: "Super Unleaded Gas" },
    { ID: "CONV UNL 87", Description: "Regular Unleaded Gas" },
    { ID: "Jet A Fuel", Description: "Jet Fuel" },
    { ID: "Conv PLU  Bld89", Description: "Mid Grade Gas" },
  ];
  return fuelLookupItems;
};
const LogInUser = (username, password) => {
  const LoginuserConfig = {
    method: "post",
    url: "/api/dipatch/loginUser",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: username,
      password,
    },
  };

  return axios(LoginuserConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const changeUserPassword = (username, oldpassword, newpassword) => {
  const LoginuserConfig = {
    method: "post",
    url: "/api/dipatch/changeUserPassword",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: username,
      oldpassword,
      newpassword,
    },
  };

  return axios(LoginuserConfig)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const setLoginCookie = async (cookie) => {
  const storageResult = await Storage.set({
    key: "account",
    value: cookie,
  });
  return storageResult;
};
const logoutUser = async () => {
  const storageResult = await Storage.set({
    key: "account",
    value: null,
  });
  return storageResult;
};
const getLoginCookie = async () => {
  try {
    const { value } = await Storage.get({ key: "account" });
    const formattedValue = JSON.parse(value);
    console.log(formattedValue);
    return formattedValue;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const checkIsLoggedIn = async () => true;
// {
// try {
//   const { value } = await Storage.get({ key: "account" });
//   const cookieData = JSON.parse(value);
//   console.log(cookieData);
//   return true;
// //   if (cookieData.account.driverID) {
// //     return true;
// //   }
// //   return false;
// } catch (error) {
//   console.log(error);
//   return false;
// }
// };
const PullOrdersInProgress = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullAlreadyDispatched",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const DispatchOrderToDriver = (order, driver) => {
  const toggledOrder = order;
  toggledOrder.driverName = driver.name;
  toggledOrder.driverID = driver.driverID;
  toggledOrder.driver = driver.name;
  toggledOrder.AssignedTruck = driver.AssignedTruck;
  toggledOrder.AssignedTruckKey = driver.TruckID;
  toggledOrder.AssignedTruckId = driver.VehicleID;
  toggledOrder.dispatchProcessed = false;
  console.log("dispatching order to driver");
  console.log(driver);
  console.log(toggledOrder);
  const config = {
    method: "post",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      "Content-Type": "application/json",
    },
    apikey: process.env.REACT_APP_NODE_KEY,
    url: "/dispatch/DriverAssigned",
    data: JSON.stringify(toggledOrder),
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const PullWarehouseTrucks = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullDispatchTrucks",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const PullDrivers = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullDispatchDriversMongo",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const PullFinishedOrders = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullFinishedOrders",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const PullOrdersReadyForDispatch = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullOrdersReadyForDispatch",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};
const PullAlreadyDispatched = () => {
  console.log("getting all orders ready for dispatch");
  const config = {
    method: "get",
    url: "/dispatch/PullAlreadyDispatched",
  };
  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

export {
  PullAlreadyDispatched,
  PullOrdersReadyForDispatch,
  PullFinishedOrders,
  PullDrivers,
  PullWarehouseTrucks,
  DispatchOrderToDriver,
  PullOrdersInProgress,
  logoutUser,
  changeUserPassword,
  LogInUser,
  setLoginCookie,
  getLoginCookie,
  checkIsLoggedIn,
  pullSalesPersonAnalytics,
  pullSalesTeam,
  pullOrdersForSalesman,
  pullReportingProducts,
  pullProductData,
  pullMonthlySalesAnalytics,
  pullCustomerAddresses,
  pullFuelOrders,
  pullWarehouseOrders,
  pullWarehouseQuotes,
  pullAllOrders,
  pullAllOrdersAllSalesmen,
  pullPreviousPrices,
  pullProductPackages,
  pullProducts,
  pullOriginWarehouses,
  convertOrderFormat,
  submitOrder,
  submitQuote,
  convertToSchemaFormat,
  updateOrder,
  pullFuelProducts,
  pullFuelQuotes,
  pullWarehouseDispatchOrders,
  pullOrderStatus,
  pullMonthlySalesAnalyticsFuel,
  sendOrderConfirmationEmail,
  sendQuoteConfirmationEmail,
  pullSiteToSiteOrders,
  submitSiteToSiteOrder,
  sendCustomerAddressRequestEmail,
  updateQuote,
  pullAnnouncements,
  setViewedAnnouncements,
};
