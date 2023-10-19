import React, {useRef,useState} from 'react';
import {Animated, PanResponder, Platform, StyleSheet, View,Dimensions,Text,TouchableOpacity,Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const {width}= Dimensions.get('window')
const WINDOW_HEIGHT = Dimensions.get('window').height;
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.7;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.49;
const MAX_UPWARD_TRANSLATE_Y =
BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const MapBottomSheet = (props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        // if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        // } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
        //   lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        // }

        if (gesture.dy > 0) {
          // dragging down
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          // dragging up
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = (direction) => {
    console.log('direction', direction);
    lastGestureDy.current =
      direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };


  return (
    <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
      <View style={styles.draggableArea} {...panResponder.panHandlers}>
        <View style={styles.dragHandle} />
      </View>
      <Text style={styles.discountsheetText}>20% Discount applied</Text>
      <View style={styles.seprator} />

      {/* Selectable Package */}
      <View style={styles.containerWrapper}>
        <TouchableOpacity
          style={[
            styles.selectcontainer,
            props.activeContainer === "small package" && styles.containerActive,
          ]}
          onPress={() => props.handleContainerPress("small package")}
        >
          <Image
            source={require("../assets/icons/Maps/smallpackage.png")}
            style={styles.image}
          />
          <View style={styles.containerContent}>
            <Text style={styles.title}>Small Package</Text>

            <View style={styles.remainingTimeMainContainer}>
              <Image
                style={styles.clock}
                source={require("../assets/icons/Maps/timer.png")}
              />

              <Text style={styles.time}>19:30</Text>

              <View style={styles.minawayContaniner}>
                <Text style={styles.minawaytext}>5 Min away</Text>
              </View>
            </View>

            <Text style={styles.price}>AED 49.00-50.00</Text>
          
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selectcontainer,
            props.activeContainer === "large package" && styles.containerActive,
          ]}
          onPress={() => props.handleContainerPress("large package")}
        >
          <Image
            source={require("../assets/icons/Maps/largepackage.png")}
            style={styles.image}
          />
          <View style={styles.containerContent}>
            <Text style={styles.title}>Large Package</Text>
          
            <View style={styles.remainingTimeMainContainer}>
              <Image
                style={styles.clock}
                source={require("../assets/icons/Maps/timer.png")}
              />

              <Text style={styles.time}>19:40</Text>

              <View style={styles.minawayContaniner}>
                <Text style={styles.minawaytext}>10 Min away</Text>
              </View>
            </View>

            <Text style={styles.price}>AED 60.00-70.00</Text>
          
          </View>
        </TouchableOpacity>
     
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor:"red"
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

  },
  draggableArea: {
    width: ('100%'),
    height: 54,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginTop:8,
  },

  discountsheetText:
  {
    color:'#212121',
    fontFamily:'Bold',
    fontSize:RFValue(20),
    textAlign:"center",
  },
  seprator:
  {
    width:('90%'),
    height:1,
    backgroundColor:'#eeeeee',
    marginTop:RFValue(20),
    alignSelf:"center"
  },
  containerWrapper: {
    alignSelf:"center",
    marginTop:RFValue(20)
  },
  selectcontainer: {
    width:width-48,
   padding:20,
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
    width: RFValue(100),
    height: RFValue(90),
    marginRight: 16,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  
  },
  title: {
    fontSize: RFValue(16),
    fontFamily:"Bold",
    marginBottom: 12,
    color:'#212121',
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
 
  clock:
  {
    width:16,
    height:16,
    marginRight:8,
  },
  time:
  {
    fontSize:RFValue(10),
    color:'#616161',
    fontFamily:'Medium',
    marginRight:12,

  },
  minawayContaniner:
  {
      width:75,
      height:24,
      borderRadius:6,
      backgroundColor:'rgba(16, 16, 16, 0.08)',
      justifyContent:"center",
      alignItems:'center'
  },
  minawaytext:
  {
    fontSize:10,
    fontFamily:'SemiBold',
    color:"#35383F"
  
},
remainingTimeMainContainer:
{
    flexDirection:"row",
    alignItems:"center"
},
price:
{
    fontSize:RFValue(16),
    color:'#212121',
    fontFamily:"Bold",
    marginTop:12,
},

});

export default MapBottomSheet;