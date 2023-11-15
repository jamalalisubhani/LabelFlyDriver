import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Switch,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native";
import HomeTaskItem from "../../components/HomeTaskItem";
import { useSelector } from "react-redux";
import { getBookingRequests } from "../../utils/auth.service";

export default function HomeScreen() {
  // const { user } = useSelector((state) => state.root.user);
  // console.log("useruseruseruser", user?.data?.data);
  const navigation = useNavigation();
  const [search, setSearch] = React.useState(true);
  const [data, setdata] = React.useState([]);
  const [switcha, setSwictha] = React.useState(true);
  useEffect(() => {
    getBookingRequests()
      .then((res) => {
        console.log("HOME ------->>>> Request   ----", res?.data?.data);
        if (res?.data?.data) {
          setdata(res?.data?.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const WIDTH = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 25.2048,
          longitude: 55.2708,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      ></MapView>
      <View>
        <View style={styles.mapSearchContainerTop}>
          <View style={styles.inputcontainer}>
            <Feather
              name="search"
              size={24}
              color="#0C4DA2"
              style={styles.icon}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={styles.input}
              placeholder="Search..."
            />
          </View>
          <Switch
            value={switcha}
            trackColor={{ false: "#EEEEEE", true: "#34A853" }}
            thumbColor={switcha ? "#fff" : "#fff"}
            onValueChange={(value) => setSwictha(value)}
          />
        </View>
      </View>

      <Image
        style={styles.graphCircle}
        source={require("../../assets/icons/driverloadinghome.png")}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            zIndex: 9999,
            position: "absolute",
            // height: 200,
            // backgroundColor: "red",
            width: WIDTH,
            bottom: 10,
          }}
          // bounces={false}
          scrollEnabled={true}
          nestedScrollEnabled
          horizontal
          data={data}
          renderItem={({ item }) => {
            return <HomeTaskItem item={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 65,
    width: "70%",
    borderRadius: 12,
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  mapSearchContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: RFValue(64),
  },
  graphCircle: {
    width: RFValue(310),
    height: RFValue(220),
    marginTop: 15,
    resizeMode: "contain",
    marginRight: 20,
    alignSelf: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    // bottom: RFValue(200),
  },
});
