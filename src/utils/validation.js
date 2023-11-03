import * as Yup from "yup";

export const regStep1 = Yup.object().shape({
  name: Yup.string().required("required"),
});

export const regStep2 = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  phone: Yup.string().required("required"),
});
export const regStep3 = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Password too Short"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("required"),
});
export const regStep3A = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Password too Short"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("required"),
  code: Yup.string().required("Required"),
});
export const regStep4 = Yup.object().shape({
  model: Yup.string().required("required"),
});
export const loginSch = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().required("Required").min(8, "Password too Short"),
});
export const accupdate = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});
export const vehicleinfo = Yup.object().shape({
  model: Yup.string().required("Required"),
  licensePlate: Yup.string().required("Required"),
});
