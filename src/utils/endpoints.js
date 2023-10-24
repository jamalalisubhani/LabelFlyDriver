import { BASE_URL } from "../config/index";

// const BASE_URL = baseUrl;
const ENDPOINTS = {
  REGISTER: "api/v1/users/signup",
  LOGIN: "api/v1/users/login",
  DRIVER_LICENSE: "api/v1/users/upload/license",
  INSURANCE: "api/v1/users/upload/insurance",
  REGISTRATION_VEHICLE: "api/v1/users/upload/registration",
  PHOTO: "api/v1/users/upload/photo",
  FORGOTPASSWORDEMAIL: "api/v1/users/forgotPasswordEmail",
  FORGOTPASSWORDPHONE: "api/v1/users/forgotPasswordPhone",
  RESETPASSWORD: "api/v1/users/resetPassword",
  UPDATEDRIVER: "api/v1/users/update-driver/",
};

export { BASE_URL, ENDPOINTS };
