import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { useState } from 'react';
const axios = require('axios').default;


async function signupUser(email, password){
  var doesExist = false;
  await axios.get("http://localhost:5000/users")
  .then( response => {
    const existingUsers = response.data;
      for(let i in existingUsers){
        if(existingUsers[i]["email"] == email){
          doesExist = true;
        }
      }
  })
  if(doesExist){
    document.getElementById("errormsg").innerHTML = "ERROR: Email already in database!";
  }else{
    localStorage.setItem("email",email);
    localStorage.setItem("password",password)
    window.location.href = "http://localhost:3000/createprofile";     
  }
};

async function noMatch(){
  document.getElementById("errormsg").innerHTML = "ERROR: Passwords do not match!";
}

async function noValue(){
  document.getElementById("errormsg").innerHTML = "ERROR: Empty email/password!";
}

async function noRPI(){
  document.getElementById("errormsg").innerHTML = "ERROR: Not an RPI email!";
}

export default function Signup() {


  const [email, setEmail] = useState();//useLocalStorage("email", "");
  const [password, setPassword] = useState();//useLocalStorage("password", "");
  const [passwordTwo, setPasswordTwo] = useState();//useLocalStorage("password", "");

  function handleEmail(event){
    setEmail(event.target.value);
  }

  function handlePass(event){
    setPassword(event.target.value);
  }

  /**
   * Submit button for sign-up registers in user inputs to MongoDB 
   */
  const handleSubmit = async e => {

    const getUsers = axios.get('http://localhost:5000/users')
    console.log(email)
    console.log(password)
    console.log(passwordTwo)
    if(typeof email === "undefined" || typeof password === "undefined" || email == "" || password == "" ){
      console.log("ok")
      await noValue();
    }else if(password != passwordTwo){
      console.log("killUser()")
      await noMatch();
    }else if(email.substr(email.length-8, email.length) != "@rpi.edu"){
      await noRPI();
    }else{
      await signupUser(email, password);
    }
  }

  return (
    /**
     * Front end visualizaiton for Signup
     * Contains text input for email, password, and re-entere password
     * Submit button goes to createprofile page
     */
    <View style={styles.background}>
    <Text style={styles.title}>CampusDate</Text>

    <TextInput
      style={styles.inputbox}
      id="email"
      placeholder="email"
      keyboardType = "email-address"
      onChange={handleEmail}
    />

    <TextInput
      style={styles.inputbox}
      id="password"
      placeholder="password"
      onChange={e => setPassword(e.target.value)}
    />

    <TextInput
      style={styles.inputbox}
      placeholder="confirm password"
      onChange={e => setPasswordTwo(e.target.value)}
    />

    <Pressable
      style={styles.buttons}
      onPress={handleSubmit}>
      <Text style={styles.buttonsText}>Sign Up</Text>
    </Pressable>

    <span id="errormsg"></span>
  </View>
);
}
const styles = StyleSheet.create({
inputbox: {
  backgroundColor: 'white',
  borderRadius: 5,
  fontSize: 20,
  padding: 3,
  borderColor: 'grey',
  marginTop: '5%',
  marginHorizontal: '20%',
},
buttons: {
  borderRadius: 20,
  borderColor: 'grey',
  marginTop: '5%',
  marginHorizontal: '20%',
  textAlign: 'center',
  borderWidth: 2,
},
buttonsText: {
  margin: '1%',
  textAlign: 'center',
  color: 'grey',
  fontSize: 25,
},
background: {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'pink',
  padding: 8,
},
title: {
  backgroundColor: 'none',
  margin: 1,
  fontSize: 50,
  color: 'grey',
  fontWeight: 'bold',
  textAlign: 'center',
},
});