import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./MainNavigation";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./Auth";

export default function Routes() {
  const { user } = useSelector((state) => state.root.user);
  console.log("useSelectoruseSelector", user);
  return <View style={{ flex: 1 }}>{user ? <Navigation /> : <Auth />}</View>;
}
