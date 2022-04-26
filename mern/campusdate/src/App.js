import './App.css';
import * as React from 'react';
import { Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Text, View, StyleSheet, Pressable} from 'react-native';


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

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