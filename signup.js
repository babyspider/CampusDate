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
import Constants from 'expo-constants';

const formData = {
  email: this.state.email,
  password: this.state.password,
}

export default function App() {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>CampusDate</Text>

      <TextInput
        style={styles.inputbox}
        placeholder="email"
        keyboardType = "email-address"
        type="email"
        id="email"
        value={this.state.email}
      />

      <TextInput
        style={styles.inputbox}
        placeholder="password"
        type="password"
        id="password"
        value={this.state.password}
      />
      
      <TextInput
        style={styles.inputbox}
        placeholder="confirm password"
      />

      <Pressable
        style={styles.buttons}
        onPress={() => axios({
          method: 'post',
          url: 'http://apollo.arcator.co.uk:5000/register',
          data: formData,
          config: {headers: {'Content-Type': 'multipart/form-data'}}
        })}>
        <Text style={styles.buttonsText}>Sign Up</Text>
      </Pressable>
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
