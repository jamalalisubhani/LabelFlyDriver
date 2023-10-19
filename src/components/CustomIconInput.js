import React, { useState } from "react";
import { TextInput, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const CustomIconInput = ({ icon, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const iconTintColor = isFocused ? "#0C4DA2" : "#B3D2F9";

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon && (
          <Image
            source={icon}
            style={{
              tintColor: iconTintColor,
              width: 20,
              height: 20,
              marginRight: 8,
            }}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        returnKeyType="done"
        onChangeText={onChangeText}
        // placeholderTextColor={"#9E9E9E"}
        {...rest}
      />
    </View>
  );
};

// Styles...

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderColor: "#B3D2F9",
    backgroundColor: "#FAFAFA",
    marginBottom: 23,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: RFValue(13),
    color:"#212121",
    fontFamily:'SemiBold'
  },
});

export default CustomIconInput;
