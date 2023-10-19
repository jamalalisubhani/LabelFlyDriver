import 'react-native-gesture-handler';
import React from "react";
import { View, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import Navigation from "./src/navigation/Navigation";
import SplashScreen from "./src/components/SplashScreen";

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  const [loaded] = useFonts({
    SemiBold: require("./src/assets/fonts/Urbanist-SemiBold.ttf"),
    Medium: require("./src/assets/fonts/Urbanist-Medium.ttf"),
    Regular: require("./src/assets/fonts/Urbanist-Regular.ttf"),
    Bold: require("./src/assets/fonts/Urbanist-Bold.ttf"),
    Thin: require("./src/assets/fonts/Urbanist-Thin.ttf"),
  });
  // if (!loaded) {
  //   return false;
  // }

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 0 : 0;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#fff" }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      </View>

      <Navigation />
    </View>
  );
}
