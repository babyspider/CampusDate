
import './matches.css';
import { ListGroup, Container, Figure, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png"

export default function Matches() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
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
         <ListGroup class="m-4" defaultActiveKey="#link1">
             {matches.map((hobby, idx) => (
             <ListGroup.Item
               id={`hobby-${idx}`}
               className="matches-item"
               variant="outline-primary"
               checked={checked}
               value={hobby.value}
             >
             <Row>
             <Col>
             <Figure.Image className="matches-image p-2" src={`${hobby.src}`}/>
             </Col>
             <Col xs={9}>
             <span class="matches-name">{hobby.name}</span>
             <br/>
             <span class="matches-email">{hobby.email}</span>
             </Col>
             </Row>
             </ListGroup.Item>
             ))}
        </ListGroup>
        </Container>


</body>
      </main>
    );
}