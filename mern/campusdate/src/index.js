import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.component";
import Profile from "./components/profile/profile.component";
import EditProfile from "./components/editprofile/editprofile.component";
import CreateProfile from "./components/createprofile/createprofile.component";
import Matches from "./components/matches/matches.component";
import Signup from "./components/signup/signup.component"

import GetMatches from "./components/routeTesting/get-match"
import PostMatches from "./components/routeTesting/create-match"


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />  
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="profile" element={<Profile />} />
    <Route path="test1" element={<GetMatches />} /> 
    <Route path="test2" element={<PostMatches />} /> 
    <Route path="editprofile" element={<EditProfile />} />
    <Route path="createprofile" element={<CreateProfile />} />
    <Route path="matches" element={<Matches />} />
    <Route path="test1" element={<GetMatches />} /> 
  </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
