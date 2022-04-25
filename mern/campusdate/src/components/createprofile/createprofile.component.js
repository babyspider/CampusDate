
import './createprofile.css';
import { Accordion, Button, ButtonGroup, Container, Figure, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png";
import axios from 'axios';
const FormData = require('form-data')

export default class CreateProfile extends Component{
  constructor(props) {
      super(props);
      const signupEmail = localStorage.getItem("email");
      const signupPwd = localStorage.getItem("password");
      this.state = { signupEmail: signupEmail, signupPwd: signupPwd, hobbies: [], getChecked: [], signupForm: {} };
  }
  componentDidMount() {
    const getHobbies = axios.get('http://localhost:5000/preferences/find/abc@email.com')
          axios.all([getHobbies]).then(axios.spread((...responses) => {
            const gotHobbies = responses[0].data[0];
          
            var allHobbies = [];
            for(var i in gotHobbies){
              if(i != "email" && i != "_id"){
                allHobbies.push(i);
              }
            }
            this.setState({ hobbies: Array.from(allHobbies) })
          
          }))
          .catch(function (error) {
              console.log(error);
          })
  }

  /** 
  * Stores user information for each user, allows for user information retrieval 
  */
  postuser() {
    var userData = {};
    userData["name"] = document.getElementById("displayname").value;
    userData["desc"] = document.getElementById("blurb").value;
    userData["age"] = document.getElementById("age").value;
    userData["pictures"] = document.getElementById("displayimg").value;
    var userStr = 'http://localhost:5000/users/create';

    /**
     * Getting user preferences
     * If user checks button for hobby, hobby gets added into empty obj
     */
    var prefData = {};
    prefData['email'] = this.state.signupEmail;
    for(let i in this.state.hobbies){
      var hobbyval = document.getElementById(this.state.hobbies[i]).checked
      prefData[this.state.hobbies[i]] = hobbyval;
    }    
    var prefStr = 'http://localhost:5000/preferences/create';

    /**
     * Error checking for user inputs 
     */
    var hasBlank = false;
    for(let i in userData){
      if(!userData[i]){
        hasBlank = true;
        console.log(i);
      }
    }
    if(hasBlank){
      document.getElementById("errormsg").innerHTML = "ERROR: One or more fields missing!";
    }else{
      userData['email'] = this.state.signupEmail;
      userData['password'] = this.state.signupPwd;
      userData["pictures"] = [ document.getElementById("displayimg").value ];
      axios.post(prefStr, prefData).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });     
      axios.post(userStr, userData).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      window.location.href = "http://localhost:3000/profile";          
    }
 
  // window.location.href = "http://localhost:3000/profile";
  }

  Toggle_checkbox=()=>{
    this.setState({check:!this.state.check});
  }


  render(){
    return (
     <main>
     <head>
     </head>
     <body>

          {/**
           * Bootstrap/JS for creating frontend intereface for "create profile" page 
           * Has Forms for name, description, age, hobbies, profile image
           * User input will be inputted into user object 
          */}

         <h1>Create Profile</h1>
         <Container>

         <Form onSubmit={() => this.postuser}>
            <Form.Group>
            <Form.Label>Display name</Form.Label>
            <Form.Control type="text" id="displayname" aria-describedby="displaynamedesc" placeholder="Enter name"
            value={this.state.signupForm.name}/>
            <Form.Text id="displaynamedesc" className="text-muted">Your preferred name, to be displayed on your profile.</Form.Text>
            </Form.Group>

            <Form.Group>
            <Form.Label>Description</Form.Label >
            <Form.Control as="textarea" id="blurb" aria-describedby="blurbdesc" placeholder="Enter description"></Form.Control>
            <Form.Text id="blurbdesc" class="form-text text-muted">Your profile description. All about you!</Form.Text>
            </Form.Group>

            <Form.Group>
            <Form.Label>Age</Form.Label >
            <Form.Control type="number" min="18" max="80" id="age" placeholder="Age"/>
            </Form.Group>

            {/**
             * Hobbies section are checkboxes, users may select which interest they have
             * Checked hobbies get added into user obj
            */}
            
            <Form.Group className="my-2">
                   <Accordion defaultActiveKey="0">
                     <Accordion.Item eventKey="0">
                       <Accordion.Header>Hobbies</Accordion.Header>
                       <Accordion.Body className="hobbyaccordion">
                         <ToggleButtonGroup id="hobbies" className="mb-2" type="checkbox">
                         {this.state.hobbies.map((hobby) => (
                         <ToggleButton
                           id={hobby}
                           className="mx-1 rounded"
                           type="checkbox"
                           variant="outline-primary"
                           checked={this.state.getChecked.checked}
                           value={hobby}
                           onChange={(e) => this.Toggle_checkbox}
                         >
                         {hobby}
                         </ToggleButton>
                         ))}
                         </ToggleButtonGroup>
                       </Accordion.Body>
                     </Accordion.Item>
                   </Accordion>
            </Form.Group>

            <Form.Group>
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="text" id="displayimg" aria-describedby="displayimgdesc" placeholder="Enter image link"/>
              <Form.Text className="text-muted" id="displayimgdesc">Image URL</Form.Text>
            </Form.Group>

            {/**
             * Button allows for submission of user inputs into the user obj
            */}
            
            <Button onClick={() => this.postuser()}>Confirm Changes</Button>
            <span id="errormsg"></span>

        </Form>
      </Container>
      </body>
      </main>
    )
  }
}


