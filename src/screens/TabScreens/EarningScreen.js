// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Dimensions,
//   Platform,
//   ScrollView
// } from "react-native";
// import React from "react";
// import { RFValue } from "react-native-responsive-fontsize";

// const { width } = Dimensions.get("window");
// export default function EarningScreen() {
//   return (
//     <View style={styles.container}>
//     <Text
//     style={styles.earningText}
//     >Earnings Comming Soon</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent:"center",
//     alignItems:"center",
//   },
//   earningText:
//   {
//     color:'#212121',
//     fontFamily:'SemiBold',
//     fontSize:RFValue(24)
//   }
// });

import React, { useCallback, useEffect, useState } from "react";
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

import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import HeaderBackChat from "./HeaderBackChat";
import { SocketContext } from "../../utils/SocketProvider";
import { GetMessage, SendMessage } from "../../utils/auth.service";
const ChatComponent = ({ socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const { user } = useSelector((state) => state.root.user);
  // console.log("111111socketsocketsocket", socket);

  console.log("useruseruseruser", user?.data?._id);
  const handleSend = () => {
    let msg = {
      _id: `${(Math.random() + 1).toString(36).substring(7)}-${
        user?.data?._id
      }`,
      createdAt: new Date(),
      text: message,
      user: { _id: user?.data?._id },
    };
    setMessage("");
    console.log("msgmsgmsgmsgmsgmsg", msg);
    onSend([msg]);
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("vvvvvvvvvvvv");
    });
    socket.emit("join", user?.data?._id);
    // get online users
    socket.on("setup socket", (users) => {
      console.log("vvvvvvvvvvvv");
    });
    // socket.on("typing", (conversation) => setTyping(conversation));
    // socket.on("stop typing", () => setTyping(false));
  }, [user, socket]);
  useEffect(() => {
    GetMessage("654b737b77404f0345406956")
      .then((v) => {
        console.log(
          "654b737b77404f0345406956654b737b77404f0345406956654b737b77404f0345406956",
          v
        );
        chatarrfunc(v);
      })
      .catch((err) => {
        console.log("654b737b77404f0345406956----->>", err);
      });
  }, []);
  const chatarrfunc = (v) => {
    let arr = [];
    console.log("vvvvvvvvvvvv------", v?.data[0]);

    for (let index = 0; index < v?.data.length; index++) {
      arr.push({
        _id: v?.data[index]?._id,
        text: v?.data[index]?.message,
        createdAt: new Date(v?.data[index]?.createdAt),
        user: {
          _id: v?.data[index]?.sender?._id,
          name: v?.data[index]?.sender?.name,
          avatar: v?.data[index]?.sender?.photo,
        },
      });
    }
    setMessages(arr.reverse());
  };
  const onSend = useCallback((messages = []) => {
    console.log(
      "messagesmessagesmessagesmessagesmessages?._id",
      messages[0]?.text
    );
    SendMessage({
      chatRoom: "654b737b77404f0345406956",
      message: messages[0]?.text,
    }).then((res) => {
      socket.emit("send message", messages[0]?.text);
      console.log("654b737b77404f0345406956 ------>>>", res?.data);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <HeaderBackChat title="Driver Name" />
      <GiftedChat
        minInputToolbarHeight={100}
        renderInputToolbar={() => {
          return (
            <View style={styles.footer}>
              <View>
                {message.length > 0 ? (
                  <TouchableOpacity onPress={() => {}} style={styles.sendIcon}>
                    <FontAwesome
                      onPress={handleSend}
                      name="send"
                      size={24}
                      color="#0C4DA2"
                    />
                  </TouchableOpacity>
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
          );
        }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.data?._id,
        }}
      />
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.chatContainer}>
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>Today</Text>
          </View>
         
          <View style={styles.leftChat}>
            <View style={styles.leftChatContent}>
              <Text style={styles.leftchatText}>
                Hello, i’m in front i’m close of{"\n"}the destination{" "}
              </Text>
              <Text style={styles.leftchatTime}>09:42</Text>
            </View>
          </View>

         
          <View style={styles.rightChat}>
            <View style={styles.rightChatContent}>
              <Text style={styles.rightchatText}>
                Hi Good Morning, thanks !
              </Text>
              <Text style={styles.rightchatTime}>09:45</Text>
            </View>
          </View>
        </View>

      
      </ScrollView> */}
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
    marginBottom: Platform.OS === "android" ? RFValue(20) : RFValue(20),
    position: Platform.OS === "android" ? "absolute" : "relative",
    bottom: 0,
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
  todayContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(117, 117, 117, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 80,
    minHeight: 24,
    borderRadius: 6,
    alignSelf: "center",
    marginTop: RFValue(20),
    marginBottom: RFValue(20),
  },
  todayText: {
    fontSize: RFValue(9),
    color: "#757575",
    fontFamily: "SemiBold",
  },
});
const ChatComponentWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatComponent {...props} socket={socket} />}
  </SocketContext.Consumer>
);

// export default HomeWithSocket;
export default ChatComponentWithSocket;
