import './login.css';
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

async function loginUser(credentials){
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data=>data.json())
}

export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    <View className="background">
      <Text className="title">CampusDate</Text>
      <TextInput
        className="inputbox"
        keyboardType = "email-address"
        placeholder="email"
        autoCorrect = {false}
        onChange={e => setUserName(e.target.value)}
      />

      <TextInput
        className="inputbox"
        autoCorrect={false}
        placeholder="password"
        secureTextEntry = {true}
        onChange={e => setPassword(e.target.value)}
        />

      <Link to="/profile">
      <Pressable
        className="buttons"
        onPress={handleSubmit} type = "submit">
        <Text className="buttonsText"}>Login</Text>
      </Pressable>
      </Link>
    </View>
  );
}
