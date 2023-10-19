import React, { useState } from "react";
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

const CardNumberInput = ({ value, onChangeText, ...rest }) => {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Submitted card number:", value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        returnKeyType="done"
        value={value}
        keyboardType="numeric"
        maxLength={19}
        placeholderTextColor={"#9E9E9E"}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        {...rest}
      />
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
    fontFamily: "SemiBold",
    color: "#212121",
  },
});

export default CardNumberInput;
