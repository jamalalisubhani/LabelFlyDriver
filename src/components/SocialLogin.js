import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const SocialLogin = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <Image source={props.icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 80,
    height: 60,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default SocialLogin;
