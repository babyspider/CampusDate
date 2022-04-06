import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import { Component, Navigation } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";

// import * as React from 'react';
import { Text, View, StyleSheet, Pressable, Button, Alert} from 'react-native';
import Constants from 'expo-constants';

// import { NavigationContainer } from 'react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

class App extends Component {
  render() {

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

    return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>
      
      <Link to="/signup">
      <Pressable style={styles.buttons}>
      <Text style={styles.buttonsText}>Sign Up</Text>
      </Pressable>
      </Link>
        
      <Link to="/login">
      <Pressable style={styles.buttons}>
      <Text style={styles.buttonsText}>Log In</Text>
      </Pressable>
      </Link>

    </View>
  );
}}

export default App;