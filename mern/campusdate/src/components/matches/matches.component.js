
import './matches.css';
import { ListGroup, Container, Figure, Row, Col } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png"
import axios from 'axios';


const DataTable = props => (
            <tr>
                <td>
                    {props.obj._id}
                </td>
            </tr>
)

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

export default class Matches extends Component {
  constructor(props) {
      super(props);
      this.state = { usersCollection: [] };
  }
  componentDidMount() {
    const getMatches = axios.get('http://localhost:5000/matches')
    const getUsers = axios.get('http://localhost:5000/users')
    const loginEmail = "abc@email.com"
          axios.all([getMatches, getUsers]).then(axios.spread((...responses) => {
            const allMatches = responses[0].data;
            const allUsers = responses[1].data;
            // get all emails of valid matches
            var matchEmails = [];
            for(let i in allMatches){
              if(allMatches[i]["from_email"] == loginEmail){
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
            // get contact info from emails
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
  matchesList(){
      return this.state.usersCollection.map((data, i) => {
          return <MatchesList obj={data} key={i} />;
      });    
  }
  dataTable() {
      return this.state.usersCollection.map((data, i) => {
          return <DataTable obj={data} key={i} />;
      });
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
         <h1 class="m-3">Matches</h1>
         <Container>
         <ListGroup class="m-4">
           {this.matchesList()}
         </ListGroup>
         </Container>


      </body>
      </main>
    )
  }
}