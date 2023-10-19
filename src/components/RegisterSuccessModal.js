import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const RegisterSuccessModal = ({ isVisible, closeModal }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const rotation = useRef(new Animated.Value(0)).current;
  let animation;

  useEffect(() => {
    if (isVisible) {
      // Animate the loader rotation
      animation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // Wait for 2 seconds and navigate to the desired screen
      const timer = setTimeout(() => {
        navigation.navigate("tabs");
      }, 2000);

      return () => {
        clearTimeout(timer);
        animation && animation.stop();
      };
    }
  }, [isVisible, navigation, rotation]);

  useEffect(() => {
    if (!isFocused) {
      closeModal();
    } else {
      animation && animation.start();
    }
  }, [isFocused, closeModal, animation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      backdropColor="#000"
      style={styles.modal}
    >
      <View style={styles.container}>
        <Image
          style={styles.congratsIcon}
          source={require("../assets/icons/congrats.png")}
        />
        <Text style={styles.title}>Congratulations!</Text>

        <Text style={styles.description}>
          Your account is ready to use. You will be redirected to the Home page
          in a few seconds..
        </Text>

        <Animated.Image
          style={[
            styles.loader,
            { transform: [{ rotate: rotateInterpolation }] },
          ]}
          source={require("../assets/icons/loader.png")}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: width - 88,
    paddingHorizontal: 18,
    paddingTop: 40,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: RFValue(22),
    color: "#212121",
    fontFamily: "Bold",
    marginTop: RFValue(27),
  },
  description: {
    fontSize: RFValue(13),
    fontFamily: "Regular",
    color: "#65666B",
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  iamsureText: {
    marginTop: 24,
    color: "#65666B",
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  congratsIcon: {
    width: RFValue(160),
    height: RFValue(160),
    resizeMode: "contain",
  },
  loader: {
    width: RFValue(50),
    height: RFValue(50),
  },
});

export default RegisterSuccessModal;
