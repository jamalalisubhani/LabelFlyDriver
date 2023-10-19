import React, { useState } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;

const ExpiryDatePicker = (props) => {
  return (
    <TouchableOpacity
      onPress={props.showDatePicker}
      style={styles.expiryDateContainer}
    >
      <View>
        <Text style={styles.expirayDateText}>
          {props.selectedDate
            ? props.selectedDate.toLocaleString("default", {
                month: "2-digit",
                year: "2-digit",
              })
            : "DD/MM/YY"}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={props.isDatePickerVisible}
        mode="date"
        onConfirm={props.handleConfirm}
        onCancel={props.handleCancel}
        modalTransparent={true}
        textColor="#00ADEF"
        useNativeDriver={true}
        pickerContainerStyleIOS={{ backgroundColor: "#fff", height: 300 }}
      />

      <Image
        style={styles.expiryIcon}
        source={require("../../assets/icons/Profile/expirayIcon.png")}
      />
    </TouchableOpacity>
  );
};

export default ExpiryDatePicker;

const styles = StyleSheet.create({
  expiryDateContainer: {
    width: WIDTH / 2.4,
    height: 56,
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderColor: "#B3D2F9",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    flexDirection: "row",
  },
  expirayDateText: {
    fontSize: RFValue(12),
    fontFamily: "SemiBold",
    color: "#212121",
  },
  expiryIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
