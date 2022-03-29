import './listofprofiles.css';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, Alert, SafeAreaView, TouchableOpacity, Image, Component, ScrollView, Pressable, Dimensions, useState} from 'react-native';
import { Accordion, ButtonGroup, Container, Figure, Form, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

// TODO: setName function around line 57 won't work

import { Link } from "react-router-dom";

export default function ListProfiles(){
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
            <Figure.Image className="profileimages-image" style = {{justifyContent: 'flex-start'}} src={require('../assets/anonprofile.png')}/>
            
            {/* might want to put name here of person lol */}

           <Form>
              <Form.Group className = "hobbiesFormatting">
              <div class = "row matchedOnPadding"> {/* padding = spacing b/t box and Text */}
                {hobbies.map((hobby, idx) => (
                  <div class="col-lg-4 matchedOnPadding"> {/* padding = spacing b/t the form boxes */}
                    <Form.Control class = "form-control text-center" type="text"  placeholder={hobby.name} disabled></Form.Control>
                  </div>
                ))}
              </div>
              </Form.Group>
            </Form> 

            <Text style = {styles.profileTextSize} className = "profileText">
I am the fishmonger you're looking for.

Good day lads!

I'm an incredible sort of lady, who likes nothing more than hiking with the right man.

The first thing people usually notice about me is my kind personality, closly followed by my smashing lips. I am not one of those fake people who pretends not to notice their own qualities. My lips and abs are top notch. These gems of honesty are just part of the incredible person I am.

I work as a fishmonger, helping blind people. This allows me to exercise my skills: teaching and bravery. I would like to tell you about the time I met David Bowie, which is true, but it's important to me that you know I'm honest, so I'll save the wilder parts of my life for another time.

My life goals include:
Star in the next Star Wars film.
Become the best fishmonger I can be
Help all the blind people in the world
If you're the right man for me, you'll be generous and gentle. You won't be afraid to be themselves and will have a healthy respect for perfection.

My ideal date would involve baking in New York with a red man by my side. While we're there, I compliment your solid .

Honesty and openness are the most important qualities in a relationship. I will be honest with you, if you will be honest with me. I will never hit on your best friend whilst you're visiting a sick relative, never text my ex behind your back while you're asleep, never post naked photos of you on Facebook. That's just the kind of lady I am.

May the force be with you.

I urge you, get in touch

Jane Doe
          </Text>

          {/* buttons for matching >> left = dont want to match, right = want to match */}

          <div class = "btn-group d-flex" role = "group" aria-label='buttons for matching'>
            <button type = "button" className = "btn btn-circle"><Figure.Image className = "customNavImage" src={require('../assets/xIcon.png')}></Figure.Image></button>
            <button type = "button" className = "btn btn-circle2"><Figure.Image className = "customNavImage" src={require('../assets/heartIcon.png')}></Figure.Image></button>
          </div>
          

          {/* navigational buttons at bottom of the page w/ links, class has info of aesthetics of buttons */}
          <div class="btn-group d-flex customNav" role="group" aria-label="navigational buttons">
              <a href = "/editprofile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/settingIcon.png')}></Figure.Image></a>
              <a href = "/profile" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/profileIcon.png')}></Figure.Image></a>
              <a href = "/chat" button type="button" class="btn btn-secondary w-100 h-100 customNavSize"><Figure.Image className = "customNavImage" src={require('../assets/chatIcon.png')}></Figure.Image></a>
          </div>

          </ScrollView>

          
        </Container>

      </body>

       
    </main>

  );
  
}



const styles = StyleSheet.create({
  profileTextSize:{
    fontSize: 18,
    
  }, 

});