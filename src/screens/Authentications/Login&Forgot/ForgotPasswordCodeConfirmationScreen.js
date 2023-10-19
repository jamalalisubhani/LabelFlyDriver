import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import HeaderBack from '../../../components/HeaderBack'
import { RFValue } from 'react-native-responsive-fontsize'
import OtpInput from '../../../components/OtpInput';
import Button from '../../../components/Button';

export default function ForgotPasswordCodeConfirmationScreen({route,navigation}) {
    const { activeContainer } = route.params;

// Timer Logic
const [seconds, setSeconds] = useState(60);

useEffect(() => {
  let timerId = null;

  if (seconds > 0) {
    timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  }

  return () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };
}, [seconds]);

const handleResendCode = () => {
  setSeconds(60); // Reset the timer to 60 seconds
};
    return (
    <View style={styles.container}>
       <HeaderBack
      title="Forgot Password"
      />

      <View style={styles.codeOtpConatiner}>

    <Text
    numberOfLines={1}
    style={styles.codeSentText}>Code has been send to <Text
    style={{...styles.codeSentText,fontFamily:"Bold"}}
    >{activeContainer}</Text></Text>

    <OtpInput />
     
    <TouchableOpacity onPress={handleResendCode}>
      <Text style={styles.resendCodeText}>
        {seconds > 0 ? (
          <Text>
            Resend code in{" "}
            <Text style={styles.secondsText}>{seconds} s</Text>
          </Text>
        ) : (
          "Resend code"
        )}
      </Text>
    </TouchableOpacity>
      </View>
   
    
    <View style={styles.buttonContainer}>
   <Button 
   onPress={()=>navigation.navigate('CreateNewPasswordScreen')}
   title="Verify"
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
codeOtpConatiner:
{
  flex:0.9,
  justifyContent:"center",
  alignItems:'center',


},
codeSentText:
{
    fontSize:RFValue(14),
    fontFamily:'Medium',
    color:'#212121',
    textAlign:'center'

},
resendCodeText:
{
  fontSize:RFValue(15),
  fontFamily:"Medium",
  color:'#212121',
  textAlign:"center",
  marginTop:RFValue(50)

},
secondsText: {
  color: "#0C4DA2",
  fontFamily:"Bold",
  fontSize:RFValue(15),
},
buttonContainer:
{
  position:"absolute",
  left:0,
  right:0,
  bottom:RFValue(30)
}

})