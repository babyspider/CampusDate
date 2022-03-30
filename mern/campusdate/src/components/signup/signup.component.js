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

export default function Signup() {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>

      <TextInput
        style={styles.inputbox}
        placeholder="email"
        keyboardType = "email-address"
      />

      <TextInput
        style={styles.inputbox}
        placeholder="password"
      />

      <TextInput
        style={styles.inputbox}
        placeholder="confirm password"
      />

      <Link to="/createprofile">
      <Pressable
        style={styles.buttons}
        onPress={() => Alert.alert('Signing Up')}>
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