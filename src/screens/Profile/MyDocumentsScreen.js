import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderBack from "../../components/HeaderBack";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";
import Button from "../../components/Button";

export default function MyDocumentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HeaderBack title="My Documents" />
      <View style={{ marginTop: RFValue(24) }}>
        <TouchableOpacity
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
        <Button onPress={() => navigation.navigate("tabs")} title="Update" />
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
