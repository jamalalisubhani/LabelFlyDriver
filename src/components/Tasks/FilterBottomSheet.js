import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import FilterSelectableButtons from "../FilterSelectableButtons";

const { width } = Dimensions.get("window");
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.73;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.72;
const MAX_UPWARD_TRANSLATE_Y = 0;
const MAX_DOWNWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MAX_HEIGHT - BOTTOM_SHEET_MIN_HEIGHT; // positive number
const DRAG_THRESHOLD = 50;

const FilterBottomSheet = (props) => {
  const [selectedButtonStatus, setSelectedButtonStatus] = useState("all");
  const handleButtonPressStatus = (value) => {
    setSelectedButtonStatus(value);
  };

  const [selectedButtonDate, setSelectedButtonDate] = useState("all");
  const handleButtonPressDate = (value) => {
    setSelectedButtonDate(value);
  };

  const [selectedButtonType, setSelectedButtonType] = useState("delivery");
  const handleButtonPressType = (value) => {
    setSelectedButtonType(value);
  };

  const buttons = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "Active" },
    { value: "canceled", label: "Canceled" },
    { value: "accepted", label: "Accepted" },
    { value: "requested", label: "Requested" },
  ];
  const buttonsDate = [
    { value: "all", label: "All" },
    { value: "this week", label: "This week" },
    { value: "this month", label: "This month" },
    { value: "this year", label: "This year" },
  ];
  const buttonsType = [
    { value: "pick up", label: "Pick-up" },
    { value: "delivery", label: "Delivery" },
  ];

  const onPressReset = () => {
    setSelectedButtonStatus("all");
    setSelectedButtonDate("all");
    setSelectedButtonType("pick up");
  };

  const animatedValue = useRef(
    new Animated.Value(MAX_DOWNWARD_TRANSLATE_Y)
  ).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation("up");
          } else {
            springAnimation("down");
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation("down");
          } else {
            springAnimation("up");
          }
        }
      },
    })
  ).current;

  const springAnimation = (direction) => {
    lastGestureDy.current =
      direction === "down" ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} />
      </View>

      <View>
        <Text style={styles.sortFilterText}>Sort & Filter</Text>

        <View style={styles.seprator} />
      </View>

      <View>
        <Text style={styles.statusText}>Status</Text>
        <FilterSelectableButtons
          buttons={buttons}
          selectedButton={selectedButtonStatus}
          handleButtonPress={handleButtonPressStatus}
        />
      </View>

      <View>
        <Text style={styles.statusText}>Date</Text>
        <FilterSelectableButtons
          buttons={buttonsDate}
          selectedButton={selectedButtonDate}
          handleButtonPress={handleButtonPressDate}
        />
      </View>

      <View>
        <Text style={styles.statusText}>Type</Text>
        <FilterSelectableButtons
          buttons={buttonsType}
          selectedButton={selectedButtonType}
          handleButtonPress={handleButtonPressType}
        />
      </View>
      <View style={styles.seprator} />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={onPressReset}
          style={{ ...styles.footerButton, backgroundColor: "#E7E7E7" }}
        >
          <Text style={{ ...styles.btnText, color: "#35383F" }}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.SelectedValues({
              status: selectedButtonStatus,
              // date: selectedButtonDate,
              // type: selectedButtonType,
            });
            props.onClose();
          }}
          style={styles.footerButton}
        >
          <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    width: "100%",
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: 0,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#a8bed2",
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: "white",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    alignItems: "center",
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    marginTop: 8,
  },
  closeButton: {
    backgroundColor: "#FFF",
    paddingVertical: 16,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF0000",
  },
  sortFilterText: {
    color: "#212121",
    fontFamily: "Bold",
    fontSize: RFValue(21),
    textAlign: "center",
  },
  seprator: {
    width: Dimensions.get("window").width - 48,
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 24,
    alignSelf: "center",
  },
  statusText: {
    color: "#212121",
    fontFamily: "Bold",
    fontSize: RFValue(16),
    marginLeft: 24,
    marginTop: 24,
  },
  btnContainer: {
    backgroundColor: "#fff",
    width: width,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 40,
  },
  footerButton: {
    width: width / 2.3,
    height: RFValue(50),
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0C4DA2",
    paddingHorizontal: 16,
  },
  btnText: {
    fontSize: RFValue(14),
    fontFamily: "Bold",
    color: "#fff",
  },
});

export default FilterBottomSheet;
