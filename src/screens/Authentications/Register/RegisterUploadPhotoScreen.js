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
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import HeaderRegister from "../../../components/HeaderRegister";
import { RFValue } from "react-native-responsive-fontsize";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
const { width } = Dimensions.get("window");

import RegisterSuccessModal from "../../../components/RegisterSuccessModal";
export default function RegisterUploadPhotoScreen({navigation}) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
 
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOpenCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setCameraPermission(status === "granted");
    setOpenCamera(true);
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setCapturedPhoto(photo);
      setOpenCamera(false);
    }
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

  //    from files

  const [image, setImage] = useState("");

  const handleSelectFile = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // if (!permissionResult.granted) {
      //   alert('Permission to access media library is required!');
      //   return;
      // }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setImage(pickerResult.assets[0].uri);
      }
    } catch (error) {
      console.log("Error while selecting file:", error);
    }
  };

  const CustomButton = ({ imageSource, text, onPress }) => {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.socialtext}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const handleNext = () => {

  openModal()
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/images/registerback.png")}
    >
      <HeaderRegister progress={0.5} />

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

            <Text style={styles.whatsYourName}>
            Take a photo of your{"\n"}driver license
            </Text>
          </View>

          {!image && (
            <TouchableOpacity
              style={styles.selectFileContainer}
              // onPress={handleSelectFile}
            >
              <Image
                style={styles.selectFileImage}
                source={require("../../../assets/images/selectfileImage.png")}
              />
            </TouchableOpacity>
          )}
          {/*             
            {capturedPhoto && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedPhoto.uri }} style={styles.previewImage} />
        </View>
      )}
        */}

          {image && (
            <TouchableOpacity
              style={styles.selectFileContainer}
              onPress={handleSelectFile}
            >
              <Image
                style={styles.selectFileImageSelected}
                source={{ uri: image }}
              />
            </TouchableOpacity>
          )}

          <View style={styles.orcontainer}>
            <View style={styles.line} />
            <Text style={styles.text}>or</Text>
            <View style={styles.line} />
          </View>

          <CustomButton
            imageSource={require("../../../assets/icons/Camera.png")}
            text="Open Camera & Take Photo"
            //   onPress={handleOpenCamera}
          />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
           
            >
              <Text style={styles.skipText}></Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('RegisterUploadInsurencePhotoScreen')}>
              <Image
                style={styles.nextButton}
                source={require("../../../assets/icons/nextbutton2.png")}
              />
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
          <RegisterSuccessModal isVisible={modalVisible} closeModal={closeModal} />
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
    fontSize: RFValue(27),
    color: "#212121",
    fontFamily: "Bold",
    marginLeft: RFValue(20),
    lineHeight: 42,
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
    width: width - 48,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: RFValue(9),
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
    marginHorizontal: 16,
    fontSize: RFValue(16),
    color: "#616161",
  },
  buttonContainer: {
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

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialtext: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#0C4DA2",
  },
  selectFileImage: {
    width: width - 48,
    height: 200,
    resizeMode: "contain",
  },
  selectFileImageSelected: {
    width: width - 48,
    height: 200,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#0C4DA2",
  },
});
