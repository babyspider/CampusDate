import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login.component";
import Profile from "./components/profile/profile.component";
import EditProfile from "./components/editprofile/editprofile.component";
import Test from "./components/expresstesting/routerTest"


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />  
    <Route path="login" element={<Login />} />
    <Route path="profile" element={<Profile />} />
    <Route path="test" element={<Test />} /> 
    <Route path="editprofile" element={<EditProfile />} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
