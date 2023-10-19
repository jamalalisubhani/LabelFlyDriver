import React, { useState } from "react";
import { TextInput, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const CustomTextInput = ({ secureTextEntry, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const iconTintColor = isFocused ? "#0C4DA2" : "#B3D2F9";
  const iconSource = secureTextEntry
    ? require("../assets/icons/lock.png")
    : require("../assets/icons/message.png");

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={iconSource}
          style={{
            tintColor: iconTintColor,
            width: 20,
            height: 20,
            marginRight: 8,
          }}
        />
      </View>

      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry && !showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="done"
        value={value}
        // placeholderTextColor={"#9E9E9E"}
        onChangeText={onChangeText}
        {...rest}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={handleTogglePassword}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={iconTintColor}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles...

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderColor: "#B3D2F9",
    backgroundColor: "#FAFAFA",
    marginBottom: 23,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  eyeIconContainer: {
    marginLeft: 8,
  },
  eyeIcon: {
    width: RFValue(18),
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily:'SemiBold',
    color:'#212121'
  },
});

export default CustomTextInput;
