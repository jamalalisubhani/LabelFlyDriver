import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
const SeeAllAdress = ({ title, desc, index }) => {
  const isFirstItem = index === 0;
  const navigation= useNavigation();

  return (
    <TouchableOpacity 
    onPress={()=>navigation.navigate('PlanMapScreen')}
    activeOpacity={0.5}
    style={styles.container}>
      {isFirstItem ? null : <View style={styles.separator} />}
      <View style={styles.itemContainer}>
        <Image
          style={styles.image}
          source={require("../assets/icons/location.png")}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  separator: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#eeeeee",
    marginTop: RFValue(10),
    marginBottom: RFValue(10),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 49,
    height: 49,
  },
  content: {
    marginLeft: 16,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: "Bold",
    marginBottom: 7,
    color: "#212121",
  },
  description: {
    fontSize: RFValue(13),
    fontFamily: "Medium",
    color: "#757575",
  },
});

export default SeeAllAdress;
