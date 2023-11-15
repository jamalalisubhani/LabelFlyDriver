import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function HeaderBackChat(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrowBack}
            source={require("../../assets/icons/arrow-back.png")}
          />
        </Pressable>

        <Text style={styles.headerTitle}>{props.title}</Text>
      </View>

      <TouchableOpacity>
        <Image
          style={styles.callIcon}
          source={require("../../assets/icons/Activity/callActivity.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFValue(64),
    marginLeft: RFValue(20),
    paddingBottom: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
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
  callIcon: {
    width: 28,
    height: 28,
    marginRight: 20,
  },
});
