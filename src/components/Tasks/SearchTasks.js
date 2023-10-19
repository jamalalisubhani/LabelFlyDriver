import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
const SearchTasks = (props) => {

  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color="#0C4DA2" style={styles.icon} />
      <TextInput
        value={props.search}
        onChangeText={props.setSearch}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#BDBDBD"
      />

      <TouchableOpacity
      onPress={props.onpressFilterIcon}
      >
        <Image
          style={styles.filterIcon}
          source={require("../../assets/icons/filter.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 65,
    width: width - 45,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    marginTop: 24,
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: RFValue(13),
    color: "#000",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 16, 16, 0.08)",
    borderRadius: 6,
    padding: 6,
  },
  pickerButtonText: {
    marginLeft: 8,
    marginRight: 10,
    fontFamily: "SemiBold",
    color: "#35383F",
    fontSize: RFValue(14),
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#888",
  },
  filterIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default SearchTasks;
