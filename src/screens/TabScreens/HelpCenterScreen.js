import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../components/HeaderBack";
import HelpSegmentTabBar from "../../components/Profile/HelpSegmentTabBar";
import { RFValue } from "react-native-responsive-fontsize";
import FaqContainer from "../../components/Profile/FaqContainer";
import HomeDropoffInput from "../../components/HomeDropoffInput";
import SearchFaq from "../../components/Profile/SearchFaq";
const { width } = Dimensions.get("window");

const PaymentMethodContainer = ({ name, selected, onPress, icon }) => {
  return (
    <TouchableOpacity style={[styles.paymentMethodContainer]} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Image style={styles.paymentIcon} source={icon} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default function HelpCenterScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["FAQ", "Contact us"];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <View style={styles.container}>
      <HeaderBack title="Help Center" />

      <View style={{ paddingHorizontal: 24, zIndex: -999999 }}>
        <HelpSegmentTabBar
          tabs={tabs}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
      </View>

      {activeTab === 1 && (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 24 }}>
            <PaymentMethodContainer
              icon={require("../../assets/icons/Profile/custmerservice.png")}
              name="Customer Service"
            />
            <PaymentMethodContainer
              icon={require("../../assets/icons/Profile/website.png")}
              name="Website"
            />
            <PaymentMethodContainer
              icon={require("../../assets/icons/Profile/faccbook.png")}
              name="Facebook"
            />
            <PaymentMethodContainer
              icon={require("../../assets/icons/Profile/instagram.png")}
              name="Instagram"
            />
          </View>
        </ScrollView>
      )}

      {activeTab === 0 && (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        >
          <SearchFaq />
          <View style={{ marginTop: 24 }}>
            <FaqContainer
              title="What is Label Fly?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <FaqContainer
              title="How to use Label Fly for drivers ?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />

            <FaqContainer
              title="How do I withdraw my earnings ?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <FaqContainer
              title="Can i cancel a task ?"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    height: 72,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: RFValue(20),
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    marginLeft: 16,
    fontSize: RFValue(15),
    color: "#212121",
    fontFamily: "Bold",
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
