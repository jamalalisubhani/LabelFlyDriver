import React from "react";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";
const RecentItem = (props) => {
  const navigation= useNavigation()
  return (
    <TouchableOpacity
    onPress={()=>navigation.navigate('PlanMapScreen')}
    activeOpacity={0.6} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/icons/location.png")}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.description}>{props.desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom:RFValue(20),
   
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
    fontFamily:'Bold',
    marginBottom: 7,
    color:'#212121'
  },
  description: {
    fontSize: RFValue(13),
    fontFamily:'Medium',
    color:'#757575'
  },
});

export default RecentItem;
