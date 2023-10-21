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
import { regStep2 } from "../../../utils/validation";
export default function RegisterDetailsScreen({ navigation }) {
  const { registerdata } = useSelector((state) => state.root.data);
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: regStep2,
    initialValues: {
      email: "",
      phone: "",
    },
    onSubmit: async (values) => {
      const copy = { ...registerdata };
      dispatch(
        setRegisterData({ ...copy, email: values.email, phone: values.phone })
      );

      navigation.navigate("RegisterCreatePasswordScreen");
    },
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/registerback.png")}
    >
      <HeaderRegister progress={0.25} />

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
              source={require("../../../assets/icons/contact.png")}
            />

            <Text style={styles.whatsYourName}>Your contact details</Text>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.fullNameText,
                  formik.errors.email && { color: "red" },
                ]}
              >
                Email
              </Text>

              <View>
                <RegisterInput
                  keyboardType="default"
                  onChangeText={formik.handleChange("email")}
                  value={formik.values.email}
                  // value={email}
                  // onChangeText={setEmail}
                  placeholder="Your Email"
                />
                <Text
                  style={[
                    styles.fullNameText,
                    formik.errors.phone && { color: "red" },
                  ]}
                >
                  Phone Number
                </Text>
                <RegisterInput
                  keyboardType="phone-pad"
                  onChangeText={formik.handleChange("phone")}
                  value={formik.values.phone}
                  // value={phone}
                  // onChangeText={setPhone}
                  placeholder="Your Number"
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
    fontSize: RFValue(28),
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
