import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move focus to the next input box
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
      setActiveIndex(index + 1);
    }
  };

  const handleOtpKeyPress = (index, key) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      // Remove the digit from the previous input box
      const newOtp = [...otp];
      newOtp[index - 1] = "";

      setOtp(newOtp);

      // Move focus to the previous input box
      inputRefs.current[index - 1].focus();
      setActiveIndex(index - 1);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          style={[
            styles.input,
            index === activeIndex && styles.activeInput // Apply active input styles
          ]}
          maxLength={1}
          keyboardType="default"
          value={digit}
          onChangeText={(value) => handleOtpChange(index, value)}
          onKeyPress={({ nativeEvent }) =>
            handleOtpKeyPress(index, nativeEvent.key)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(40),
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    width: RFValue(65),
    height: RFValue(48),
    textAlign: "center",
    fontSize: RFValue(21),
    marginHorizontal: 4,
    fontFamily: "Bold"
  },
  activeInput: {
    borderColor: "#EEEEEE",
    borderWidth: 2,
  },
});

export default OtpInput;
