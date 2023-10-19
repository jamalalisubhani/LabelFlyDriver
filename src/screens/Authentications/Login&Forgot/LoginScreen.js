import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import CustomTextInput from "../../../components/CustomTextInput";
import RememberMeCheckbox from "../../../components/RememberMeCheckbox";
import Button from "../../../components/Button";
import ContinueWithButton from "../../../components/ContinueWithButton";
import SocialLogin from "../../../components/SocialLogin";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // keyboardVerticalOffset={50}
      // behavior={"position"}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FCFCFF" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={styles.arrowBack}
              source={require("../../../assets/icons/arrow-back.png")}
            />
          </Pressable>

          <Image
            style={styles.logo}
            source={require("../../../assets/icons/logosmall.png")}
          />

          <View>
            <Text style={styles.logintoAccount}>Login to Your Account</Text>

            <View style={styles.inputsContainer}>
              <CustomTextInput
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Email"
              />

              <CustomTextInput
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.rememberMeContainer}>
            <RememberMeCheckbox />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <View style={styles.loginButtonContainer}>
            <Button 
            onPress={() => navigation.navigate('tabs')}
             title="Log In" />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={styles.forgotPasswordText}>Forgot the password?</Text>
          </TouchableOpacity>

          <View>
            <ContinueWithButton />
          </View>

          <View style={styles.SocialLoginContainer}>
            <SocialLogin icon={require("../../../assets/icons/facebook.png")} />
            <SocialLogin icon={require("../../../assets/icons/google.png")} />
            <SocialLogin icon={require("../../../assets/icons/apple.png")} />
          </View>

          <Pressable
          onPress={()=>navigation.navigate('RegisterScreenName')}
          >
            <Text style={styles.footerLine}>
              Don’t have an account?{" "}
              <Text
                style={{
                  ...styles.footerLine,
                  fontFamily: "SemiBold",
                  color: "#0C4DA2",
                }}
              >
                {" "}
                Register
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //   },
  arrowBack: {
    width: RFValue(25),
    height: RFValue(25),
    marginTop: RFValue(60),
    marginLeft: RFValue(20),
  },
  logo: {
    width: RFValue(110),
    height: RFValue(110),
    alignSelf: "center",
    marginTop: RFValue(25),
  },
  logintoAccount: {
    color: "#212121",
    fontFamily: "Bold",
    fontSize: RFValue(28),
    textAlign: "center",
    marginTop: RFValue(20),
  },
  inputsContainer: {
    marginTop: RFValue(20),
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
  loginButtonContainer: {
    marginTop: RFValue(20),
  },
  forgotPasswordText: {
    color: "#0C4DA2",
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    textAlign: "center",
    marginTop: RFValue(20),
  },
  SocialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginTop: RFValue(20),
  },
  footerLine: {
    fontSize: RFValue(13),
    color: "#9E9E9E",
    fontFamily: "Regular",
    textAlign: "center",
    marginTop: RFValue(20),
  },
});
