import './listofprofiles.css';
import React, { Component} from "react";
import { Text, ScrollView} from 'react-native';
import {Container, Figure, Form} from "react-bootstrap";
import axios from 'axios';
import { faker } from '@faker-js/faker';

const DataTable = props => (
    <div class="col-lg-4 matchedOnPadding"> {/* padding = spacing b/t the form boxes */}
      <Form.Control class = "form-control text-center" type="text"  placeholder={props.obj} disabled></Form.Control>
    </div>
)

export default class ListProfiles extends Component {
  /**
   * Sets state for default user (user who is currently logged in)
   */
  constructor(props) {
      super(props);
      // TEST DATA
      const loginEmail = localStorage.getItem("email");
      this.state = { loginEmail: loginEmail, userEmail: "", userInfo: {}, userHobbies: {} };
  }
  componentDidMount() {    
    // TEST DATA
      var testUsers = []
      for(let i = 0; i < 5; i++){
        testUsers.push(faker.internet.email())
      }
    //TEST MATCHES DATA
      var testMatches = []
      for(let i in testUsers){      
        if(faker.datatype.boolean()){
          var testmatch = { "from_email" : testUsers[i], "to_email" : this.state.loginEmail, "is_match" : faker.datatype.boolean() };
          testMatches.push(testmatch);
        }
        if(faker.datatype.boolean()){
          var testmatch = { "from_email" : this.state.loginEmail, "to_email" : testUsers[i], "is_match" : faker.datatype.boolean() };
          testMatches.push(testmatch);
        }
        for(let j in testUsers){
          if(faker.datatype.boolean() && i != j){
            var testmatch = { "from_email" : testUsers[i], "to_email" : testUsers[j], "is_match" : faker.datatype.boolean() };
            testMatches.push(testmatch);
          }
        }
      }
      console.log(testMatches);
    //TEST PREFERENCES DATA
      var testPreferences = []
      for(let i in testUsers){
         var userPrefs = { email : testUsers[i],
          "anime" : faker.datatype.boolean(),
          "art" : faker.datatype.boolean(),
          "cooking" : faker.datatype.boolean(),
          "reading" : faker.datatype.boolean(),
          "sports" : faker.datatype.boolean(),
          "videogames" : faker.datatype.boolean()
        };
        testPreferences.push(userPrefs);
      }
      console.log(testPreferences);
      var loginUserPrefs = { email : this.state.loginEmail,
        "anime" : faker.datatype.boolean(),
        "art" : faker.datatype.boolean(),
        "cooking" : faker.datatype.boolean(),
        "reading" : faker.datatype.boolean(),
        "sports" : faker.datatype.boolean(),
        "videogames" : faker.datatype.boolean()
      };
      console.log(loginUserPrefs);
      const allMatches = testMatches;
      const allPreferences = testPreferences;
      const myPreferences = loginUserPrefs;
    /**
     * Getting user information from various pages 
     */
    const loginEmail = this.state.loginEmail
    const getMatches = axios.get('http://localhost:5000/matches')    
    const getPreferences = axios.get('http://localhost:5000/preferences')
    const userPreferences = axios.get('http://localhost:5000/preferences/find/' + loginEmail);
          axios.all([getMatches, getPreferences, userPreferences])
          .then(axios.spread((...responses) => {
            const allMatches = responses[0].data;
            const allPreferences = responses[1].data;
            const myPreferences = responses[2].data[0];
            console.log(allMatches);
            console.log(allPreferences);
            console.log(myPreferences);
            /** 
             * Get all emails of previously viewed users/users that have already rejected current user 
             */
            var pastUsers = [];
            var numMatches = responses[1].data.length;
            for(let i in allMatches){
              if(allMatches[i]["from_email"] == loginEmail){
                const pastUser = allMatches[i]["to_email"];
                if(!pastUsers.includes(pastUser)){
                  pastUsers.push(pastUser);
                  numMatches--;                  
                }
              }else if(allMatches[i]["to_email"] == loginEmail && !allMatches[i]["is_match"]){
                const pastUser = allMatches[i]["from_email"];
                if(!pastUsers.includes(pastUser)){
                  pastUsers.push(pastUser);
                  numMatches--;                  
                }               
              }
            }
            if(numMatches != 1){

              /**
               *  Get a list for total number of possible hobbies
               */ 
              var hobbiesMatch = {};
              var listPreferences = Object.keys(allPreferences[0]);
              listPreferences.shift();
              listPreferences.shift();
              // create dict for matching hobbies
              var numPreferences = listPreferences.length;
              while(numPreferences > -1){
                hobbiesMatch[numPreferences] = [];
                numPreferences--;
              }
              /**
               * Get preference info from unviewed users; 
               * Set in hobbiesMatch and userHobbies 
               */    
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
                  hobbiesMatch[numCommon].push(allPreferences[i]["email"]);
                }
              }

              /**
               * Get hobby and profile info on top user 
               */
              numPreferences = listPreferences.length;
              while(numPreferences > -1 && hobbiesMatch[numPreferences].length == 0){
                numPreferences--;
              }
              console.log(hobbiesMatch);
              this.setState({ userEmail: hobbiesMatch[numPreferences][0] });
              this.setState({ userHobbies: userHobbies[hobbiesMatch[numPreferences][0]]});
              var getUser = "http://localhost:5000/users/get/" + hobbiesMatch[numPreferences][0];
              return axios.get(getUser);
            }else{
              this.setState({ userEmail: this.state.loginEmail });
              this.setState({ userHobbies: [] });   
              var getUser = "http://localhost:5000/users/get/" + this.state.userEmail;
              return axios.get(getUser);        
            }
          })).then( response => {
            if(response.data[0]["email"] == this.state.loginEmail){
              var noUserInfo = response.data[0];
              noUserInfo["name"] = "No potential matches remaining";
              noUserInfo["pictures"] = [require('../assets/anonprofile.png')];
              noUserInfo["desc"] = "Why not recommend our app? :)";
              this.setState({ userInfo: noUserInfo});
            }else{
              this.setState({ userInfo: response.data[0]});            
            }
            return this.state
          }).catch(function (error) {
              console.log(error);
          })
 }
  
  /**
   * Checks and sets whether a user has hearted or "x-ed" another user 
   */ 
  postmatch(isMatch) {
    if(isMatch){
      var postStr = 'http://localhost:5000/matches/create/' + this.state.loginEmail +
      '/' + this.state.userEmail + '/true'
      axios.post(postStr).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });       
    }else{
      var postStr = 'http://localhost:5000/matches/create/' + this.state.loginEmail +
      '/' + this.state.userEmail + '/false'
      axios.post(postStr).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }); 
    }
    window.location.reload(false);
  
  }

  /**
   *  Getting list of hobbies for user that was selected during create profile / edit profile 
   */
  hobbies() {
    var hobbys = Array.from(this.state.userHobbies);
      return hobbys.map((data, i) => {
          return <DataTable obj={data} key={i} />;
      });
  }

  render() {

  return(

    <main>
      <head>
     </head>
      <body>
 
      <Container> 

      <Figure.Image className="mx-auto d-block profileimages-image img-fluid" style = {{justifyContent: 'flex-center'}} src={`${this.state.userInfo.pictures}`}/>
      
      {/**
       *  Creating container for name, matched on hobbies, and user description 
       */}
      <p class = "text-center" style = {{fontSize: 30}}>
        {this.state.userInfo.name}
      </p>
        <Form>
          <Form.Group className = "hobbiesFormatting">
          <div class = "row matchedOnPadding">
          {this.hobbies()}
          </div>
          </Form.Group>
        </Form>
      <Container>
        <ScrollView>
          <Text style = {{fontSize: 18}}>
            {this.state.userInfo.desc}
          </Text>
        </ScrollView>
      </Container>

          {/**
           * Button for matching preferences
           * Left button ("x") means current user does not want to match
           * Right button (heart) means current user wants to match
          */}
          
          <div class = "btn-group d-flex matchButtonPadding" role = "group" aria-label='buttons for matching'>
            <button type = "button" onClick={() => this.postmatch(false)} className = "btn btn-circle"><Figure.Image className = "customNavImage" src={require('../assets/xIcon.png')}></Figure.Image></button>
            <button type = "button" onClick={() => this.postmatch(true)} className = "btn btn-circle2"><Figure.Image className = "customNavImage" src={require('../assets/heartIcon.png')}></Figure.Image></button>

          </div>

          </Container>

      </body>

       {/**
        *  Navigational buttons at bottom of the page w/ links, class has info of aesthetics of buttons
        *  Links go to edit profile, profile, and matches page
        */}
       <div class="btn-group d-flex customNavBar" role="group" aria-label="navigational buttons">
          <a href = "" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/settingIcon.png')}></Figure.Image></a>
          <a href = "/profile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/profileIcon.png')}></Figure.Image></a>
          <a href = "/matches" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/chatIcon.png')}></Figure.Image></a>
        </div>

       
    </main>

  )
  
  }

}
