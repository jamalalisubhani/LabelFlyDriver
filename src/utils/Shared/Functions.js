import * as Location from "expo-location";

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
