import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const ProgressIndicator = ({ progress, duration }) => {
  const activeLineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(activeLineWidth, {
      toValue: progress,
      duration: duration || 500, // Default duration is 500ms if not provided
      useNativeDriver: false,
    }).start();
  }, [progress, duration]);

  const { width } = Dimensions.get("window");

  const interpolatedWidth = activeLineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.5], // Adjusted to 50% of the screen width
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View
          style={[styles.progressIndicator, { width: interpolatedWidth }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.45, // Adjusted to 50% of the screen width
    height: 8,
  },
  progressBar: {
    flex: 1,
    width: "100%",
    backgroundColor: "#EEEEEE",
    overflow: "hidden",
    borderRadius: 100,
  },
  progressIndicator: {
    height: "100%",
    backgroundColor: "#0C4DA2",
    borderRadius: 100,
  },
});

export default ProgressIndicator;
