import * as Yup from "yup";

export const regStep1 = Yup.object().shape({
  name: Yup.string().required("required"),
});

export const regStep2 = Yup.object().shape({
  email: Yup.string().email("Invalid_Email").required("Email_Required"),
  phone: Yup.string().required("required"),
});
export const regStep3 = Yup.object().shape({
  password: Yup.string().required("Required").min(8, "Password_too_Short"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords_must_match")
    .required("required"),
});
export const regStep4 = Yup.object().shape({
  model: Yup.string().required("required"),
});
export const loginSch = Yup.object().shape({
  email: Yup.string().email("Invalid_Email").required("Email_Required"),
  password: Yup.string().required("Required").min(8, "Password_too_Short"),
});
