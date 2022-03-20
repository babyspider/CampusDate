import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Button, Alert} from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  
  return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>
      
      <Pressable style={styles.buttons} onPress={() => Alert.alert('Signing Up')}>
      <Text style={styles.buttonsText}>Sign Up</Text>
      </Pressable>
        
      <Pressable style={styles.buttons} onPress={() => Alert.alert('Logging In')}>
      <Text style={styles.buttonsText}>Log In</Text>
      </Pressable>

    </View>
  );
}
const styles = StyleSheet.create({
  buttons:{
    borderRadius: 20,
    borderColor:'grey',
    marginTop:'5%',
    marginHorizontal:"20%",
    textAlign: 'center',
    borderWidth: 2,
  },
  buttonsText:{
    margin:'1%',
    textAlign: 'center',
    color:'grey',
    fontSize:25,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: 8,
  },
  title: {
    backgroundColor:'none',
    margin: 1,
    fontSize: 50,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});