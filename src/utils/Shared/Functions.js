import * as Location from "expo-location";
import { Platform } from "react-native";

export const getAddressFromLocation = async (latitude, longitude) => {
  try {
    const address = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    return address;
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = async () => {
  console.log("getLocation--->");

  await Location.requestForegroundPermissionsAsync();
  let res = null;
  let x = await Location.getCurrentPositionAsync({
    accuracy:
      Platform.OS == "android"
        ? Location.Accuracy.Low
        : Location.Accuracy.Lowest,
  })
    .then(async (location) => {
      // console.log("locationlocation", location);
      res = {
        latitude: parseFloat(location?.coords?.latitude),
        longitude: parseFloat(location?.coords?.longitude),
      };
    })
    .catch((e) => {
      // console.log("locationlocationeee", e);

      res = null;
    });
  // console.log("first--", res);
  return res;
};
export const Status = {
  accepted: "Accepted",
  requested: "Requested",
  completed: "Completed",
  canceled: "Canceled",
  "in-progress": "In Progress",
};
export const Delivery = {
  today: "Today",
  next: "Next",
  standard: "Standard",
};
