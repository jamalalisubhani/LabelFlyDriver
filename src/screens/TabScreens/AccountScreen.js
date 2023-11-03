import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import ProfileItem from "../../components/Profile/ProfileItem";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";
import { myRatingsApi } from "../../utils/auth.service";
const { width } = Dimensions.get("window").width;

export default function AccountScreen({ navigation }) {
  const { user } = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const [rating, setRating] = useState({ averageRating: 0, totalReviews: 0 });
  console.log("useruseruseruseruser", user.token);
  useEffect(() => {
    myRatingsApi()
      .then((res) => {
        console.log("resresresresres   res", res?.data?.data);
        if (res?.data?.data) {
          setRating(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log("errerrerrerrerrerr", err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.activityHeaderContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/icons/logosmall.png")}
          />

          <Text style={styles.activityText}>Account</Text>
        </View>

        <View style={styles.profileDetailsContainer}>
          <TouchableOpacity activeOpacity={0.8}>
            <ImageBackground
              style={styles.profileImage}
              source={require("../../assets/icons/Activity/activityprofile.png")}
            >
              <Image
                style={styles.editIcon}
                source={require("../../assets/icons/Profile/editaccount.png")}
              />
            </ImageBackground>
          </TouchableOpacity>

          <Text style={styles.fullNameText}>{user?.data?.name}</Text>
          <View style={styles.driverRatingsContainer}>
            <Image
              style={styles.halfStar}
              source={require("../../assets/icons/Profile/halfstar.png")}
            />

            <Text style={styles.ratingsText}>
              {rating.averageRating} ({rating?.totalReviews} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.seprator} />

        <View style={styles.profileItemMainContainer}>
          <ProfileItem
            icon={require("../../assets/icons/Profile/accountdetails.png")}
            title="Account Details"
            onPress={() => navigation.navigate("AccountDetailScreen")}
          />
          <ProfileItem
            icon={require("../../assets/icons/Profile/vehicleinfoIcon.png")}
            title="Vehicle Information"
            onPress={() => navigation.navigate("VehicleInformationScreen")}
          />
          <ProfileItem
            icon={require("../../assets/icons/Profile/documents.png")}
            title="My Documents"
            onPress={() => navigation.navigate("MyDocumentsScreen")}
          />

          <ProfileItem
            icon={require("../../assets/icons/Profile/language.png")}
            title="Language"
            subtitle="English (US)"
            onPress={() => navigation.navigate("LanguageSelectionScreen")}
          />

          <ProfileItem
            icon={require("../../assets/icons/Profile/notification.png")}
            title="Notification Settings"
            onPress={() => navigation.navigate("NotificationScreen")}
          />
          <ProfileItem
            icon={require("../../assets/icons/Profile/helpcenter.png")}
            title="Help Center"
            onPress={() => navigation.navigate("HelpCenterScreen")}
          />
          <ProfileItem
            icon={require("../../assets/icons/Profile/privacypolicy.png")}
            title="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
          />
          <ProfileItem
            icon={require("../../assets/icons/Profile/logout.png")}
            title="Logout"
            onPress={() => {
              dispatch(setUser(null));

              // navigation.navigate("LoginScreen")
            }}
            isLastItem
          />
        </View>
      </ScrollView>
    </View>
  );
}
<TouchableOpacity style={{ position: "absolute", top: "50%", zIndex: 10000 }}>
  <Text>kjhkhkjh</Text>
</TouchableOpacity>;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  activityHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(20),
    marginTop: RFValue(54),
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
  profileImage: {
    width: RFValue(100),
    height: RFValue(100),
    alignSelf: "center",
  },
  editIcon: {
    width: RFValue(24),
    height: RFValue(24),
    position: "absolute",
    zIndex: 9999,
    bottom: 0,
    right: 2,
  },
  profileDetailsContainer: {
    marginTop: RFValue(22),
  },
  fullNameText: {
    color: "#212121",
    fontSize: RFValue(20),
    fontFamily: "Bold",
    textAlign: "center",
    marginTop: 12,
  },
  profileNumber: {
    color: "#212121",
    fontSize: RFValue(12),
    fontFamily: "Bold",
    textAlign: "center",
    marginTop: 4,
  },
  seprator: {
    width: width,
    height: 8,
    backgroundColor: "#F5F5F5",
    marginTop: RFValue(20),
  },
  profileItemMainContainer: {
    marginTop: RFValue(22),
  },
  halfStar: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  driverRatingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  ratingsText: {
    color: "#424242",
    fontFamily: "Medium",
    fontSize: RFValue(12),
  },
});
