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
            // <div className="wrapper">
            //     <form onSubmit={this.onSubmit}>
            //         <div className="form-group">
            //             <label>Add User Name</label>
            //             <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
            //         </div>
            //         <div className="form-group">
            //             <label>Add User Email</label>
            //             <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
            //         </div>
            //         <div className="form-group">
            //             <input type="submit" value="Create User" className="btn btn-success btn-block" />
            //         </div>
            //     </form>
            // </div>
            <button onClick={this.addMatch}>hit me</button>
        )
    }
}