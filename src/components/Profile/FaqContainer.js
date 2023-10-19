import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const AccordionContainer = ({ title, description, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnimation = useState(new Animated.Value(0))[0];

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    Animated.timing(rotateAnimation, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const containerStyles = [styles.container, isOpen && styles.containerActive];

  return (
    <View style={containerStyles}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={toggleAccordion}
      >
        <Text style={styles.title}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <Image
            style={{ width: 24, height: 24, resizeMode: "contain" }}
            source={
              isOpen
                ? require("../../assets/icons/Profile/arrow-down.png")
                : require("../../assets/icons/Profile/arrow-down.png")
            }
          />
        </Animated.View>
      </TouchableOpacity>
      {isOpen && (
        <View>
          <View style={styles.separator} />
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: RFValue(20),
    paddingHorizontal: 24,
  },
  containerActive: {
    height: 180,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 72,
  },
  title: {
    fontSize: RFValue(15),
    color: "#212121",
    fontFamily: "Bold",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#EEEEEE",
    alignSelf: "center",
  },
  description: {
    marginVertical: 16,
    fontSize: RFValue(14),
    color: "#424242",
    fontFamily: "Medium",
    textAlign: "justify",
  },
});

export default AccordionContainer;
