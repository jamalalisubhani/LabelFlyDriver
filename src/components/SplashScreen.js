import React from "react";
import { View, Image, StyleSheet, Animated, ImageBackground, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const SplashScreen = () => {
  const [rotation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ImageBackground
    source={require('../assets/images/splashanimated.png')}
    style={styles.container}>
      <Animated.Image
        source={require("../assets/icons/loader.png")}
        style={[styles.logo, { transform: [{ rotate }] }]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  logo: {
    width: RFValue(50),
    height:RFValue(50),
    marginTop:Dimensions.get('window').height/1.4
  },
});

export default SplashScreen;
