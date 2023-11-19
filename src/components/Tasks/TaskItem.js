import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import {
  Status,
  getAddressFromLocation,
  getLocation,
} from "../../utils/Shared/Functions.js";
import { AcceptMyBookings, getPackageBy_ID } from "../../utils/auth.service.js";
import { useNavigation } from "@react-navigation/native";
const WIDTH = Dimensions.get("window").width;

export default function TaskItem({ item, refreshfunc }) {
  const [dropAddress, setDropAdress] = useState("");
  const [pickAddress, setPickAdress] = useState("");
  const [packagename, setpackagename] = useState("");
  const [refresh, setrefresh] = useState(false);
  const navigation = useNavigation();
  // console.log("itemitemitem", item?.day);
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "#FBBC05";
      case "completed":
        return "#34A853";
      case "cancelled":
        return "#F54336";
      default:
        return "#000000";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return "";
    }
  };
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
      console.log("--------   pickupLocation   ------->", address);
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
        source={require("../../assets/icons/Maps/largepackage.png")}
      />

      <View>
        <View style={{ width: "90%" }}>
          <Text style={styles.title}>
            <Text style={{ color: "red" }}>From</Text> {pickAddress}
            {" \n"}
            <Text style={{ color: "red" }}>To</Text> {dropAddress}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <View
            // style={[styles.indicator, { backgroundColor: getStatusColor() }]}
            style={[styles.indicator, { backgroundColor: "gray" }]}
          />
          {/* <Text style={[styles.statusText, { color: getStatusColor() }]}> */}
          <Text style={[styles.statusText, { color: "black" }]}>
            {Status[item?.status]}
            {/* {getStatusText()} */}
          </Text>
        </View>
        <View style={styles.deliveryTageContainer}>
          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>{item?.day}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>{packagename} package</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.seeDetailButton}>
            <Text style={styles.seeDetailText}>See Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              let latlog = await getLocation();
              console.log("getLocationgetLocation", item?._id, latlog);
              AcceptMyBookings(item?._id, latlog)
                .then((res) => {
                  console.log("resresresres--->", res?.data?.status);
                  if (res?.data?.status) {
                    setrefresh(!refresh);
                    if (refreshfunc) refreshfunc();
                  }
                })
                .catch((err) => {
                  console.log("resresresres--->", err);
                })
                .finally(() => {});
            }}
            style={[styles.seeDetailButton, { marginHorizontal: 5 }]}
          >
            <Text style={styles.seeDetailText}>Accept</Text>
          </TouchableOpacity>
        </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 5,
    marginBottom: 24,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
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
  statusText: {
    fontSize: RFValue(11),
    fontFamily: "Medium",
    color: "#616161",
    marginLeft: 8,
  },
});
