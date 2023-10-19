import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;
const HelpSegmentTabBar = ({ tabs, activeTab, handleTabChange }) => {
  const tabCount = tabs.length;
  const indicatorWidth = WIDTH / tabCount-12;
  const indicatorLeft = activeTab * indicatorWidth+20;
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => handleTabChange(index)}
          >
            <Text
              style={[
                styles.tabButtonText,
                isActive && styles.activeTabButtonText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
      <View style={styles.activeTabBorder} />
      <View
        style={[
          styles.activeTabIndicator,
          { left: indicatorLeft - 20, width: indicatorWidth * 0.86 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: 33,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 28,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 0,
    //borderBottomColor: '#BBF246',
  },
  tabButtonText: {
    color: "#9E9E9E",
    fontFamily: "Semibold",
    fontSize: RFValue(15),
    marginBottom: 5,
  },
  activeTabButtonText: {
    color: "#0C4DA2",
    fontSize: RFValue(15),
    fontFamily: "SemiBold",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#0C4DA2",
    zIndex: -1,
    borderRadius:100,
  },
  activeTabBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#EEEEEE",
    zIndex: -1,
    borderRadius:100,
  },
});

export default HelpSegmentTabBar;
