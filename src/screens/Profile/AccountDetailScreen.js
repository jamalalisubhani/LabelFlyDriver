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
import {  RFValue } from "react-native-responsive-fontsize";
import PhoneNumberInput from "../../components/Profile/PhoneNumberInput";
import Button from "../../components/Button";

export default function AccountDetailScreen({ navigation }) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("Youremail@yourdomain.com");
  const handleEmailChange = (text) => {
    setEmail(text);
  };
  return (
    <View style={styles.container}>
      <HeaderBack title="Account details" />
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(0)}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView
          style={{flex:1,}}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputsContainer}>
            <CustomIconInput
              placeholder="Full Name"
              icon={require("../../assets/icons/PlanyourJourney/fullname.png")}
              value={fullname}
              onChangeText={setFullName}
            />

            <CustomTextInput
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Email"
            />

            <PhoneNumberInput />
          </View>
        </ScrollView>
        <View style={styles.footerButtonContainer}>
          <Button onPress={() => navigation.navigate("tabs")} title="Update" />
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
