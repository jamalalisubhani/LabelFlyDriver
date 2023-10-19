import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");
const AnimatedLabelInput = ({
  keyboardType = "default",
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}) => {
  const handleInputChange = (text) => {
    onChangeText(text);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <View style={styles.container}>
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color={isActive ? "#0C4DA2" : "#B3D2F9"}
          />
        </TouchableOpacity>
      )}

      <TextInput
        placeholderTextColor={"#9E9E9E"}
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 48,
    borderBottomWidth: 1.2,
    borderBottomColor: "#0C4DA2",
    alignSelf: "center",
    marginBottom:RFValue(32)
  },
  input: {
    paddingVertical: 10,
    fontSize: RFValue(20),
    fontFamily: "Bold",
    color: "#212121",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    bottom: 10,
    zIndex: 99999,
  },
});

export default AnimatedLabelInput;
