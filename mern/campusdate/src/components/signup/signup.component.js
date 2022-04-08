import './signup.css';
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
import { useLocalStorage } from "../../useLocalStorage";

const axios = require('axios').default;




export default function Signup() {


  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");

  function handleEmail(event){
    setEmail(event.target.value);
  }

  function handlePass(event){
    setPassword(event.target.value);
  }

  function submit(){
    var formData = new FormData();
    formData.append('email',email);
    axios({
      method: "POST",
      url: "https://localhost:5000/user/register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function(response){
      console.log(response);
      localStorage.setItem("email",email);
      localStorage.setItem("password",password);
    }).catch(function(response){
      console.log(response);
    });
  }

  return (
    <View className="background">
      <Text className="title">CampusDate</Text>

      <TextInput
        className="inputbox"
        placeholder="email"
        keyboardType = "email-address"
        //value={this.state.email}
        onChange={handleEmail}
        //e=>setEmail(e.target.value)}
      />

      <TextInput
         className="inputbox"
        placeholder="password"
        //value={this.formData.password}
        onChange={handlePass}
      />

      <TextInput
         className="inputbox"
        placeholder="confirm password"
      />

      <Link to="/createprofile">
      <Pressable
         className="buttons"
        onPress={submit}>
        <Text className="buttonsText">Sign Up</Text>
      </Pressable>
      </Link>
    </View>
  );
}
