import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../components/HeaderBack";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import {
  driverLicense,
  insuranceVehicle,
  registrationVehicle,
  updateDriverField,
} from "../../utils/auth.service";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

export default function MyDocumentsScreen({ navigation }) {
  const { user } = useSelector((state) => state.root.user);
  // console.log("----  vehicle_insurance", user?.data?.driver?.vehicle_insurance);
  const [showerr, setshowerr] = useState(false);
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState("");
  const [drivelicence, setdrivelicence] = useState(
    user?.data?.driver?.license ? user?.data?.driver?.license : ""
  );
  const [insure, setinsure] = useState(
    user?.data?.driver?.license ? user?.data?.driver?.vehicle_insurance : ""
  );
  const [registration, setregistration] = useState(
    user?.data?.driver?.license ? user?.data?.driver?.registration : ""
  );

  const handleSelectFile = async (valuescheck) => {
    setloading(true);
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        console.log("-0-0-0-0-00->>>", pickerResult.assets[0]);
        setshowerr(false);
        setImage(pickerResult.assets[0]);
        if (valuescheck == "licence") {
          driverLicense(pickerResult.assets[0])
            .then((res) => {
              console.log(
                "setdrivelicencesetdrivelicence>>>>",
                res?.data?.data
              );
              setdrivelicence(res?.data?.data);
            })
            .catch((e) => {
              console.log("lkjljljlkjjjeeeeee>>", e);
            })
            .finally(() => {
              setloading(false);
            });
        } else if (valuescheck == "registration") {
          console.log("registrationregistration>>>");
          registrationVehicle(pickerResult.assets[0])
            .then((res) => {
              console.log(
                "setregistrationsetregistration>>>>",
                res?.data?.data
              );
              setregistration(res?.data?.data);
            })
            .catch((e) => {
              console.log("lkjljljlkjjjeeeeee>>", e);
            })
            .finally(() => {
              setloading(false);
            });
        } else if (valuescheck == "Insurence") {
          console.log("InsurenceInsurenceInsurence>>>");
          insuranceVehicle(pickerResult.assets[0])
            .then((res) => {
              console.log("InsurenceInsurenceInsurence>>>>", res?.data?.data);
              setinsure(res?.data?.data);
            })
            .catch((e) => {
              console.log("lkjljljlkjjjeeeeee>>", e);
            })
            .finally(() => {
              setloading(false);
            });
        }
      }
    } catch (error) {
      setshowerr(false);

      console.log("Error while selecting file:", error);
    }
  };
  const updateDriver = () => {
    let params;
    if (registration == "") {
      params = {
        driver: {
          license: drivelicence,
          insurance: insure,
          registration: registration,
        },
      };
    } else {
      params = {
        driver: {
          license: drivelicence,
          insurance: insure,
        },
      };
    }
    let copyuser = Object.assign({ ...user });
    // let o = {
    //   ...copyuser,
    //   data: {
    //     ...copyuser?.data,
    //     driver: params?.driver,
    //   },
    // };
    console.log("----  USER---", params);

    updateDriverField(params, user?.data?._id)
      .then((res) => {
        console.log("-=-=-=->>>resres>", res);
      })
      .catch((e) => {
        console.log("-=-=-eerrerere=->>>>", e);
      })
      .finally(() => {});
  };
  // console.log(
  //   "-=-=-=----------->",
  //   insure,
  //   "\n",
  //   registration,
  //   "\n",
  //   drivelicence
  // );
  // console.log("uuuuu --", user?.data.driver);

  return (
    <View style={styles.container}>
      <HeaderBack title="My Documents" />
      <View style={{ marginTop: RFValue(24) }}>
        <TouchableOpacity
          onPress={() => {
            handleSelectFile("licence");
          }}
          activeOpacity={0.5}
          style={styles.mainAddressContainer}
        >
          <View style={styles.cardLeftContainer}>
            <Image
              style={styles.mainIcon}
              source={require("../../assets/icons/Profile/mydocumentjpg.png")}
            />

            <View>
              <View style={styles.mainAddressDefaultContainer}>
                <Text style={styles.mainAddrestext}>Driver License</Text>
              </View>

              <Text style={styles.actualAddressText}>11/01/2022</Text>
            </View>
          </View>

          <Image
            style={styles.editAddressIcon}
            source={require("../../assets/icons/Profile/editAddress.png")}
          />
        </TouchableOpacity>

        {/* Registartion */}
        <TouchableOpacity
          onPress={() => {
            handleSelectFile("registration");
          }}
          activeOpacity={0.5}
          style={styles.mainAddressContainer}
        >
          <View style={styles.cardLeftContainer}>
            <Image
              style={styles.mainIcon}
              source={require("../../assets/icons/Profile/mydocumentjpg.png")}
            />

            <View>
              <View style={styles.mainAddressDefaultContainer}>
                <Text style={styles.mainAddrestext}>Registartion</Text>
              </View>

              <Text style={styles.actualAddressText}>11/01/2022</Text>
            </View>
          </View>

          <Image
            style={styles.editAddressIcon}
            source={require("../../assets/icons/Profile/editAddress.png")}
          />
        </TouchableOpacity>

        {/* Insurence */}
        <TouchableOpacity
          onPress={() => {
            handleSelectFile("Insurence");
          }}
          activeOpacity={0.5}
          style={styles.mainAddressContainer}
        >
          <View style={styles.cardLeftContainer}>
            <Image
              style={styles.mainIcon}
              source={require("../../assets/icons/Profile/mydocumentjpg.png")}
            />

            <View>
              <View style={styles.mainAddressDefaultContainer}>
                <Text style={styles.mainAddrestext}>Insurence</Text>
              </View>

              <Text style={styles.actualAddressText}>11/01/2022</Text>
            </View>
          </View>

          <Image
            style={styles.editAddressIcon}
            source={require("../../assets/icons/Profile/editAddress.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footerButtonContainer}>
        <Button
          onPress={() => {
            updateDriver();
            // navigation.navigate("tabs")
          }}
          title="Update"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    height: 102,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: 20,
    marginBottom: RFValue(22),
  },
  mainIcon: {
    width: 52,
    height: 62,
    marginRight: 16,
    resizeMode: "contain",
  },
  mainAddressDefaultContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainAddrestext: {
    color: "#212121",
    fontSize: RFValue(15),
    fontFamily: "Bold",
    marginRight: 8,
  },
  defaultContainer: {
    width: 50,
    height: 20,
    borderRadius: 6,
    backgroundColor: "rgba(16, 16, 16, 0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    fontSize: 10,
    color: "#35383F",
    fontFamily: "SemiBold",
  },
  actualAddressText: {
    color: "#616161",
    fontSize: RFValue(12),
    fontFamily: "Medium",
    marginTop: 8,
  },
  cardLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editAddressIcon: {
    width: 24,
    height: 24,
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? RFValue(30) : RFValue(30),
    left: 0,
    right: 0,
    paddingHorizontal: RFValue(20),
  },
});
