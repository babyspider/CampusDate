import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import { useLocalStorage } from "../../useLocalStorage";

async function loginUser(username,password){
  await axios.get("http://localhost:5000/users/login/"+username+":"+password)
  .then( response => {
      if(response.data.length == 1){
        localStorage.setItem("email",username);
        localStorage.setItem("password",password);
        window.location.href = "http://localhost:3000/profile";      
      }else{
        document.getElementById("errormsg").innerHTML = "ERROR: Incorrect Email or Password!";
      }
  })
};

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    
    e.preventDefault();
    console.log(e.target);
    const token = await loginUser(username,password);
    
    setToken(token);
    console.log(token);

    return token;
  }

  return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>
      <TextInput
        style={styles.inputbox}
        keyboardType = "email-address"
        placeholder="email"
        autoCorrect = {false}
        onChange={e => setUserName(e.target.value)}
      />

      <TextInput
        style={styles.inputbox}
        autoCorrect={false}
        placeholder="password"
        secureTextEntry = {true}
        onChange={e => setPassword(e.target.value)}
        />

      <Link to="/profile">
      <Pressable
        style={styles.buttons}  
        onPress={handleSubmit} type = "submit">
        <Text style={styles.buttonsText}>Login</Text>
      </Pressable>
      </Link>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};