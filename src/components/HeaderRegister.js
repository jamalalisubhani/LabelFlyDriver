import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function HeaderRegister(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      
      <Pressable 
      
      onPress={()=>navigation.goBack()}>
      <Image
        style={styles.arrowBack}
        source={require("../assets/icons/arrow-back.png")}
      />
      </Pressable>
      
      <ProgressIndicator progress={props.progress} duration={1100} />
      
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(20),
    marginTop: RFValue(64),
  },
  arrowBack: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 16,
  },

  loginText: {
    fontSize: RFValue(14),
    fontFamily: "Bold",
    color: "#0C4DA2",
  },
});
