import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, Alert, SafeAreaView, TouchableOpacity, Image, Component, ScrollView, Pressable, Dimensions, useState} from 'react-native';
// import { backgroundColor } from '../../react-native/Libraries/Components/View/ReactNativeStyleAttributes';
//import {AiFillHeart} from './node_modules/react-icons/ai';

// safe area view might just be ios -.- , porlly just use View

// TODO: setName function around line 57 won't work

import { Link } from "react-router-dom";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Separator = () => <View style={styles.separator} />;

function App() {
  return (

    <SafeAreaView style={{backgroundColor:'#FECCC4', width: screenWidth, height: screenHeight }}>
      
      {/* <Separator></Separator> */}

      {/* <View style={styles.screen}> */}

        {/* <Image
              style={styles.profilePic}
              source={ {uri: 'https://reactnative.dev/img/tiny_logo.png',
            }} /> */}

        <Image
          style={ styles.profilePic}
          source={require('../assets/anonprofile.png')} />

        <View style = {styles.matchedOnButtons1}></View>
        <View style = {styles.matchedOnButtons2}></View>
        <View style = {styles.matchedOnButtons3}></View>
        
        {/* scrollView wrapped inside another View b/c of scrollView height limitation */}
        {/* scrollView is off, sometimes it is unresponsive when trying to scroll -.-  */}
        <View style = {{height: screenHeight/4}}> 
          <ScrollView
            style={styles.profileTextScrolling}>
            <Text
              style={styles.profileTextSize}>
              Profile of User: Im writing this as a test to see how it will look depending on how long this is. Also seeing the
              scroll feature. LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
              LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
              LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
              LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
            </Text>
          </ScrollView> 
        </View>

        {/* will prolly be issue w/ diff devices, but did use some hard coded values to get centered images*/}
        <TouchableOpacity
          style={styles.roundButtonLeft}
          /* onPress={() => setName(name+'a')} */ > 
            <Image source={require('../assets/xIcon.png')} style = {{width: screenWidth/7,height: screenWidth/7, left: 5, top: 5}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roundButtonRight}
          onPress={() => Alert.alert('Simple Button pressed')}>
            <Image source={require('../assets/heartIcon.png')} style = {{width: screenWidth/7,height: screenWidth/7,left: 9,top: 8,}} />
        </TouchableOpacity> 


        <View style={{ flexDirection:"row", marginLeft: 0, marginRight:"auto" }}>
          <Link to="/editprofile">
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Setting Menu Button')}>
              <Image source={require('../assets/settingIcon.png')} style = {styles.iconButtons} />
          </Pressable>
          </Link>
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Profile Menu Button')}>
              <Image source={require('../assets/profileIcon.png')} style = {styles.iconButtons} />
          </Pressable>
          <Link to="/chat">
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Chat Menu Button')}>
              <Image source={require('../assets/chatIcon.png')} style = {styles.iconButtons} />
          </Pressable> 
          </Link>
        </View>


      

      {/* </View> */}
    </SafeAreaView>
  );
}


/// Just some styles
const styles = StyleSheet.create({
  roundButtonLeft:{
    borderRadius: 100,
    backgroundColor: '#DC6248',
    width: screenWidth/5.5,
    height: screenWidth/5.5,
    left:screenWidth/15,
    top: screenHeight/3, // increasing brings button down
    position: 'relative',
    
  },

  profilePic: { 
    width: screenWidth - 6,
    height: screenHeight/2.3,
    //marginTop: "-280%", // larger moves to top
    alignSelf:"center",
    position: 'absolute',
    margin: 10,
    top: 25, 
  },

  roundButtonRight: {
    borderRadius: 100,
    backgroundColor: '#84DC48',
    width: screenWidth/5.5,
    height: screenWidth/5.5,
    left: screenWidth/1.35,
    top: screenHeight/4, // -.- same thing, using screenHeight but still diff height from left button gah
    position: 'relative',

  }, 

  profileTextScrolling:{
    width: screenWidth - 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    top: screenHeight - (screenHeight/1.45),
    alignSelf:'center',
    position:'relative',
    
  },
   profileTextSize:{
    fontSize: 15,

  }, 
  matchedOnButtons1:{
    borderWidth: 1,
    //borderColor: "lightgrey",
    borderRadius: 100, // rounded edges or no -- higher = more round
    width: screenWidth/3,
    height: screenHeight/20,
    backgroundColor: "white",
    position: 'relative', 
    top: screenHeight/2.5,
    left: 0,

  },
  matchedOnButtons2:{
    borderWidth: 1,
    backgroundColor: "white",
    //borderColor: "red",
    borderRadius: 100, 
    width: screenWidth/3,
    height: screenHeight/20,
    position: 'relative', 
    top: screenHeight/2.85, // confused as to why this isn't just screenHeight/2.5 like before 
    left: screenWidth/3,

  },
  matchedOnButtons3:{
    borderWidth: 1,
    backgroundColor: "white",
    //borderColor: "green",
    borderRadius: 100, 
    width: screenWidth/3,
    height: screenHeight/20,
    position: 'relative', 
    top: screenHeight/3.30, // same question, why idn't it just og screenHeight/2.5
    left:(screenWidth/3)*2, // moving 2 "matchedOnButtons" over 

  },
  menuButtons:{
    borderColor:'#FECCC4', 
    borderWidth:1, 
    backgroundColor:'#FECCC4', 
    width: screenWidth/3,
    height: screenHeight/5,
    top: screenHeight/3.5,
    position: 'relative',

  },
iconButtons:{
  width: screenWidth/6,
  height: screenWidth/6,
  left: screenWidth/15,
}

});

export default App;