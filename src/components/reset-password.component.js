import React, { Component } from 'react';
import axios from 'axios';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password1: '',
            password2: '',
            message: ''
        }

        this.onChangePassword1 = this.onChangePassword1.bind(this)
        this.onChangePassword2 = this.onChangePassword2.bind(this)
    }

    async componentDidMount() {
        console.log(this.props.match.params.token)
        await axios 
            .get('http://localhost:5000/resetpassword/reset/', {
                params: {
                    resetPasswordToken: this.props.match.params.token,
                }
            })
            .then(res => {
                console.log(res)
                if (res.data.message === "Password reset link ok.") {
                    this.setState({
                        email: res.data.email,
                        message: res.data.message
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

        axios.put('http://localhost:5000/updatePasswordViaEmail', {
            email: this.state.email,
            password: this.state.password2
        })
        .then (res => {
            console.log(res.data)
            if (res.data.message === 'Password updated.') {
                this.setState({
                    message: res.data.massage
                })
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
                            <input className = "pword2" type = "password" name = "password2" placeholder = "verify password" onChange={this.onChangePassword2} />
                            <input type = "submit" value = "Create" />
                         </form>
                    </div>
                    <p>{this.renderMessage()}</p>
                </div>
            </div>
        )
    }
}