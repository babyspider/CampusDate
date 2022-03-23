import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <div>"Welcome to the CampusDate prototypes!"
      <nav class="navbar navbar-expand-lg">
        <Link class="nav-link" to="/login">Login</Link> {" "}
        <Link class="nav-link" to="/profile">Profile</Link> {" "}
        <Link class="nav-link" to="/test">Testing Express</Link> 
        <Link class="nav-link" to="/editprofile">Edit Profile</Link></nav>
      </div> 
    );
  }
}

export default App;