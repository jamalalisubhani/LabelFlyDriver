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
  UPDATEDRIVER: "api/v1/users/update_driver/",
  UPDATEDRIVERFIELD: "api/v1/users/add_driver_fields/",
  GETMYBOOKINGS: "/api/v1/bookings/driver_booking_list",
  ACCEPTMYBOOKINGS: "/api/v1/bookings/driver/accept/",
  GETBOOKINGREQUESTS: "api/v1/bookings/driver/requests",
  MY_RATING: "api/v1/reviews/driver/my_ratings",
  GET_PACKAGE_BY_ID: "api/v1/packages/",
  GETMESSAGE: "api/v1/message/",
  SENDMESSAGE: "api/v1/message",
};

export { BASE_URL, ENDPOINTS };
