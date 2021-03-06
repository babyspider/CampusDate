
import './matches.css';
import { ListGroup, Container, Figure, Row, Col } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png"
import axios from 'axios';

import { faker } from '@faker-js/faker';



const DataTable = props => (
  <tr>
      <td>
          {props.obj._id}
      </td>
  </tr>
)

/**
 * Frontend visualization for matches
 * Outputs the match name and email 
 */
const MatchesList = props => (
  <ListGroup.Item className="matches-item" variant="outline-primary">
     <Row>
       <Col>
         <Figure.Image className="matches-image p-2" src={`${props.obj.image}`}/>
       </Col>
       <Col xs={9}>
         <span class="matches-name">{props.obj.name}</span>
         <br/>
         <span class="matches-email">{props.obj.email}</span>
       </Col>
     </Row>
  </ListGroup.Item>
)

/**
 * Frontend visualization when there are no matches 
 */
const EmptyMatchesList = props => (
  <ListGroup.Item className="matches-item" variant="outline-primary"><h2 class="m-3">No matches (yet!)</h2></ListGroup.Item>
)

export default class Matches extends Component {
  constructor(props) {
      super(props);
      // TEST DATA
      // const loginEmail = faker.internet.email();
      const loginEmail = localStorage.getItem("email");
      this.state = {  loginEmail: loginEmail, usersCollection: [] };
  }
  componentDidMount() {
    //TEST USERS DATA
      var testUsers = []
      for(let i = 0; i < 5; i++){
        var tempEmail = faker.internet.email();
        var tempName = faker.name.firstName();
        var tempUser = {
          "email" : tempEmail,
          "age" : faker.datatype.number({ min: 18, max: 100 }),
          "desc" : "This is " + tempName,
          "name": tempName,
          "password": faker.random.alphaNumeric(5),
          "pictures": [ faker.image.people() ]
        }
        testUsers.push(tempUser);
        
      }
    //TEST MATCHES DATA
      var testMatches = []
      for(let i in testUsers){      
        if(faker.datatype.boolean()){
          var testmatch = { "from_email" : testUsers[i]["email"], "to_email" : this.state.loginEmail, "is_match" : faker.datatype.boolean() };
          testMatches.push(testmatch);
        }
        if(faker.datatype.boolean()){
          var testmatch = { "from_email" : this.state.loginEmail, "to_email" : testUsers[i]["email"], "is_match" : faker.datatype.boolean() };
          testMatches.push(testmatch);
        }
        for(let j in testUsers){
          if(faker.datatype.boolean() && i != j){
            var testmatch = { "from_email" : testUsers[i]["email"], "to_email" : testUsers[j]["email"], "is_match" : faker.datatype.boolean() };
            testMatches.push(testmatch);
          }
        }
      }
      console.log(testUsers)
      const allMatches = testMatches;
      const allUsers = testUsers;

    const getMatches = axios.get('http://localhost:5000/matches')
    const getUsers = axios.get('http://localhost:5000/users')
          axios.all([getMatches, getUsers]).then(axios.spread((...responses) => {
            const allMatches = responses[0].data;
            const allUsers = responses[1].data;
            /**
             * Gets emails of valid matches for specific user 
             * Valid matches mean both users have hearted each other 
             */
            var matchEmails = [];
            for(let i in allMatches){
              if(allMatches[i]["from_email"] == this.state.loginEmail){
                const reciprocate = allMatches[i]["to_email"];
                var isreciprocate = false;
                for(let j in allMatches){
                  if(allMatches[j]["from_email"] == reciprocate && allMatches[j]["to_email"] == allMatches[i]["from_email"]){
                    isreciprocate = true;
                  }
                }
                if(isreciprocate){
                  matchEmails.push(reciprocate);
                }
              }
            }

            /**
             * Get contact info from emails 
             */
            var matchInfo = []
            for(let i in matchEmails){
              for(let j in allUsers){
                if(matchEmails[i] == allUsers[j]["email"]){
                  const image = placeholder
                  matchInfo.push({"name" : allUsers[j]["name"], "email": allUsers[j]["email"], "image": allUsers[j]["pictures"]});
                  break;
                }
              }
            }            
            this.setState({ usersCollection: matchInfo });
            console.log(this.state)
          }))
          .catch(function (error) {
              console.log(error);
          })
  }

  /**
   *  Returns all matches for a user 
   */
  matchesList(){
    // console.log(this.state.usersCollection.length);
      if(this.state.usersCollection.length != 0){
        return this.state.usersCollection.map((data, i) => {
            return <MatchesList obj={data} key={i} />;
        });
      }else{
        console.log(this.state.usersCollection.length);
        return <EmptyMatchesList />
      }   
  }

  render() {
  // const [checked, setChecked] = useState(false);
  // const [radioValue, setRadioValue] = useState('1');
  const matches = [ {src: placeholder, name: "Jeff", email: "jeff@email.com"},
  {src: placeholder, name: "John", email: "john@email.com"},
  {src: placeholder, name: "Joe", email: "joe@email.com"}]
    return (
     <main>
     <head>
     </head>
     <body>
          {/**
           * Matches name and email is stored in container
           * Visualization for match display
           */}
         <h1 class="m-3">Matches</h1>
         <Container>
         <ListGroup class="m-4 matchesPadding">
           {this.matchesList()}
         </ListGroup>
         </Container>


      </body>

      {/**
       * Navigational buttons at the bottom of the screen
       * Has links to edit profile, profile, and matches page 
       */}

      <div class="btn-group d-flex customNavBar" role="group" aria-label="navigational buttons">
          <a href = "/editprofile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/settingIcon.png')}></Figure.Image></a>
          <a href = "/profile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/profileIcon.png')}></Figure.Image></a>
          <a href = "/matches" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/chatIcon.png')}></Figure.Image></a>
      </div>

      </main>
    )
  }
}