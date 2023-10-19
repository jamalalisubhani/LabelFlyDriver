import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Switch,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import HeaderBack from "../../components/HeaderBack";
const WIDTH = Dimensions.get("window").width;
export default function NotificationScreen({ navigation }) {
  const [pasuseall, setPauseAll] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [credits, setCredits] = React.useState(true);
  const [reminders, setreminder] = React.useState(true);
  const [feedback, setFeedback] = React.useState(false);
  const [subscription, setSubscription] = React.useState(true);
  const [conatacts, setConatacts] = React.useState(true);

  const [pasuseallEmail, setPauseAllEMail] = React.useState(false);
  const [pasuseallSms, setPauseAllSms] = React.useState(false);

  return (
    <View style={styles.container}>
      <HeaderBack title="Notification" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View style={styles.pushNotificationsontainer}>
          <View style={{ marginTop: RFValue(30) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Task Started</Text>
              <Switch
                value={pasuseall}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={pasuseall ? "#fff" : "#fff"}
                onValueChange={(value) => setPauseAll(value)}
              />
            </View>
          </View>

          <View style={{ marginTop: 37 }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Task Completed</Text>
              <Switch
                useNativeDriver={true}
                value={product}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={product ? "#fff" : "#fff"}
                onValueChange={(value) => setProduct(value)}
              />
            </View>
          </View>

          <View style={{ marginTop: 37 }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Call & Chat</Text>
              <Switch
                useNativeDriver={true}
                value={credits}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={credits ? "#fff" : "#fff"}
                onValueChange={(value) => setCredits(value)}
              />
            </View>
          </View>

          <View style={{ marginTop: 37 }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Vibrate</Text>
              <Switch
                useNativeDriver={true}
                value={reminders}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={reminders ? "#fff" : "#fff"}
                onValueChange={(value) => setreminder(value)}
              />
            </View>
          </View>

          <View style={{ marginTop: 37 }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Withdraws Successful</Text>
              <Switch
                useNativeDriver={true}
                value={feedback}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={feedback ? "#fff" : "#fff"}
                onValueChange={(value) => setFeedback(value)}
              />
            </View>
          </View>

          <View style={{ marginTop: 37 }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>App Updated</Text>
              <Switch
                useNativeDriver={true}
                value={subscription}
                trackColor={{ false: "#EEEEEE", true: "#0C4DA2" }}
                thumbColor={subscription ? "#fff" : "#fff"}
                onValueChange={(value) => setSubscription(value)}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(75),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop:Platform.OS==='android'?0:RFValue(12),
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  pushNotificationText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "SemiBold",
    marginLeft: RFValue(20),
    marginTop: RFValue(30),
  },
  individualListIte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(30),
  },
  listText: {
    fontSize: RFValue(15),
    color: "#424242",
    fontFamily: "SemiBold",
  },
  seprator: {
    height: 1,
    backgroundColor: "#D7D8DD",
    width: WIDTH - RFValue(50),
    alignSelf: "center",
    marginTop: RFValue(24),
  },
});
