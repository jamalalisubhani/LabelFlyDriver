import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const SelectableButtons = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          props.selectedButton === "sameDay" && styles.selectedButton,
        ]}
        onPress={() => props.handleButtonPress("sameDay")}
      >
        <Text
          style={[
            styles.buttonText,
            props.selectedButton === "sameDay" && styles.selectedButtonText,
          ]}
        >
          Same Day
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          props.selectedButton === "nextDay" && styles.selectedButton,
        ]}
        onPress={() => props.handleButtonPress("nextDay")}
      >
        <Text
          style={[
            styles.buttonText,
            props.selectedButton === "nextDay" && styles.selectedButtonText,
          ]}
        >
          Next Day
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          props.selectedButton === "standard" && styles.selectedButton,
        ]}
        onPress={() => props.handleButtonPress("standard")}
      >
        <Text
          style={[
            styles.buttonText,
            props.selectedButton === "standard" && styles.selectedButtonText,
          ]}
        >
          Standard
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(22),
    marginLeft: RFValue(19),
  },
  button: {
    width: RFValue(90),
    height: 38,
    borderWidth: 2,
    borderColor: "#101010",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: RFValue(10),
  },
  buttonText: {
    color: "#101010",
    fontSize: RFValue(13),
    fontFamily: "SemiBold",
  },
  selectedButton: {
    backgroundColor: "#0C4DA2",
    borderWidth: 0,
  },
  selectedButtonText: {
    color: "white",
    fontSize: RFValue(13),
    fontFamily: "SemiBold",
  },
});

export default SelectableButtons;
