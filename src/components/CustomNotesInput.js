import React, { useState } from "react";
import { TextInput, View, Image, StyleSheet, TouchableOpacity,Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const CustomIconInput = ({ icon, multiline, value, onChangeText, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleSubmitEditing = () => {
    Keyboard.dismiss(); // Hide the keyboard
  
   
  };

  const iconTintColor = isFocused ? "#0C4DA2" : "#B3D2F9";

  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconContainer}>
          <Image
            source={icon}
            style={{
              tintColor: iconTintColor,
              width: 20,
              height: 20,
              marginBottom: 8,
              
            }}
          />
        </View>
      )}

      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onSubmitEditing={handleSubmitEditing}
        onChangeText={onChangeText}
        multiline={multiline}
        returnKeyType="done"
        textAlignVertical="top"

        {...rest}
      />
       {isFocused && multiline && (
            <TouchableOpacity style={styles.doneButton} onPress={Keyboard.dismiss}>
              <Ionicons name="checkmark" size={20} color={iconTintColor} />
            </TouchableOpacity>
          )}
    </View>
  );
};

// Styles...

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top
    alignSelf: "center",
    width: "90%",
    height: 175,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    borderColor: "#B3D2F9",
    backgroundColor: "#FAFAFA",
    marginBottom: 23,
    paddingTop:15
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    marginTop: 10, // Add marginTop to position the icon at the top
  },
  input: {
    flex: 1,
    fontSize: RFValue(13),
    color: "#9E9E9E",
  },
  multilineInput: {
    paddingTop: 10, // Add paddingTop to adjust the text position
  },
});

export default CustomIconInput;
