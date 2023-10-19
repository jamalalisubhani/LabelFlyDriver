import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

export default function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: width - 48,
    height: RFValue(52),
    backgroundColor: "#0C4DA2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnText: {
    fontSize: RFValue(14),
    fontFamily: "Bold",
    color: "#fff",
  },
});
