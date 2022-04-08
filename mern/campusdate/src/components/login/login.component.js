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

/**
 *  Checking for login information 
 */
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
    /**
     * Front end visualization for Login page
     * Contains text input for email and password
     * Submit button goes to profile page
     */
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
