import { createAsyncThunk } from "@reduxjs/toolkit";
import { persistor, store } from "../redux/store";
import mime from "mime";

import { ENDPOINTS } from "./endpoints";
import { HTTP_CLIENT } from "./config";

let HEADERS = {
  Accept: "application/json",
};

export const registerUser = async (params) => {
  return await HTTP_CLIENT.post(ENDPOINTS.REGISTER, params);
};

export const loginApi = async (params) => {
  return await HTTP_CLIENT.post(ENDPOINTS.LOGIN, params);
};
export const forgotPasswordEmail = async (params) => {
  return await HTTP_CLIENT.post(ENDPOINTS.FORGOTPASSWORDEMAIL, params);
};
export const forgotPasswordPhone = async (params) => {
  return await HTTP_CLIENT.post(ENDPOINTS.FORGOTPASSWORDPHONE, params);
};

export const resetPassword = async (params) => {
  return await HTTP_CLIENT.patch(ENDPOINTS.RESETPASSWORD, params);
};
export const updateDriver = async (params, id) => {
  return await HTTP_CLIENT.patch(`${ENDPOINTS.UPDATEDRIVER}${id}`, params);
};
export const updateDriverField = async (params, id) => {
  return await HTTP_CLIENT.patch(`${ENDPOINTS.UPDATEDRIVERFIELD}${id}`, params);
};

export const driverLicense = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image?.uri,
    type: mime.getType(image.uri),
    name: image.fileName || image.uri.split("/").reverse()[0] || "upload_file",
  };
  formData.append("file", photo);
  console.log("driverLicense API  >>driverLicense>>", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.DRIVER_LICENSE, formData);
};
export const insuranceVehicle = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image?.uri),
    name: image.fileName || image.uri.split("/").reverse()[0] || "upload_file",
  };
  formData.append("file", photo);
  console.log("insuranceVehicle  >>insuranceVehicle>>", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.INSURANCE, formData);
};

export const registrationVehicle = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image.uri),
    name: image.fileName || image.uri.split("/").reverse()[0] || "upload_file",
  };
  console.log("registrationVehicle  >>registrationVehicle>>", photo);
  formData.append("file", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.REGISTRATION_VEHICLE, formData);
};

export const photoApi = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image.uri),
    name: image.fileName || image.uri.split("/").reverse()[0] || "upload_file",
  };
  console.log("0000000000000000000000>>registrationVehicle>>", photo);
  formData.append("file", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.PHOTO, formData);
};

export const post = (email) => {
  return HTTP_CLIENT.get(``);
};
export const getMyBookings = (url) => {
  console.log("urlurlurl>>>", url);
  return HTTP_CLIENT.get(
    `${ENDPOINTS.GETMYBOOKINGS}${url == "" ? "" : "?"}${url}`
  );
};
export const getBookingRequests = () => {
  return HTTP_CLIENT.get(ENDPOINTS.GETBOOKINGREQUESTS);
};
export const myRatingsApi = () => {
  return HTTP_CLIENT.get(ENDPOINTS.MY_RATING);
};
export const getPackageBy_ID = (id) => {
  return HTTP_CLIENT.get(`${ENDPOINTS.GET_PACKAGE_BY_ID}${id}`);
};
export const GetMessage = async (id) => {
  return await HTTP_CLIENT.get(`${ENDPOINTS.GETMESSAGE}${id}`);
};
export const SendMessage = async (params) => {
  return await HTTP_CLIENT.post(ENDPOINTS.SENDMESSAGE, params);
};
