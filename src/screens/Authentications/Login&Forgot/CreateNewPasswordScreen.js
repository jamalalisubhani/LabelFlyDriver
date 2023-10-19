import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../../components/HeaderBack";
import { RFValue } from "react-native-responsive-fontsize";
import CustomTextInput from "../../../components/CustomTextInput";
import RememberMeCheckbox from "../../../components/RememberMeCheckbox";
import Button from "../../../components/Button";

const { width, height } = Dimensions.get("window");

export default function CreateNewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  return (
    <View style={styles.container}>
      <HeaderBack title="Create New Password" />

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(-90)}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topImageContainer}>
            <Image
              style={styles.forgotBackImage}
              source={require("../../../assets/images/createpasswordback.png")}
            />
          </View>

          <View style={styles.createYourPasswordContainer}>
            <Text style={styles.createYourPasswordtext}>
              Create Your New Password
            </Text>

            <View style={styles.inputsContainer}>
              <CustomTextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                secureTextEntry
              />
              <CustomTextInput
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                secureTextEntry
              />
            </View>

            <View style={styles.rememberMeContainer}>
              <RememberMeCheckbox />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footerButtonContainer}>
          <Button
            onPress={() => navigation.navigate("LoginScreen")}
            title="Continue"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFF",
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  topImageContainer: {
    flex: 0.4,
    marginTop: RFValue(40),
  },
  forgotBackImage: {
    width: width - 58,
    height: height / 4,
    resizeMode: "contain",
    alignSelf: "center",
  },
  createYourPasswordContainer: {
    flex: 0.6,
    paddingTop: RFValue(40),
    paddingHorizontal: RFValue(20),
  },
  createYourPasswordtext: {
    color: "#212121",
    fontFamily: "Medium",
    fontSize: RFValue(16),
    paddingLeft: RFValue(20),
    paddingBottom: RFValue(20),
  },
  inputsContainer: {
    marginBottom: RFValue(20),
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? RFValue(30) : RFValue(30),
    left: 0,
    right: 0,
    paddingHorizontal: RFValue(20),
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(2),
  },
  rememberMeText: {
    color: "#212121",
    fontSize: RFValue(12),
    fontFamily: "SemiBold",
    marginLeft: RFValue(10),
  },
});
