import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../components/HeaderBack";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };
  return (
    <View style={styles.container}>
      <HeaderBack title="Language" />

      <Text style={styles.languageText}>Language</Text>

      <View>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => handleLanguageSelect("English")}
        >
          <Text style={styles.languageTexts}>English (US)</Text>
          <Ionicons
            name={
              selectedLanguage === "English"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#0C4DA2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => handleLanguageSelect("Arabic")}
        >
          <Text style={styles.languageTexts}>Arabic (EMA)</Text>
          <Ionicons
            name={
              selectedLanguage === "Arabic"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#0C4DA2"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  languageText: {
    color: "#212121",
    fontSize: RFValue(18),
    fontFamily: "Bold",
    marginLeft: 24,
    marginBottom: 40,
    marginTop:30,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  languageTexts: {
    fontSize: RFValue(15),
    color: "#212121",
    fontFamily: "SemiBold",
  },
});
