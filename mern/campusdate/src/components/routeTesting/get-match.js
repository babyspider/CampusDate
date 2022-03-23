import React, { Component } from 'react';
import axios from 'axios';
export default class GetMatches extends Component {
    constructor(props) {
        super(props);
        this.state = { matchesCollection: {} };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/matches')
            .then(res => {
                this.setState({ matchesCollection : res.data });
                console.log(this.state)
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    

    render() {
        return (
            <div>Matches?:</div>

        )
    }
}