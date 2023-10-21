import * as React from "react";
import { Dimensions, Text, Image, View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/TabScreens/HomeScreen";
import AccountScreen from "../screens/TabScreens/AccountScreen";
import TasksScreen from "../screens/TabScreens/TasksScreen";
import EarningScreen from "../screens/TabScreens/EarningScreen";

const WIDTH = Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    color: "#9E9E9E",
    fontFamily: "Medium",
    textAlign: "center",
    marginTop: 2,
  },
});

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: "#fff",
          // Max Height...
          height: Platform.OS === "android" ? RFValue(82) : RFValue(82),
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F4F4F6",
          width: WIDTH,
          paddingHorizontal: RFValue(0),
          paddingTop: Platform.OS === "android" ? RFValue(5) : RFValue(0),
          paddingBottom: Platform.OS === "android" ? RFValue(15) : RFValue(20),
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "home") {
            if (focused) {
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: "#0C4DA2",
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/home.png")}
                  />
                  <Text
                    style={{
                      ...styles.label,
                      color: "#0C4DA2",
                      fontFamily: "Bold",
                    }}
                  >
                    Home
                  </Text>
                </View>
              );
            } else
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/home.png")}
                  />
                  <Text style={{ ...styles.label }}>Home</Text>
                </View>
              );
          } else if (route.name === "tasks") {
            if (focused) {
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: "#0C4DA2",
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/task.png")}
                  />
                  <Text
                    style={{
                      ...styles.label,
                      color: "#0C4DA2",
                      fontFamily: "Bold",
                    }}
                  >
                    Tasks
                  </Text>
                </View>
              );
            } else
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/task.png")}
                  />
                  <Text style={{ ...styles.label }}> Tasks</Text>
                </View>
              );
          } else if (route.name === "earnings") {
            if (focused) {
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: "#0C4DA2",
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/earnings.png")}
                  />
                  <Text
                    style={{
                      ...styles.label,
                      color: "#0C4DA2",
                      fontFamily: "Bold",
                    }}
                  >
                    Earnings
                  </Text>
                </View>
              );
            } else
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/earnings.png")}
                  />
                  <Text style={{ ...styles.label }}>Earnings</Text>
                </View>
              );
          } else if (route.name === "account") {
            if (focused) {
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: "#0C4DA2",
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/account.png")}
                  />

                  <Text
                    style={{
                      ...styles.label,
                      color: "#0C4DA2",
                      fontFamily: "Bold",
                    }}
                  >
                    profile
                  </Text>
                </View>
              );
            } else
              return (
                <View>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: "center",
                    }}
                    source={require("../assets/icons/TabIcons/account.png")}
                  />
                  <Text style={{ ...styles.label }}>profile</Text>
                </View>
              );
          }
        },

        headerShown: false,
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="tasks" component={TasksScreen} />
      <Tab.Screen name="earnings" component={EarningScreen} />
      <Tab.Screen name="account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
