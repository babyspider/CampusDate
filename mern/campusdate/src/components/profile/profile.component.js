import './listofprofiles.css';
// import * as React from 'react';
import React, { Component, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Alert, SafeAreaView, TouchableOpacity, Image, ScrollView, Pressable, Dimensions, useState} from 'react-native';
// import { ScrollView } from 'react-native';
import { Accordion, Button, ButtonGroup, Container, Figure, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import placeholder from "../assets/placeholder.png"
import axios from 'axios';

import { Link } from "react-router-dom";

const DataTable = props => (
    <div class="col-lg-4 matchedOnPadding"> {/* padding = spacing b/t the form boxes */}
      <Form.Control class = "form-control text-center" type="text"  placeholder={props.obj} disabled></Form.Control>
    </div>
)

export default class ListProfiles extends Component {
  constructor(props) {
      super(props);
      this.state = { userEmail: "", userInfo: {}, userHobbies: {} };
  }
  componentDidMount() {
    const loginEmail = "jkl@email.com"
    const getMatches = axios.get('http://localhost:5000/matches')    
    const getPreferences = axios.get('http://localhost:5000/preferences')
    const userPreferences = axios.get('http://localhost:5000/preferences/find/' + loginEmail);
          axios.all([getMatches, getPreferences, userPreferences])
          .then(axios.spread((...responses) => {
            const allMatches = responses[0].data;
            const allPreferences = responses[1].data;
            const myPreferences = responses[2].data[0];
            // get all emails of previously viewed users
            var pastUsers = [];
            for(let i in allMatches){
              if(allMatches[i]["from_email"] == loginEmail){
                const pastUser = allMatches[i]["to_email"];
                pastUsers.push(pastUser);
              }
            }
            // console.log(pastUsers)
            // get list, total number of possible hobbies
            var numMatches = {};
            var listPreferences = Object.keys(allPreferences[0]);
            listPreferences.shift();
            listPreferences.shift();
            // create dict for matching hobbies
            var numPreferences = listPreferences.length;
            while(numPreferences > -1){
              numMatches[numPreferences] = [];
              numPreferences--;
            }
            // get preference info from unviewed users; set in numMatches and userHobbies     
            var userHobbies = []      
            for(let i in allPreferences){
              if(!pastUsers.includes(allPreferences[i]["email"]) && allPreferences[i]["email"] != loginEmail){
                var numCommon = 0;
                userHobbies[allPreferences[i]["email"]] = []           
                for(let j in listPreferences){
                  if(allPreferences[i][listPreferences[j]]){
                    userHobbies[allPreferences[i]["email"]].push(listPreferences[j]);
                  }
                  if(myPreferences[listPreferences[j]] && allPreferences[i][listPreferences[j]] == myPreferences[listPreferences[j]]){
                    numCommon++;
                  }                  
                }
                numMatches[numCommon].push(allPreferences[i]["email"]);
              }
            }
            // console.log(numMatches);
            // get hobby and profile info on top user
            numPreferences = listPreferences.length;
            while(numPreferences > -1 && numMatches[numPreferences].length == 0){
              numPreferences--;
            }
            this.setState({ userEmail: numMatches[numPreferences][0] });
            this.setState({ userHobbies: userHobbies[numMatches[numPreferences][0]]});
            var getUser = "http://localhost:5000/users/get/" + numMatches[numPreferences][0];
            return axios.get(getUser);
          })).then( response => {
            this.setState({ userInfo: response.data });
            return this.state
          }).catch(function (error) {
              console.log(error);
          })
  }
  
  hobbies() {
    var hobbys = Array.from(this.state.userHobbies);
    console.log(hobbys);
      return hobbys.map((data, i) => {
          return <DataTable obj={data} key={i} />;
      });
  }

  render() {


  const hobbies = [ {name:'hobby1', value:1}, {name:'hobby2', value:2}, {name:'hobby3', value:3},{name:'hobby4', value:4}, {name:'hobby5', value:5},{name:'hobby6', value:6},{name:'hobby7', value:7},{name:'hobby8', value:8},{name:'hobby9', value:9}]

  return(

    <main>
      <head>
     </head>
      <body>
        <Container>
          <ScrollView contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                      }}>
            <Figure.Image className="mx-auto d-block profileimages-image img-fluid" style = {{justifyContent: 'flex-center'}} src={require('../assets/anonprofile.png')}/>
            
            {/* might want to put name here of person lol */}
            {/* {this.matchesList()} */}
            {/* buttons for matching >> left = dont want to match, right = want to match */}

  <Container>
  <Text className = "profileText">
    {this.state.userInfo.name}
  </Text>
    <Form>
      <Form.Group className = "hobbiesFormatting">
      <div class = "row matchedOnPadding">
      {this.hobbies()}
      </div>
      </Form.Group>
    </Form>
  <Text className = "profileText">
    {this.state.userInfo.desc}
  </Text>
  </Container>

          <div class = "btn-group d-flex matchButtonPadding" role = "group" aria-label='buttons for matching'>
            <button type = "button" className = "btn btn-circle"><Figure.Image className = "customNavImage" src={require('../assets/xIcon.png')}></Figure.Image></button>
            <button type = "button" className = "btn btn-circle2"><Figure.Image className = "customNavImage" src={require('../assets/heartIcon.png')}></Figure.Image></button>
          </div>
          

         

          </ScrollView>

          
        </Container>

      </body>

       {/* navigational buttons at bottom of the page w/ links, class has info of aesthetics of buttons */}
       <div class="btn-group d-flex customNavBar" role="group" aria-label="navigational buttons">
            <a href = "/editprofile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/settingIcon.png')}></Figure.Image></a>
            <a href = "/profile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/profileIcon.png')}></Figure.Image></a>
            <a href = "/matches" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/chatIcon.png')}></Figure.Image></a>
        </div>

       
    </main>

  )
  
  }

}
