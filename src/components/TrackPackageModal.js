import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const TrackPackageModal = ({ isVisible, closeModal,openModal }) => {
 const navigation = useNavigation();

   const onPressTrackPackageButton = () =>
   {
      closeModal()
      navigation.navigate('MapTrackingScreen')

   }

    return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.5}
      backdropColor="#000"
      style={styles.modal}
    >
      <View style={styles.container}>
       
       <View style={styles.crossicon}>
      <Entypo 
      onPress={closeModal}
      name="squared-cross" size={28} color="#0B499A" />
      </View>
        
        <Image
          style={styles.congratsIcon}
          source={require("../assets/icons/PlanyourJourney/deliverysenticon.png")}
        />
        <Text style={styles.title}>Delivery sent !</Text>

        <Text style={styles.description}>
        Payment successful you can now track{'\n'}your package 
        </Text>

        <TouchableOpacity onPress={onPressTrackPackageButton} style={styles.trackPackageButton}>
        <Text style={styles.trackPackageText}>Track package</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: width - 80,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 28,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: RFValue(22),
    color: "#212121",
    fontFamily: "Bold",
    marginTop: RFValue(20),
  },
  description: {
    fontSize: RFValue(13),
    fontFamily: "Regular",
    color: "#65666B",
    lineHeight: 20,
    marginTop: 16,
    textAlign: "center",
  },
  congratsIcon: {
    width: RFValue(150),
    height: RFValue(150),
    resizeMode: "contain",
    marginTop:RFValue(20)
  },
  crossicon:
  {
    alignSelf:"flex-end"
  },
  trackPackageButton:
  {
    width:width-150,
    height:58,
    borderRadius:16,
    backgroundColor:'#0B499A',
    justifyContent:"center",
    alignItems:'center',
    alignSelf:'center',
    marginTop:RFValue(25)

  },
  trackPackageText:
  {
    color:'#ffffff',
    fontSize:RFValue(14),
    fontFamily:"Bold",
    
  }
});

export default TrackPackageModal;
