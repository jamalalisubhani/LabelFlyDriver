import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export default function HeaderBack(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          style={styles.arrowBack}
          source={require("../assets/icons/arrow-back.png")}
        />
      </Pressable>

      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: RFValue(64),
    marginLeft: RFValue(20),
  },
  arrowBack: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 16,
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Bold",
    fontSize: RFValue(21),
  },
});
