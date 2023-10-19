import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";

import HeaderBackChat from "../../components/Tracking/HeaderBackChat";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
const ChatComponent = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // Handle sending the message
    // You can implement your logic here
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <HeaderBackChat title="Driver Name" />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}
      >
      <View style={styles.chatContainer}>

        <View style={styles.todayContainer}>
         <Text style={styles.todayText}>Today</Text>
        </View>
        {/* Left Side Chat */}
        <View style={styles.leftChat}>
          <View style={styles.leftChatContent}>
            <Text style={styles.leftchatText}>
              Hello, i’m in front i’m close of{"\n"}the destination{" "}
            </Text>
            <Text style={styles.leftchatTime}>09:42</Text>
          </View>
        </View>

        {/* Right Side Chat */}
        <View style={styles.rightChat}>
          <View style={styles.rightChatContent}>
            <Text style={styles.rightchatText}>Hi Good Morning, thanks !</Text>
            <Text style={styles.rightchatTime}>09:45</Text>
          </View>
        </View>

      
        
      </View>

      {/* Footer */}
     
      </ScrollView>
      <View style={styles.footer}>
        <View>
          {message.length > 0 ? (
            <View style={styles.sendIcon}>
              <FontAwesome
                onPress={handleSend}
                name="send"
                size={24}
                color="#0C4DA2"
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.galleryIcon}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/icons/Tracking/imagepicker.png")}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={styles.input}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <TouchableOpacity style={styles.recordIcon}>
          <Image
            style={{ width: RFValue(45), height: RFValue(45) }}
            source={require("../../assets/icons/Tracking/recordvoice.png")}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  leftChat: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    borderTopLeftRadius: 0,
    padding: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: RFValue(20),
    maxWidth: "80%",
  },
  rightChat: {
    alignSelf: "flex-end",
    backgroundColor: "#0C4DA2",
    borderRadius: 16,
    borderTopRightRadius: 0,
    padding: 12,
    marginBottom: RFValue(20),
    maxWidth: "80%",
  },
  leftChatContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  rightChatContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  leftchatText: {
    color: "#212121",
    fontSize: RFValue(14),
    fontFamily: "Regular",
    marginRight: RFValue(10),
    lineHeight: 24,
  },
  leftchatTime: {
    color: "#757575",
    fontSize: RFValue(12),
    fontFamily: "Regular",
    top: RFValue(2),
  },

  rightchatText: {
    color: "#fff",
    fontSize: RFValue(14),
    fontFamily: "Regular",
    marginRight: RFValue(10),
    lineHeight: 24,
  },
  rightchatTime: {
    color: "#fff",
    fontSize: RFValue(12),
    fontFamily: "Regular",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0,
    borderColor: "#CCCCCC",
  marginBottom: Platform.OS==='android'?RFValue(20):RFValue(20),
   position:Platform.OS==='android'? "absolute":'relative',
   bottom:0,
  },
  galleryIcon: {
    marginRight: 8,
    position: "absolute",
    right: 0,
    zIndex: 9999,
    top: RFValue(15),
    right: RFValue(18),
  },
  input: {
    backgroundColor: "#EEEEEE",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    marginLeft: RFValue(18),
    width: Dimensions.get("window").width / 1.4,
    height: RFValue(45),
    fontFamily: "Regular",
    color: "#212121",
  },
  recordIcon: {
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#0C4DA2",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
  },
  sendIcon: {
    marginRight: 8,
    position: "absolute",
    right: 0,
    zIndex: 9999,
    top: RFValue(12),
    right: RFValue(18),
  },
  todayContainer:
  {
    
    paddingVertical:6,
    paddingHorizontal:10,
    backgroundColor:'rgba(117, 117, 117, 0.12)',
    justifyContent:"center",
    alignItems:"center",
    maxWidth:80,
    minHeight:24,
    borderRadius:6,
    alignSelf:'center',
    marginTop:RFValue(20),
    marginBottom:RFValue(20),

  },
  todayText:
  {
    fontSize:RFValue(9),
    color:'#757575',
    fontFamily:'SemiBold',
    
 
  }
});

export default ChatComponent;
