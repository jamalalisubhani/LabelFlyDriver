import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../components/HeaderBack";
import CustomIconInput from "../../components/CustomIconInput";
import CustomTextInput from "../../components/CustomTextInput";
import { RFValue } from "react-native-responsive-fontsize";
import PhoneNumberInput from "../../components/Profile/PhoneNumberInput";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { accupdate, loginSch } from "../../utils/validation";
import { updateDriver } from "../../utils/auth.service";
import { setUser } from "../../redux/reducers/userReducer";

export default function AccountDetailScreen({ navigation }) {
  const { user } = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  console.log("useruseruseruseruser", user);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("Youremail@yourdomain.com");
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const formik = useFormik({
    validationSchema: accupdate,
    initialValues: {
      email: user.data.email ? user.data.email : "",
      name: user.data.name ? user.data.name : "",
      phone: user.data.phone ? user.data.phone : "",
    },

    onSubmit: async (values) => {
      let params = {
        email: values.email,
        name: values.name,
        password: user.data.password,
        phone: user.data.phone,
      };
      updateDriver(params, user?.data?._id)
        .then((res) => {
          if (res) {
            let newuser = { ...user, data: res?.data?.data };
            console.log("KarachiKarachiKarachi>>>>>>>", newuser);
            dispatch(setUser(newuser));

            navigation.navigate("tabs");
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
  });
  return (
    <View style={styles.container}>
      <HeaderBack title="Account details" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(0)}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputsContainer}>
            <CustomIconInput
              placeholder="Full Name"
              icon={require("../../assets/icons/PlanyourJourney/fullname.png")}
              // value={fullname}
              // onChangeText={setFullName}
              onChangeText={formik.handleChange("name")}
              value={formik.values.name}
            />

            <CustomTextInput
              onChangeText={formik.handleChange("email")}
              value={formik.values.email}
              // value={email}
              // onChangeText={handleEmailChange}
              placeholder="Email"
            />

            <PhoneNumberInput
              change={formik.handleChange("phone")}
              phoneval={formik.values.phone}
            />
          </View>
        </ScrollView>
        <View style={styles.footerButtonContainer}>
          <Button
            // onPress={() => navigation.navigate("tabs")}
            onPress={() => formik.handleSubmit()}
            title="Update"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputsContainer: {
    marginTop: RFValue(20),
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? RFValue(30) : RFValue(30),
    left: 0,
    right: 0,
    paddingHorizontal: RFValue(20),
  },
  flexContainer: {
    flex: 1,
  },
  // scrollContainer: {
  //   flex: 1,
  // },
});
