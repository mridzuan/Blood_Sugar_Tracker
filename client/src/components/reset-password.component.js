import React, { Component } from 'react';
import axios from 'axios';


export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.onChangePassword1 = this.onChangePassword1.bind(this)
        this.onChangePassword2 = this.onChangePassword2.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            password1: '',
            password2: '',
            message: ''
        }
        
    }

    componentDidMount() {
        const resetToken = (window.location.pathname).slice(21)
 
        axios.get('/resetpassword/reset/', {
                params: {
                    resetPasswordToken: resetToken
                }
            })
            .then(res => {
                if (res.data.message === "Password reset link ok.") {
                    this.setState({
                        email: res.data.email,
                        message: res.data.message
                    })
                } else {
                    this.setState({
                        message: res.data
                    })
                }
            })
            .catch(err => {
                console.log(err.data)
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

    renderMessage() {
        return this.state.message
    }

    onSubmit(e) {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        }
       
        axios.post('/updatePasswordViaEmail/updatePasswordViaEmail', user)
            .then ((res) => {
                this.setState({
                    message: res.data
                })
                
                if (this.state.message === "Password updated! Redirecting you to login page!") {
                    setTimeout(function(){
                        window.location = '/login';
                     }, 1000);
                }
            })
        .catch(err => {
            console.log(err.data)
        })
    }

    render() {
        return (
            <div>
                <div className = "outer_container"><br /><br /><br /><br /><br /><br /><br />
                    <div className = "inner_container">    
                        <p>Password Reset</p>
                        <form onSubmit={this.onSubmit}>
                            <input className = "pword1" type = "password" name = "password1" placeholder = "password" onChange={this.onChangePassword1} />
                            <input className = "pword2" type = "password" name = "password2" placeholder = "password" onChange={this.onChangePassword2} />
                            <input type = "submit" value = "Reset" />
                         </form>
                    </div>
                    <p>{this.renderMessage()}</p>
                </div>
            </div>
        )
    }
}