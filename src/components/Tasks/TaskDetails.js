import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocation } from "../../utils/Shared/Functions";
import {
  AcceptMyBookings,
  GetLocation,
  PutLocation,
} from "../../utils/auth.service";
import { SocketContext } from "../../utils/SocketProvider";

const TaskDetailsComp = ({ socket, route }) => {
  const [locationapi, setlocationapi] = useState();
  console.log(route?.params?.id);
  setInterval(() => {
    interval();
  }, 30 * 1000);

  useEffect(() => {
    getloc();
  }, []);
  useEffect(() => {
    if (locationapi?.chatRoom) {
      socket.emit("location tracking", locationapi?.chatRoom);
    }
  }, [locationapi?.chatRoom]);
  const interval = async () => {
    let latlog = await getLocation();

    latlog.time = "10 min";
    PutLocation(locationapi?._id, latlog)
      .then((res) => {
        socket.emit("location tracking", locationapi?.chatRoom);
        console.log("resresresres>>>", res);
      })
      .catch(() => {})
      .finally(() => {});

    // AcceptMyBookings(route?.params?.id, {
    //   latitude: 11.453512,
    //   longitude: 24.2946728,
    // })
    //   .then((res) => {
    //     socket.emit("location tracking", route?.params?.id);
    //     console.log("resresresres--->", res?.data);
    //     // socket.emit("location tracking", );
    //     // if (res?.data?.status) {
    //     //   setrefresh(!refresh);
    //     //   if (refreshfunc) refreshfunc();
    //     // }
    //   })
    //   .catch((err) => {
    //     console.log("resresresres--->", err);
    //   })
    //   .finally(() => {});
  };
  const getloc = async () => {
    GetLocation(route?.params?.id)
      .then((res) => {
        setlocationapi(res?.data?.data);
      })
      .catch((e) => {
        console.log("resresresresresresresresres0000000>eee>", e);
      })
      .finally(() => {});
  };

  console.log(
    "getLocationgetLocationgetLocationgetLocationgetLocationgetLocation",
    locationapi?.chatRoom
  );
  return (
    <View>
      <Text>TaskDetails</Text>
    </View>
  );
};
const TaskDetails = (props) => (
  <SocketContext.Consumer>
    {(socket) => <TaskDetailsComp {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default TaskDetails;

const styles = StyleSheet.create({});
