import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { Entypo, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const HomeDropoffInput = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Now");

  const [search, setSearch] = React.useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation = useNavigation();

  const handleSelect = (value) => {
    setSelectedValue(value);
    toggleModal();

    if (value === "Schedule") {
      navigation.navigate("ScheduleScreen");
      setSelectedValue("Now")
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={24} color="#0C4DA2" style={styles.icon} />
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholder="Drop off to ?"
        placeholderTextColor="#BDBDBD"
      />
      <TouchableOpacity style={styles.pickerButton} onPress={toggleModal}>
        <AntDesign name="clockcircle" size={16} color="#212121" />
        <Text style={styles.pickerButtonText}>{selectedValue}</Text>
        <Entypo name="chevron-small-down" size={24} color="#212121" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("Now")}
          >
            <AntDesign name="clockcircle" size={16} color="#212121" />
            <Text style={styles.modalOptionText}>Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("Schedule")}
          >
            <AntDesign name="clockcircle" size={16} color="#212121" />
            <Text style={styles.modalOptionText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginTop: RFValue(64),
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
});

export default HomeDropoffInput;
