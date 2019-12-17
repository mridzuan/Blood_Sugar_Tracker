import React, { Component } from 'react';
import axios from 'axios'


export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLastname = this.onChangeLastname.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword1 = this.onChangePassword1.bind(this)
        this.onChangePassword2 = this.onChangePassword2.bind(this)

        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password1: '',
            password2: '',
        }
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword1(e) {
        this.setState({
            password1: e.target.value
        })
    }

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
       /* const { password1, password2 } = this.state

        if (password1 !== password2) {
            alert("Passwords do not match!")
        } else {*/
            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password2
            }
    
            console.log(user)
    
            axios.post('http://localhost:5000/users/add', user)
                .then(res => console.log(res.data))
    
        //}

        
    }

    render() {
        return (
            <div>
                <div className = "info">
                <h1>How It Works</h1>
                    <p>This is an app to help you track your blood sugar levels daily, weekly, monthly, and yearly.</p>
                    <div className = "list">
                        <ul>
                            <li>Create a profile</li>
                            <li>When you login your 10 most recent readings will be displayed, as well as your overall average reading.</li>
                            <li>Enter your blood sugar level in the box and click submit.</li>
                            <li>Your reading will be saved with the date and time.</li>
                            <li>Repeat whenever you are required to take a reading.  Usually 1 - 7 times per day, depending on your situation.</li>
                            <li>You will be sent reports weekly, monthly, and yearly containing your readings as well as averages.</li>
                        </ul>
                    </div>
                </div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <p>Profile</p>
                        
                        <form action = "http://localhost:5000/users/add" method = "post">
                            <input className = "firstname" type = "text" name = "firstname" placeholder = "first name" onChange={this.onChangeFirstname} />
                            <input className = "lastname" type = "text" name = "lastname" placeholder = "last name" onChange={this.onChangeLastname} />
                            <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} />
                            <input className = "pword1" type = "password" name = "password1" placeholder = "password" onChange={this.onChangePassword1} />
                            <input className = "pword2" type = "password" name = "password2" placeholder = "verify password" onChange={this.onChangePassword2} />
                            <input type = "submit" value = "Create" />
                         </form>
                    </div>
                </div>
            </div>
        )
    }
}