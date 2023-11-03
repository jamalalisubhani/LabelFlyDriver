import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SearchTasks from "../../components/Tasks/SearchTasks";
import FilterSelectableButtons from "../../components/FilterSelectableButtons";
import { FlatList } from "react-native";
import TaskItem from "../../components/Tasks/TaskItem";

import FilterBottomSheet from "../../components/Tasks/FilterBottomSheet";
import BottomSheetModal from "../../components/Tasks/BottomSheetModal";
import { getMyBookings } from "../../utils/auth.service";
import { useSelector } from "react-redux";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const TasksScreen = () => {
  const [selectedButton, setSelectedButton] = useState("all");
  const [search, setSearch] = useState("");
  const [resp, setResp] = useState([]);
  const [data, setdata] = useState([]);
  const focus = useIsFocused();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { user } = useSelector((state) => state.root.user);
  const handleButtonPress = (value) => {
    setSelectedButton(value);
  };
  // console.log("useruseruseruseruseruseruseruseruseruser>>", user.token);
  const buttons = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "Active" },
    { value: "canceled", label: "Canceled" },
    { value: "accepted", label: "Accepted" },
    { value: "requested", label: "Requested" },
  ];

  // const data = [
  //   { id: "1", status: "active" },
  //   { id: "2", status: "completed" },
  //   { id: "3", status: "cancelled" },
  // ];

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };
  useEffect(() => {
    getBookingApi("");
  }, [focus]);

  const getBookingApi = (status) => {
    getMyBookings(status == "" ? "" : `status=${status}`)
      .then((res) => {
        console.log("hkhkhkjhhjhSelectedValuesk>>>>>>", res?.data?.data);
        setdata(res?.data?.data);
      })
      .catch((e) => {
        console.log("heeeeeereeekhkhkjhhSelectedValuesjhk>>>>>>", e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.servicesContainer}>
        <View style={styles.activityHeaderContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/icons/logosmall.png")}
          />
          <Text style={styles.activityText}>Tasks</Text>
        </View>
      </View>

      <SearchTasks
        search={search}
        setSearch={setSearch}
        onpressFilterIcon={openBottomSheet}
      />

      <FilterSelectableButtons
        buttons={buttons}
        selectedButton={selectedButton}
        handleButtonPress={(v) => {
          getBookingApi(`${v}`);

          console.log("handleButtonPresshandleButtonPress", v);
          handleButtonPress(v);
        }}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          contentContainerStyle={{ marginTop: 25 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem item={item} />}
        />
      </ScrollView>

      <BottomSheetModal visible={bottomSheetVisible} onClose={closeBottomSheet}>
        <FilterBottomSheet
          SelectedValues={(re) => {
            console.log(re.status);
            getBookingApi(`${re.status}`);

            // getMyBookings(`status=${re.status}`)
            //   .then((res) => {
            //     console.log("hkhkhkjhhjhSelectedValuesk>>>>>>", res?.data);
            //   })
            //   .catch((e) => {
            //     console.log("heeeeeereeekhkhkjhhSelectedValuesjhk>>>>>>", e);
            //   });
          }}
          onClose={closeBottomSheet}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  servicesContainer: {},
  activityHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(20),
    marginTop: RFValue(64),
  },
  logo: {
    width: RFValue(28),
    height: RFValue(28),
    marginRight: RFValue(14),
  },
  activityText: {
    fontSize: RFValue(21),
    color: "#212121",
    fontFamily: "Bold",
  },
});

export default TasksScreen;
