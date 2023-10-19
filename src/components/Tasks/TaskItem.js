import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

const WIDTH = Dimensions.get("window").width;

export default function TaskItem({ status }) {
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

  return (
    <View style={styles.itemcontainer}>
      <Image
        style={styles.truckImage}
        source={require("../../assets/icons/Maps/largepackage.png")}
      />

      <View>
        <Text style={styles.title}>From A to Z</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <View
            style={[styles.indicator, { backgroundColor: getStatusColor() }]}
          />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
        <View style={styles.deliveryTageContainer}>
          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>Delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.tagText}>Small package</Text>
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
