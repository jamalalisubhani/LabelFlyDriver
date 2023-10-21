import { createSlice } from "@reduxjs/toolkit";
import { NativeModules } from "react-native";
export const initialdata = {
  user: [],
};

// let lang
// if(NativeModules.I18nManager.localeIdentifier == "iw_IL"){
//   lang = 'heb'

// }else if(NativeModules.I18nManager.localeIdentifier.includes('ar')){
//   lang = 'ar'
// }else{
//   lang = 'en'
// }
const initialState = {
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
