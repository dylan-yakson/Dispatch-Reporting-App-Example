import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  CHANGE_USER_PASSWORD,
  SET_ORDER_TYPE,
} from "./types";

// Set logged in user
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// User loading
export const setUserLoading = () => ({
  type: USER_LOADING,
});

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (username, password) => (dispatch) => {
  const LoginuserConfig = {
    method: "post",
    url: "/api/dipatch/loginUser",
    headers: {
      apikey: process.env.REACT_APP_NODE_KEY,
      email: username,
      password,
    },
  };

  axios(LoginuserConfig)
    .then((response) => {
      if (response && response.data) {
        dispatch(setCurrentUser(response.data.account));
        console.log(JSON.stringify(response.data));
      }
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );

  // axios
  //   .post("/api/users/login", userData)
  //   .then((res) => {
  //     // Save to localStorage

  //     // Set token to localStorage
  //     const { token } = res.data;
  //     localStorage.setItem("jwtToken", token);
  //     localStorage.setItem("data", JSON.stringify(res.data));
  //     console.log(res.data);
  //     // Set token to Auth header
  //     setAuthToken(token);
  //     // Decode token to get user data
  //     const decoded = jwt_decode(token);
  //     localStorage.setItem("UserEmail", decoded.email);

  //     // Set current user
  //     dispatch(setCurrentUser(decoded));
  //   })
  //   .catch((err) =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data,
  //     })
  //   );
};
// Login - get user token
export const changeUserPassword = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/changePassword", userData)
    .then((res) => {
      // Save to localStorage
      console.log(res);
      // return res;
      dispatch({
        type: CHANGE_USER_PASSWORD,
      });
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log(JSON.stringify(err.response));
      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const setOrderType = (orderType) => ({
  type: SET_ORDER_TYPE,
  payload: orderType,
});
