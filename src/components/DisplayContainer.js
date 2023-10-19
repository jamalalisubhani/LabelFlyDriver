import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";
export default function DisplayContainer() {
  const navigation= useNavigation('')
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity 
      onPress={()=>navigation.navigate('PlanYourDeliveryScreen')}
      style={styles.individualItemContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/Homeicons/sendp.png")}
        />

        <Text style={styles.title}>Send{"\n"}package</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={()=>navigation.navigate('ScheduleScreen')}
      style={styles.individualItemContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/Homeicons/schedule.png")}
        />

        <Text style={styles.title}>Schedule</Text>
     </TouchableOpacity>

      <TouchableOpacity
       onPress={()=>navigation.navigate('MapTrackingScreen')}
      style={styles.individualItemContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/Homeicons/track.png")}
        />

        <Text style={styles.title}>Track</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>navigation.navigate('activity')}
      style={styles.individualItemContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/Homeicons/history.png")}
        />

        <Text style={styles.title}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop:RFValue(20)
  },

  individualItemContainer: {
    alignItems: "center",
    height: RFValue(105),
  },
  icon: {
    width: 81,
    height: 70,
    borderRadius: 12,
    alignSelf: "center",
  },
  title: {
    fontSize: RFValue(13),
    color: "#212121",
    fontFamily: "SemiBold",
    marginTop: 12,
    textAlign:'center'
  },
});
