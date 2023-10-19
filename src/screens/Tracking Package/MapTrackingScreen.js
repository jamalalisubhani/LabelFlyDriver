import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DriverTrackingSheet from "../../components/Tracking/DriverTrackingSheet";
import BikeImage from "../../assets/icons/Tracking/mapbike.png";
import { Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 25.2048; // Dubai Mall latitude
const LONGITUDE = 55.2708; // Dubai Mall longitude
const LATITUDE_DELTA = 0.07;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CustomMarker = ({ title }) => {
  return (
    <View style={styles.customMarkerContainer}>
      <View style={styles.customMarker}>
        <Text style={styles.customMarkerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const MapTrackingScreen = () => {
  const [activeContainer, setActiveContainer] = useState("");
  const navigation = useNavigation();
  const handleContainerPress = (value) => {
    setActiveContainer(value);
  };

  const handleNextScreen = () => {
    if (activeContainer !== "") {
      navigation.navigate("SchedulePickupScreen");
    }
  };

  const addressLatitude = 25.2201;
  const addressLongitude = 55.2563;

  // Destination (Dubai Mall) coordinates
  const destinationLatitude = 25.2048;
  const destinationLongitude = 55.2708;

  // Delivery route coordinates
  const routeCoordinates = [
    { latitude: addressLatitude, longitude: addressLongitude },
    { latitude: 25.195, longitude: 55.2669 }, // Custom coordinate along the road
    { latitude: destinationLatitude, longitude: destinationLongitude },
  ];

  // Splitting the coordinates for two polylines
  const polyline1 = routeCoordinates.slice(0, 2);
  const polyline2 = routeCoordinates.slice(1, 3);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* Destination Marker with Custom View Label */}
        <Marker
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          tracksViewChanges={false} // Disable view change tracking for smooth rendering
        >
          <CustomMarker title="Dubai Mall : 10 Min" />
        </Marker>

        {/* Your Address Marker with Custom View Label */}
        <Marker
          coordinate={{
            latitude: addressLatitude,
            longitude: addressLongitude,
          }}
          tracksViewChanges={false} // Disable view change tracking for smooth rendering
        >
          <CustomMarker title="Your Address" />
        </Marker>

        {/* First Polyline */}
        <Polyline
          coordinates={polyline1}
          strokeWidth={8}
          strokeColor="#101010"
          geodesic
        />

        {/* Second Polyline */}
        <Polyline
          coordinates={polyline2}
          strokeWidth={8}
          strokeColor="#9E9E9E"
          geodesic
        />

        {/* Bike Marker */}
        <Marker
          coordinate={{
            latitude: addressLatitude,
            longitude: addressLongitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <Image source={BikeImage} style={styles.bikeMarkerImage} />
        </Marker>
      </MapView>

      <DriverTrackingSheet
        handleNextScreen={handleNextScreen}
        handleContainerPress={handleContainerPress}
        setActiveContainer={setActiveContainer}
        activeContainer={activeContainer}
      />

      <View style={styles.backicon}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back-circle"
          size={35}
          color="#0C4DA2"
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity 
        onPress={()=>navigation.navigate('DriverChatScreen')}
        style={styles.footerButton}>
          <Image
            style={styles.btnIcon}
            source={require("../../assets/icons/Tracking/chatdriver.png")}
          />
          <Text style={styles.btnText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Image
            style={styles.btnIcon}
            source={require("../../assets/icons/Tracking/calldriver.png")}
          />
          <Text style={styles.btnText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerButton: {
    width: width / 2.3,
    height: RFValue(50),
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0C4DA2",
    paddingHorizontal: 16,
  },
  btnIcon: {
    width: 16,
    height: 16,
    marginRight: RFValue(40),
  },
  btnText: {
    fontSize: RFValue(14),
    fontFamily: "Bold",
    color: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    bottom: RFValue(200),
  },
  customMarkerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  customMarker: {
    backgroundColor: "#0C4DA2",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 24,
  },
  customMarkerTitle: {
    color: "white",
    fontFamily: "Regular",
    fontSize: RFValue(12),
  },
  backicon: {
    zIndex: 99999,
    position: "absolute",
    marginTop: RFValue(50),
    marginLeft: RFValue(20),
  },
  btnContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    width: width,
    height: Platform.OS==='android' ? RFValue(70):RFValue(80),
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  bikeMarkerImage: {
    width: 40,
    height: 40,
  },
});

export default MapTrackingScreen;
