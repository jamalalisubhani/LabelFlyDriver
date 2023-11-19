import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import { Delivery, getAddressFromLocation } from "../utils/Shared/Functions";
import { getPackageBy_ID } from "../utils/auth.service";

const WIDTH = Dimensions.get("window").width;

export default function HomeTaskItem({ item }) {
  const [dropAddress, setDropAdress] = useState("");
  const [pickAddress, setPickAdress] = useState("");
  const [packagename, setpackagename] = useState("");

  useEffect(() => {
    Calculations();
  }, []);
  const Calculations = () => {
    getPackageBy_ID(item?.packageId).then((res) => {
      // console.log(
      //   "packageIdpackageIdpackageIdpackageId>>",
      //   res?.data?.data?.packages
      // );
      if (res?.data?.data) {
        setpackagename(res?.data?.data?.packages);
      }
    });

    getAddressFromLocation(
      item?.dropoffLocation?.coordinates[0],
      item?.dropoffLocation?.coordinates[1]
    ).then((address) => {
      // console.log("--------   dropoffLocation  ------->", address);
      setDropAdress(
        `${!!address[0]?.name ? address[0]?.name : ""}, ${
          !!address[0]?.country ? address[0]?.country : ""
        }`
      );
    });
    getAddressFromLocation(
      item?.pickupLocation?.coordinates[0],
      item?.pickupLocation?.coordinates[1]
    ).then((address) => {
      // console.log("--------   pickupLocation   ------->", address);
      setPickAdress(
        `${!!address[0]?.name ? address[0]?.name : ""}, ${
          !!address[0]?.country ? address[0]?.country : ""
        }`
      );
    });
  };

  return (
    <View style={styles.itemcontainer}>
      <Image
        style={styles.truckImage}
        source={require("../assets/icons/Maps/largepackage.png")}
      />

      <View>
        <View style={{ width: "85%" }}>
          <Text style={styles.title}>
            <Text style={{ color: "red" }}>From</Text> {pickAddress}
            {" \n"}
            <Text style={{ color: "red" }}>To</Text> {dropAddress}
          </Text>
        </View>

        <View style={styles.deliveryTageContainer}>
          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>{Delivery[item?.day]}</Text>
            {/* <Text style={styles.tagText}>Delivery</Text> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>{packagename} package</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.seeDetailButton}>
          <Text style={styles.seeDetailText}>See Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemcontainer: {
    width: WIDTH - 48,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    // position: "absolute",
    // bottom: 30,
    marginHorizontal: 15,
    // mar,
  },
  truckImage: {
    width: 73,
    height: 73,
    marginRight: 16,
  },
  title: {
    color: "#212121",
    fontSize: RFValue(16),
    fontFamily: "Bold",
  },
  deliveryTageContainer: {
    flexDirection: "row",
    marginTop: 14,
  },
  tagContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(16, 16, 16, 0.08)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tagText: {
    color: "#35383F",
    fontFamily: "SemiBold",
    fontSize: RFValue(9),
  },
  seeDetailButton: {
    width: 104,
    height: 32,
    backgroundColor: "#0C4DA2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  seeDetailText: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "SemiBold",
  },
});
