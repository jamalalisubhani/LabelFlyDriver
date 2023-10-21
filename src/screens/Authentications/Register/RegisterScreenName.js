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
import { registerUser } from "../../../utils/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../../redux/reducers/generalDataReducer";
import { Formik, useFormik } from "formik";
import { regStep1 } from "../../../utils/validation";

export default function RegisterScreenName({ navigation }) {
  const { registerdata } = useSelector((state) => state.root.data);
  const dispatch = useDispatch();
  const CustomButton = ({ imageSource, text, onPress }) => {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.socialtext}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const formik = useFormik({
    validationSchema: regStep1,
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      console.log("valuesvaluesvalues", values.name);
      const copy = { ...registerdata };
      dispatch(setRegisterData({ ...copy, name: values.name }));
      console.log("firstfirstfirst", copy);
      navigation.navigate("RegisterDetailsScreen");
    },
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/registerback.png")}
    >
      <HeaderRegister progress={0.08} />

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
              source={require("../../../assets/icons/name.png")}
            />

            <Text style={styles.whatsYourName}>What is your name? </Text>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.fullNameText,
                  formik?.errors?.name && {
                    color: "red",
                  },
                ]}
              >
                Full Name
              </Text>

              <View>
                <RegisterInput
                  keyboardType="default"
                  onChangeText={formik.handleChange("name")}
                  value={formik.values.name}
                  // value={name}
                  // onChangeText={namefunc}
                  placeholder="Your Name"
                />
              </View>
            </View>

            <View style={styles.orcontainer}>
              <View style={styles.line} />
              <Text style={styles.text}>or</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialButtonContainer}>
              <CustomButton
                imageSource={require("../../../assets/icons/facebook.png")}
                text="Continue with Facebook"
                onPress={() => {}}
              />
              <CustomButton
                imageSource={require("../../../assets/icons/google.png")}
                text="Continue with Google"
                onPress={() => {}}
              />
              <CustomButton
                imageSource={require("../../../assets/icons/apple.png")}
                text="Continue with Apple"
                onPress={() => {}}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.nextButtonContainer}
          activeOpacity={0.8}
          onPress={formik.handleSubmit}

          // onPress={handleNext}
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
  },
  whatsYourNameContainer: {
    marginTop: RFValue(22),
  },
  inputContainer: {
    marginTop: RFValue(22),
  },

  orcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: "38%",
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    marginHorizontal: 16,
    fontSize: RFValue(16),
    color: "#616161",
  },
  buttonContainer: {
    width: "90%",
    height: RFValue(52),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: RFValue(20),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    alignSelf: "center",
  },

  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialtext: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#212121",
  },
  socialButtonContainer: {
    marginTop: RFValue(28),
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
