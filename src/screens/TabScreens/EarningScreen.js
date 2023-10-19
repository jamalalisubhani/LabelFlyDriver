import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");
export default function EarningScreen() {
  return (
    <View style={styles.container}>
    <Text
    style={styles.earningText}
    >Earnings Comming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent:"center",
    alignItems:"center",
  },
  earningText:
  {
    color:'#212121',
    fontFamily:'SemiBold',
    fontSize:RFValue(24)
  }
});
