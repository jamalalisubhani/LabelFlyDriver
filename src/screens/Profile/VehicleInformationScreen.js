import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HeaderBack from "../../components/HeaderBack";
import CustomIconInput from "../../components/CustomIconInput";
import CustomTextInput from "../../components/CustomTextInput";
import { RFValue } from "react-native-responsive-fontsize";
import PhoneNumberInput from "../../components/Profile/PhoneNumberInput";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { accupdate, vehicleinfo } from "../../utils/validation";
import { updateDriver } from "../../utils/auth.service";
import { setUser } from "../../redux/reducers/userReducer";

export default function VehicleInformationScreen({ navigation }) {
  const { user } = useSelector((state) => state.root.user);
  console.log("useruseruseruseruser----->", user?.data?.driver?.license_plate);
  console.log("useruseruseruseruser----->", user?.data?.driver?.model);
  const dispatch = useDispatch();
  const [modelname, setModelName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const formik = useFormik({
    validationSchema: vehicleinfo,
    initialValues: {
      model: user?.data?.driver?.model ? user?.data?.driver?.model : "",
      licensePlate: user?.data?.driver?.license_plate
        ? user?.data?.driver?.license_plate
        : "",
    },

    onSubmit: async (values) => {
      let params = {
        model: values.model,
        licensePlate: values.licensePlate,
        password: user.data.password,
      };
      updateDriver(params, user?.data?._id)
        .then((res) => {
          if (res) {
            let newuser = { ...user, data: res?.data?.data };
            console.log(
              "-----   --- - - - - KarachiKarachiKarachi>>>>>>>",
              newuser
            );
            dispatch(setUser(newuser));

            navigation.navigate("tabs");
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
  });
  return (
    <View style={styles.container}>
      <HeaderBack title="Vehicle information" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RFValue(0)}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputsContainer}>
            <CustomIconInput
              placeholder="Model Name"
              icon={require("../../assets/icons/PlanyourJourney/fullname.png")}
              // value={modelname}
              // onChangeText={setModelName}
              onChangeText={formik.handleChange("model")}
              value={formik.values.model}
            />

            <CustomIconInput
              keyboardType="phone-pad"
              // value={modelNumber}
              icon={require("../../assets/icons/PlanyourJourney/card.png")}
              // onChangeText={setModelNumber}
              placeholder="License plate number"
              onChangeText={formik.handleChange("licensePlate")}
              value={formik.values.licensePlate}
            />
          </View>
        </ScrollView>
        <View style={styles.footerButtonContainer}>
          <Button
            onPress={() => {
              formik.handleSubmit();
              // navigation.navigate("tabs")
            }}
            title="Update"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputsContainer: {
    marginTop: RFValue(20),
  },
  footerButtonContainer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? RFValue(30) : RFValue(30),
    left: 0,
    right: 0,
    paddingHorizontal: RFValue(20),
  },
  flexContainer: {
    flex: 1,
  },
  // scrollContainer: {
  //   flex: 1,
  // },
});
