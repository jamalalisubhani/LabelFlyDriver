import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  registerdata: {
    name: "",
    email: "",
    password: "",
    role: "driver",
    photo: "",
    phone: "",
    driver: {
      license: "",
      vehicle_insurance: "",
      vehicle_registration_registration: "",
      model: "",
      license_plate: null,
    },
  },
};
export const generalDataReducer = createSlice({
  name: "generalData",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.registerdata = action.payload;
    },
  },
});

export const { setRegisterData } = generalDataReducer.actions;

export default generalDataReducer.reducer;
