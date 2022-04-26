
import './editprofile.css';
import { Accordion, Button, ButtonGroup, Container, Figure, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import React, {  useState } from "react";

export default function EditProfile() {
  /**
   * Setting default values for items
   */
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const hobbies = [ {name:'hobby1', value:1}, {name:'hobby2', value:2}, {name:'hobby3', value:3} ]
  const images = [ {src: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw663570cc/images/products/flowers/01898g_01_zohar.jpg?sw=387&cx=403&cy=58&cw=1000&ch=1000', value: 1},
  {src: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw663570cc/images/products/flowers/01898g_01_zohar.jpg?sw=387&cx=403&cy=58&cw=1000&ch=1000', value: 2},
  {src: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw663570cc/images/products/flowers/01898g_01_zohar.jpg?sw=387&cx=403&cy=58&cw=1000&ch=1000', value: 3},
  {src: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw663570cc/images/products/flowers/01898g_01_zohar.jpg?sw=387&cx=403&cy=58&cw=1000&ch=1000', value: 4},
    {src: 'https://www.johnnyseeds.com/dw/image/v2/BBBW_PRD/on/demandware.static/-/Sites-jss-master/default/dw663570cc/images/products/flowers/01898g_01_zohar.jpg?sw=387&cx=403&cy=58&cw=1000&ch=1000', value: 5}]
    return (
     <main>
     <head>
     </head>
     <body>
         <h1>Edit Profile</h1>
         <Container>

          {/**
           * Bootstrap/JS for creating frontend intereface for "edit profile" page 
           * Has Forms for name, description, age, major, hobbies, profile image
           * Name, description, age are text input
           * Major is drop down
           * Hobbies are check boxes
           * User can click submit button to edit/change preferences
          */}

         <Form>
            <Form.Group>
            <Form.Label>Display name</Form.Label>
            <Form.Control type="text" id="displayname" aria-describedby="displaynamedesc" placeholder="Enter name"/>
            <Form.Text className="text-muted">Your preferred name, to be displayed on your profile.</Form.Text>
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

            <Form.Group>
               <Form.Label>Major</Form.Label>
               <Form.Select id="major" aria-label="Default select example">
                  <option value="1">Major1</option>
                  <option value="2">Major2</option>
                  <option  value="3">Major3</option>
               </Form.Select>
            </Form.Group>

            <Form.Group className="my-2">
               <Accordion defaultActiveKey="0">
                 <Accordion.Item eventKey="0">
                   <Accordion.Header>Hobbies</Accordion.Header>
                   <Accordion.Body  className="hobbyaccordion">
                     <ToggleButtonGroup className="mb-2" type="checkbox">
                     {hobbies.map((hobby, idx) => (
                     <ToggleButton
                       id={`hobby-${idx}`}
                       className="mx-1 rounded"
                       type="checkbox"
                       variant="outline-primary"
                       checked={checked}
                       value={hobby.value}
                       onChange={(e) => setChecked(e.currentTarget.checked)}
                     >
                     {hobby.name}
                     </ToggleButton>
                     ))}
                     </ToggleButtonGroup>
                   </Accordion.Body>
                 </Accordion.Item>
               </Accordion>
            </Form.Group>

          {/**
           *  Users can edit profile pictures by selecting from files 
           */}
         <Form.Group>
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
         </Container>         
            <Button type="submit" className = "submitButtonPadding">Confirm Changes</Button>
         </Form>


         </Container>


</body>

        {/** 
         * Navigational buttons at bottom of the page w/ links to respective pages
         * Goes to editprofile, profile, and matches 
         * Class has info of aesthetics of buttons 
         */}
          
        <div class="btn-group d-flex customNavBar" role="group" aria-label="navigational buttons">
          <a href = "/editprofile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/settingIcon.png')}></Figure.Image></a>
          <a href = "/profile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/profileIcon.png')}></Figure.Image></a>
          <a href = "/matches" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/chatIcon.png')}></Figure.Image></a>
        </div>


      </main>
    );
}