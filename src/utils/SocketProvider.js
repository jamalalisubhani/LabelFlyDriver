import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Create a new context for the Socket.io client
export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threadsListing, setThreadsListing] = useState([]);

  const options = {
    autoConnect: false, // Prevent auto-connect to allow for custom configuration
    reconnection: true, // Allow the client to attempt to reconnect if disconnected
  };

  // Define the connect and disconnect functions to manage the client connection
  const connect = async () => {
    const user = store.getState().root.user;

    console.log("----config--->>>>>>>", user?.user?.token);

    if (!socket || !connected) {
      let token = user?.user?.token;
      if (token) {
        const newSocket = io("http://localhost:8000", {
          extraHeaders: {
            Authorization: token,
          },
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.emit("threads_listing");

        newSocket.on("threads_listing", (threads) => {
          setThreadsListing((prev) => {
            let arr1 = prev;
            let arr2 = threads;
            let merged_arr = arr1.concat(arr2).reduce((acc, obj) => {
              const index = acc.findIndex((item) => item._id === obj._id);
              if (index === -1) {
                // If the object doesn't exist in the accumulator array, add it
                acc.push(obj);
              } else {
                // If the object exists in the accumulator array, merge the objects
                acc[index] = {
                  ...acc[index],
                  ...obj,
                };
              }
              return acc;
            }, []);
            return merged_arr;
          });
        });

        newSocket.on("new_thread", (thread) => {
          setThreadsListing((prev) => {
            let arr1 = prev;
            let arr2 = [thread];
            let merged_arr = arr1.concat(arr2).reduce((acc, obj) => {
              const index = acc.findIndex((item) => item._id === obj._id);
              if (index === -1) {
                // If the object doesn't exist in the accumulator array, add it
                acc.push(obj);
              } else {
                // If the object exists in the accumulator array, merge the objects
                acc[index] = {
                  ...acc[index],
                  ...obj,
                };
              }
              return acc;
            }, []);
            return merged_arr;
          });
        });

        newSocket.on("connect", () => {
          setConnected(true);
        });

        newSocket.on("disconnect", () => {
          setConnected(false);
          setSocket(null);
        });

        newSocket.on("connect_error", (error) => {
          console.error("Connection error:", error);
        });
      }
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket.off();
      setSocket(null);
      setConnected(false);
    }
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const contextValue = {
    socket,
    connected,
    connect,
    disconnect,

    threadsListing,
    // Messages
    messages,
    setMessages,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
