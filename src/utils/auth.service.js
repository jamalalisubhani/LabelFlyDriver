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

export const driverLicense = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image?.uri,
    type: mime.getType(image.uri),
    name: "image",
  };
  formData.append("file", photo);
  console.log("0000000000000000000000>>driverLicense>>", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.DRIVER_LICENSE, formData);
};
export const insuranceVehicle = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image?.uri),
    name: "image",
  };
  formData.append("file", photo);
  console.log("0000000000000000000000>>insuranceVehicle>>", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.INSURANCE, formData);
};

export const registrationVehicle = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image.uri),
    name: "image",
  };
  console.log("0000000000000000000000>>registrationVehicle>>", photo);
  formData.append("file", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.REGISTRATION_VEHICLE, formData);
};

export const photoApi = async (image) => {
  const formData = new FormData();

  const photo = {
    uri: image.uri,
    type: mime.getType(image.uri),
    name: "image",
  };
  console.log("0000000000000000000000>>registrationVehicle>>", photo);
  formData.append("file", photo);

  return await HTTP_CLIENT.post(ENDPOINTS.PHOTO, formData);
};

export const post = (email) => {
  return HTTP_CLIENT.get(``);
};
