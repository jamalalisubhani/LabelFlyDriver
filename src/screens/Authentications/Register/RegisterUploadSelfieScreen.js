import React, { useState, useRef, useEffect } from "react";
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
  Modal,
  ActivityIndicator,
} from "react-native";
import HeaderRegister from "../../../components/HeaderRegister";
import { Camera } from "expo-camera";

import { RFValue } from "react-native-responsive-fontsize";
import RegisterSuccessModal from "../../../components/RegisterSuccessModal";
import { CircularProgress } from "react-native-circular-progress";
import { photoApi, registerUser } from "../../../utils/auth.service";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../../redux/reducers/generalDataReducer";
import { setUser } from "../../../redux/reducers/userReducer";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

export default function RegisterUploadSelfieScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState(null);

  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [loading, setloading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const [scanStatus, setScanStatus] = useState(
    "Take a selfie to confirm your identity"
  );

  const [scanning, setScanning] = useState(false);
  const { registerdata } = useSelector((state) => state.root.data);
  const dispatch = useDispatch();
  const openModal = async () => {
    setloading(true);
    if (registerdata.photo == "") {
      handleOpenCamera();

      setloading(false);
    } else {
      register(registerdata);
    }
  };

  const handleGetCurrentLocation = async () => {
    // use()
    // requestPermission()
    let { status, requestPermission } =
      await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    await Location.getCurrentPositionAsync({
      accuracy:
        Platform.OS == "android"
          ? Location.Accuracy.Low
          : Location.Accuracy.Lowest,
    })
      .then(async (location) => {
        setLocation({
          latitude: parseFloat(location?.coords?.latitude),
          longitude: parseFloat(location?.coords?.longitude),
        });
      })
      .catch((e) => {});
  };
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);
  console.log("locationlocationlocationlocation", location?.latitude);
  console.log("locationlocationlocationlocation", location?.longitude);
  console.log("locationlocationlocationlocation", {
    coordinates: [location?.latitude, location?.longitude],
  });
  const register = async (val) => {
    let prams = {
      ...registerdata,
      location: {
        coordinates: [location?.latitude, location?.longitude],
      },
    };
    console.log("valvalval>>>--000-registerdataregisterdata-", prams);

    await registerUser(prams)
      .then((val) => {
        console.log("valvalval>>>--000--", val.data);
        dispatch(setUser(val.data));
      })
      .catch((e) => {
        console.log("valvalval>>>--eeeeeeeee--", e);
      })
      .finally(() => {
        setloading(false);
      });
  };
  const handleOpenCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setCameraPermission(status === "granted");
    setOpenCamera(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setCapturedPhoto(photo);
      photoApi(photo)
        .then((res) => {
          console.log("jhkjhjhkjhskhdkjhk", res?.data?.data);

          const copy = { ...registerdata };
          dispatch(
            setRegisterData({
              ...copy,
              photo: res?.data?.data,
            })
          );
        })
        .catch(() => {})
        .finally(() => {});
      setOpenCamera(false);
    }
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
  const handleCancel = () => {
    setOpenCamera(false);
    setCapturedPhoto(null);
  };
  const handleCameraSwitch = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  // console.log("locationlocationlocationlocation", location?.latitude);
  // console.log("locationlocationlocationlocation", location?.longitude);
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
            onPress={handleOpenCamera}
          />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity>
              <Text style={styles.skipText}></Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log("jhkjhjhkjhskhdkjhk", capturedPhoto);

                openModal();
              }}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator
                  style={styles.nextButton}
                  size={"large"}
                  color={"#0C4DA2"}
                />
              ) : (
                <Image
                  style={styles.nextButton}
                  source={require("../../../assets/icons/nextbutton2.png")}
                />
              )}
            </TouchableOpacity>
          </View>
          <Modal visible={openCamera} animationType="slide" transparent={false}>
            {cameraPermission && (
              <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.switchButton}
                  onPress={handleCameraSwitch}
                >
                  <Image
                    source={require("../../../assets/icons/loader.png")}
                    style={styles.switchButtonIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePhoto}
                >
                  <Text style={styles.captureButtonText}>Take Photo</Text>
                </TouchableOpacity>
              </Camera>
            )}
          </Modal>
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
