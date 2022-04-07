import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import { Link } from "react-router-dom";
import Constants from 'expo-constants';
import { useState } from 'react';

const axios = require('axios').default;




export default function Signup() {


  const [email, setEmail] = useState(1);
  const [password, setPassword] = useState(1);

  function handleEmail(event){
    setEmail(event.target.value);
  }

  function submit(){
    var formData = new FormData();
    formData.append('email',email);
    axios({
      method: "POST",
      url: "https://localhost:5000/register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function(response){
      console.log(response);
    }).catch(function(response){
      console.log(response);
    });
  }

  return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>

      <TextInput
        style={styles.inputbox}
        placeholder="email"
        keyboardType = "email-address"
        //value={this.state.email}
        onChange={handleEmail}//e=>setEmail(e.target.value)}
      />

      <TextInput
        style={styles.inputbox}
        placeholder="password"
        //value={this.formData.password}
      />

      <TextInput
        style={styles.inputbox}
        placeholder="confirm password"
      />

      <Link to="/createprofile">
      <Pressable
        style={styles.buttons}
        onPress={submit}>
        <Text style={styles.buttonsText}>Sign Up</Text>
      </Pressable>
      </Link>
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