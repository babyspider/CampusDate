import React, { Component } from 'react';
import axios from 'axios';
export default class Matches extends Component {
    constructor(props) {
        super(props);
        this.state = { matchesCollection: {} };
    }
    componentDidMount() {
        axios.get('http://localhost:4000/matches')
            .then(res => {
                this.setState({ matchesCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.matchesCollection);
    }
    

    render() {
        return (
            <div>Matches?:{this.atchesCollection}</div>

        )
    }
}