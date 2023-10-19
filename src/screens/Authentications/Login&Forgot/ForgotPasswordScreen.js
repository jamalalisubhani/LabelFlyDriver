import { Dimensions, Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import HeaderBack from '../../../components/HeaderBack'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import Button from '../../../components/Button'
import { ScrollView } from 'react-native'

const {width,height}= Dimensions.get('window')
export default function ForgotPasswordScreen() {
    const [activeContainer, setActiveContainer] = useState(null);
    const navigation = useNavigation();
  
    const handleContainerPress = (value) => {
      setActiveContainer(value);
    };
  
    const handleNextScreen = () => {
      if (activeContainer) {
        navigation.navigate('ForgotPasswordCodeConfirmationScreen', { activeContainer });
      }
    };
  
  return (
    <View style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:100}}
      >
      <HeaderBack
      title="Forgot Password"
      />

      <Image 
      style={styles.forgotBackImage}
      source={require('../../../assets/images/forgetImage.png')}
      />

      <View style={styles.contentSelectionContainer}>
    
    <Text style={styles.selectionText}>
    Select which contact details should we use to{'\n'}
    reset your password
    </Text>

    <View style={styles.containerWrapper}>
      <TouchableOpacity
        style={[styles.selectcontainer, activeContainer === '+21054852183' && styles.containerActive]}
        onPress={() => handleContainerPress('+21054852183')}
      >
        <Image source={require('../../../assets/images/viasms.png')} style={styles.image} />
        <View style={styles.containerContent}>
          <Text style={styles.title}>Via SMS</Text>
          <Text style={styles.number}>+21054852183</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.selectcontainer, activeContainer === 'Youremail@gmail.com' && styles.containerActive]}
        onPress={() => handleContainerPress('Youremail@gmail.com')}
      >
        <Image source={require('../../../assets/images/viaemail.png')} style={styles.image} />
        <View style={styles.containerContent}>
          <Text style={styles.title}>Via Email</Text>
          <Text style={styles.email}>Youremail@gmail.com</Text>
        </View>
      </TouchableOpacity>
      
     
    </View>

      </View>
      </ScrollView>
      <View style={styles.btnContainer}>
      <Button 
      onPress={handleNextScreen}
      title="Continue"
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

container:
{
    flex:1,
    backgroundColor:'#fff',

},
forgotBackImage:
{
    width:width-58,
    height:height/4.2,
    resizeMode:"contain",
    alignSelf:'center',
    marginTop:RFValue(40)

},
selectionText:
{
    color:'#212121',
    fontFamily:'Medium',
    fontSize:RFValue(15),
    marginLeft:20,
    marginTop:RFValue(40)
},
containerWrapper: {
    alignSelf:"center",
    marginTop:RFValue(20)
  },
  selectcontainer: {
    width:width-48,
    height: RFValue(100),
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:RFValue(20),
    flexDirection:'row',
    paddingHorizontal:RFValue(14)


  },
  containerActive: {
    borderWidth: 2,
    borderColor: '#0C4DA2',
  },
  image: {
    width: RFValue(72),
    height: RFValue(72),
    marginRight: 16,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  
  },
  title: {
    fontSize: RFValue(13),
    fontFamily:"Medium",
    marginBottom: 8,
    color:'#757575',
  },
  number: {
    fontSize: RFValue(14),
    color: '#000',
    fontFamily:'Bold'
  },
  email: {
    fontSize: RFValue(14),
    color: '#000',
    fontFamily:'Bold'
  },
  btnContainer:
  {
    position:"absolute",
    bottom:RFValue(30),
    right:0,
    left:0,
    
  }

})