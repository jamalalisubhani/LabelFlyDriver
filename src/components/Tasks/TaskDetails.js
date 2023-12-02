import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocation } from "../../utils/Shared/Functions";
import {
  AcceptMyBookings,
  GetLocation,
  PutLocation,
} from "../../utils/auth.service";
import { SocketContext } from "../../utils/SocketProvider";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TaskDetailsComp = ({ socket, route, navigation }) => {
  const [locationapi, setlocationapi] = useState();
  const [update, setupdate] = useState(false);

  console.log(route?.params?.id);
  useEffect(() => {
    interval();
    setInterval(() => {
      interval();
    }, 30 * 1000);
  }, []);

  useEffect(() => {
    if (locationapi?.chatRoom) {
      socket.emit("location tracking", locationapi?.chatRoom);
    }
  }, [locationapi?.chatRoom]);
  const interval = async () => {
    // setupdate(true);
    let latlog = await getLocation();

    latlog.time = "10 min";
    PutLocation(route?.params?.id, latlog)
      .then((res) => {
        socket.emit("location tracking", locationapi?.chatRoom);
        console.log("resresresres>>>-------->>>>>", res?.data);
      })
      .catch(() => {})
      .finally(() => {
        setTimeout(() => {
          // setupdate(false);
        }, 200);
      });

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
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          top: insets.top + 20,

          left: 20,
        }}
      >
        <Text>{"< back"}</Text>
      </TouchableOpacity>
      <View style={{ height: 70 }}>
        <WaveIndicator />
      </View>

      <Text>Updating your location every 30 Sec</Text>
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
