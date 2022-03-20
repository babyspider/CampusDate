import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.background}>
     <ScrollView>
      <Text style={styles.emailBoxes}>
      filleremail@emailhost.com
      </Text>
      </ScrollView>
          <View style={{ flexDirection:"row", marginLeft: 0, marginRight:"auto" }}>
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Setting Menu Button')}>
              <Image source={require('./assets/settingIcon.png')} style = {styles.iconButtons} />
          </Pressable>
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Profile Menu Button')}>
              <Image source={require('./assets/profileIcon.png')} style = {styles.iconButtons} />
          </Pressable>
          <Pressable
            style = {styles.menuButtons}
            onPress={() => Alert.alert('Chat Menu Button')}>
              <Image source={require('./assets/chatIcon.png')} style = {styles.iconButtons} />
          </Pressable> 
        </View>
    </View>

  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'pink',
  },
  emailBoxes: {
    padding: 20,
    fontSize: 20,
    color: "darkgrey",
    width: '100%',
    backgroundColor: "white",
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

