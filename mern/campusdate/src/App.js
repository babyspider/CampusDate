import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>"Welcome to the CampusDate prototypes!"
      <nav><Link to="/login">Login</Link> {" "}
      <Link to="/profile">Profile</Link> {" "}
      <Link to="/editprofile">Edit Profile</Link></nav>
      </div> 
    );
  }
}

export default App;