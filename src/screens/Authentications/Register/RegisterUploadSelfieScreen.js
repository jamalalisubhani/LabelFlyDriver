import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import HeaderRegister from "../../../components/HeaderRegister";
import { RFValue } from "react-native-responsive-fontsize";
import RegisterSuccessModal from "../../../components/RegisterSuccessModal";
import { CircularProgress } from "react-native-circular-progress";

const { width } = Dimensions.get("window");

export default function RegisterUploadSelfieScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scanStatus, setScanStatus] = useState(
    "Take a selfie to confirm your identity"
  );
  const [scanning, setScanning] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectFile = () => {
    setProgress(0);
    setScanStatus("Scanning...");
    setScanning(true);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setScanStatus("Scanning Completed");
          setScanning(false);

          // openModal();
        }
        return prevProgress + 1;
      });
    }, 20);

    setSelectedImage(
      require("../../../assets/icons/Activity/activityprofile.png")
    );
  };

  const CustomButton = ({ imageSource, text, onPress }) => {
    return (
      <TouchableOpacity
        style={styles.opencamerabuttonContainer}
        onPress={onPress}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.socialtext}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/registerback.png")}
    >
      <HeaderRegister progress={1.0} />

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(-150)}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.whatsYourNameContainer}>
            <Image
              style={styles.nameIcon}
              source={require("../../../assets/icons/photo.png")}
            />

            <Text style={styles.whatsYourName}>{scanStatus}</Text>
          </View>

          <TouchableOpacity
            style={styles.selectFileContainer}
            onPress={handleSelectFile}
          >
            {selectedImage ? (
              <View style={styles.selectFileImageContainer}>
                <ImageBackground
                  style={styles.selectFileImage}
                  source={selectedImage}
                >
                  {scanning && (
                    <CircularProgress
                      size={RFValue(160)}
                      width={4}
                      fill={progress}
                      tintColor="#0c4da2"
                      backgroundColor="#fff"
                      style={StyleSheet.absoluteFill}
                    />
                  )}
                  {scanStatus === "Scanning Completed" && (
                    <CircularProgress
                      size={RFValue(160)}
                      width={4}
                      fill={progress}
                      tintColor="#0c4da2"
                      backgroundColor="#fff"
                      style={StyleSheet.absoluteFill}
                    />
                  )}

                  {scanStatus === "Scanning Completed" && (
                    <Image
                      style={{ width: 65, height: 54 }}
                      source={require("../../../assets/icons/checkblue.png")}
                    />
                  )}
                </ImageBackground>
              </View>
            ) : (
              <Image
                style={styles.selectFileImage}
                source={require("../../../assets/icons/selfiephotoempty.png")}
              />
            )}
          </TouchableOpacity>

          <View style={styles.orcontainer}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>
          <CustomButton
            imageSource={require("../../../assets/icons/Camera.png")}
            text="Open Camera & Take Photo"
            // onPress={handleOpenCamera}
          />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity>
              <Text style={styles.skipText}></Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openModal}
              activeOpacity={0.8}>
              <Image
                style={styles.nextButton}
                source={require("../../../assets/icons/nextbutton2.png")}
              />
            </TouchableOpacity>
          </View>

          <RegisterSuccessModal
            isVisible={modalVisible}
            closeModal={closeModal}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nameIcon: {
    width: RFValue(28),
    height: RFValue(28),
    resizeMode: "contain",
    marginLeft: RFValue(20),
    marginBottom: RFValue(12),
  },
  whatsYourName: {
    fontSize: RFValue(25),
    color: "#212121",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
    lineHeight: 42,
    textAlign: "center",
  },
  fullNameText: {
    fontSize: RFValue(14),
    color: "#212121",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
    marginBottom: 8,
  },
  whatsYourNameContainer: {
    marginTop: RFValue(22),
  },
  nextButton: {
    width: RFValue(85),
    height: RFValue(125),
    resizeMode: "contain",
  },
  nextButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 150,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: RFValue(20),
  },
  selectFileContainer: {
    alignSelf: "center",
    marginTop: RFValue(9),
    borderRadius: RFValue(90),
    overflow: "hidden",
  },
  selectFileImageContainer: {
    position: "relative",
  },
  selectFileImage: {
    width: RFValue(160),
    height: RFValue(160),
    resizeMode: "cover",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  orcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(27),
  },
  line: {
    width: "38%",
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  text: {
    fontFamily: "Medium",
    fontSize: RFValue(12),
    color: "#7F7F7F",
    marginHorizontal: RFValue(15),
  },
  opencamerabuttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFValue(17),
  },
  image: {
    width: RFValue(24),
    height: RFValue(24),
    resizeMode: "contain",
    marginRight: RFValue(15),
  },
  socialtext: {
    fontFamily: "Medium",
    fontSize: RFValue(14),
    color: "#212121",
  },
  skipText: {
    fontFamily: "Medium",
    fontSize: RFValue(14),
    color: "#7F7F7F",
  },
  opencamerabuttonContainer: {
    width: "90%",
    height: RFValue(52),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3EEFD",
    borderRadius: 16,
    alignSelf: "center",
    marginTop: RFValue(27),
  },
});
