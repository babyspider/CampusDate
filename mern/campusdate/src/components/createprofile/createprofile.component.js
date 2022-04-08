
import './createprofile.css';
import { Accordion, Button, ButtonGroup, Container, Figure, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png";
import axios from 'axios';
import { useLocalStorage } from "../../useLocalStorage";
const FormData = require('form-data')

export default class CreateProfile extends Component{
  constructor(props) {
      super(props);
      const signupEmail = localStorage.getItem("email");
      const signupPwd = localStorage.getItem("password");
      this.state = { signupEmail: signupEmail, signupPwd: signupPwd, hobbies: [], getChecked: [], signupForm: {} };
  }
  componentDidMount() {
    
    
    // this.setState({getChecked: [checked, setChecked]})
    //arbitrary list of preferences
    const getHobbies = axios.get('http://localhost:5000/preferences/find/abc@email.com')
          axios.all([getHobbies]).then(axios.spread((...responses) => {
            const gotHobbies = responses[0].data[0];
            // console.log(gotHobbies);
            // get all emails of valid matches
            var allHobbies = [];
            for(var i in gotHobbies){
              if(i != "email" && i != "_id"){
                allHobbies.push(i);
              }
            }
            // get contact info from emails
            this.setState({ hobbies: Array.from(allHobbies) })
            // console.log(this.state)
          }))
          .catch(function (error) {
              console.log(error);
          })
  }
  postuser() {
    var userData = {};
    userData['email'] = this.state.signupEmail;
    userData['password'] = this.state.signupPwd;
    userData["name"] = document.getElementById("displayname").value;
    userData["desc"] = document.getElementById("blurb").value;
    userData["age"] = document.getElementById("age").value;
    userData["pictures"] = [ document.getElementById("displayimg").value ];
    var userStr = 'http://localhost:5000/users/create';

    var prefData = {};
    prefData['email'] = this.state.signupEmail;
    for(let i in this.state.hobbies){
      var hobbyval = document.getElementById(this.state.hobbies[i]).checked
      prefData[this.state.hobbies[i]] = hobbyval;
    }    
    var prefStr = 'http://localhost:5000/preferences/create';

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

  Toggle_checkbox=()=>{
    this.setState({check:!this.state.check});
  }


  render(){
    return (
     <main>
     <head>
     </head>
     <body>
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

            {/* <Form.Group>
               <Form.Label>Major</Form.Label>
               <Form.Select id="major" aria-label="Default select example">
                  <option value="1">Major1</option>
                  <option value="2">Major2</option>
                  <option  value="3">Major3</option>
               </Form.Select>
            </Form.Group> */}

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
              <Form.Control type="text" id="displayimg" aria-describedby="displayimgdesc" placeholder="Enter name"/>
              <Form.Text className="text-muted" id="displayimgdesc">Image URL</Form.Text>
            </Form.Group>

            {/*         <Form.Group>
                    <input class="form-control" type="file"/>
                 </Form.Group>
                 <Container className="profileimages-container">
                 <ButtonGroup className="mb-2">
                 {images.map((image, idx) => (
                 <ToggleButton
                   key={idx}
                   id={`image-${idx}`}
                   className="rounded profileimages-select"
                   type="radio"
                   variant="outline-primary"
                   name="images"
                   value={image.value}
                   checked={radioValue === image.value}
                   onChange={(e) => setRadioValue(e.currentTarget.value)}
                 >
                   <Figure.Image className="profileimages-image" src={`${image.src}`}/>
                 </ToggleButton>
                 ))}
                 </ButtonGroup>
                 </Container> */}


        
            <Button onClick={() => this.postuser()}>Confirm Changes</Button>
        </Form>
      </Container>
      </body>
      </main>
    )
  }
}


