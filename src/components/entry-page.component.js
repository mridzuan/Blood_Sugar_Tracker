import React, { Component } from 'react';
import axios from 'axios';

export default class EntryPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

            const user = {
                email: this.state.email,
                password: this.state.password
            }
    
           // console.log(user)
    
            axios.post('http://localhost:5000/login/login', user)
                .then(res => console.log(res.data))
    
      // window.location = '/entrypage'

        
    }

    render() {
        return (
            <div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <h1>Blood Sugar Tracker</h1>
                            <p>An app for diabetics</p>
                            <form onSubmit={this.onSubmit}>
                                <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} />
                                <input className = "pword" type = "password" name = "password" placeholder = "password" onChange={this.onChangePassword} />
                                <input type = "submit" value = "Login" />
                            </form>
                            <p><input className = "loggedin" type = "checkbox" name="keeploggedin" />Keep me logged in</p>
                            <p> <a href = "">Forgot</a> my password.</p>
                            <p> <a href = "http://localhost:3000/createuser">Create</a> an account.</p>
                    </div>
                </div>
            </div>
        )
    }
}