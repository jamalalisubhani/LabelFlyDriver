import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import HeaderRegister from "../../../components/HeaderRegister";
import { RFValue } from "react-native-responsive-fontsize";
import RegisterInput from "../../../components/RegisterInput";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../../redux/reducers/generalDataReducer";
import { Formik, useFormik } from "formik";
import { regStep3 } from "../../../utils/validation";

export default function RegisterCreatePasswordScreen({ navigation }) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { registerdata } = useSelector((state) => state.root.data);
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: regStep3,
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values) => {
      const copy = { ...registerdata };
      dispatch(setRegisterData({ ...copy, password: values?.password }));
      navigation.navigate("RegisterVehicleModelScreen");
    },
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/registerback.png")}
    >
      <HeaderRegister progress={0.35} />

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(-150)}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.whatsYourNameContainer}>
            <Image
              style={styles.nameIcon}
              source={require("../../../assets/icons/password.png")}
            />

            <Text style={styles.whatsYourName}>Create your password</Text>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.fullNameText,
                  formik?.errors?.password && { color: "red" },
                ]}
              >
                Password
              </Text>
              {formik?.errors?.password && (
                <Text style={styles.errpassword}>
                  password should be at least 8 characters
                </Text>
              )}

              <View>
                <RegisterInput
                  keyboardType="default"
                  onChangeText={formik.handleChange("password")}
                  value={formik.values.password}
                  // value={password}
                  // onChangeText={setPassword}
                  placeholder="Your Password"
                  secureTextEntry={true}
                />
                <Text
                  style={[
                    styles.fullNameText,
                    formik?.errors?.confirmpassword && { color: "red" },
                  ]}
                >
                  Confirm Password
                </Text>
                {formik?.errors?.confirmpassword && (
                  <Text style={styles.errpassword}>password should match</Text>
                )}
                <RegisterInput
                  keyboardType="default"
                  onChangeText={formik.handleChange("confirmpassword")}
                  value={formik.values.confirmpassword}
                  // value={confirmPassword}
                  // onChangeText={setConfirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.nextButtonContainer}
          activeOpacity={0.8}
          // onPress={handleNext}
          onPress={formik.handleSubmit}
        >
          <Image
            style={styles.nextButton}
            source={require("../../../assets/icons/nextbutton2.png")}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameIcon: {
    width: RFValue(28),
    height: RFValue(28),
    resizeMode: "contain",
    marginLeft: RFValue(20),
    marginBottom: RFValue(12),
  },
  whatsYourName: {
    fontSize: RFValue(27),
    color: "#212121",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
  },
  fullNameText: {
    fontSize: RFValue(14),
    color: "#212121",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
    marginBottom: 8,
  },
  errpassword: {
    fontSize: RFValue(9),
    color: "red",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
    marginBottom: 8,
  },
  whatsYourNameContainer: {
    marginTop: RFValue(22),
  },
  inputContainer: {
    marginTop: RFValue(22),
  },

  nextButton: {
    width: RFValue(85),
    height: RFValue(125),
    resizeMode: "contain",
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 150,
  },
});
