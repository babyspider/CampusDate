// ** create-match  .component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
export default class CreateMatch extends Component {
    constructor(props) {
        super(props)
        this.addMatch = this.addMatch.bind(this);
        this.state = {
            from_email: this.props.from_email,
            to_email: this.props.to_email,
            is_match: true
        }
    }
    
    addMatch(e) {
        e.preventDefault()
        const matchObject = {
            from_email: this.props.from_email,
            to_email: this.props.to_email,
            is_match: true
        };
        axios.post('http://localhost:4000/users/create', matchObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ from_email: '', to_email: '',is_match:false })
    }

    render() {
        return (
            <button onClick={this.addMatch}>hit me</button>
        )
    }
}