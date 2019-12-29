import React, { Component } from 'react'
import axios from 'axios'

export default class EntryPage extends Component {
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            message: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    renderMessage() {
        return this.state.message
    }

    onSubmit(e) {
        e.preventDefault()
        
        if (this.state.email === '') {
            this.setState({
                message: "Please enter your email address."
            })
        } else {
            axios.post('/forgotpassword/forgotpassword', {email: this.state.email})
                .then(res => {
                    this.setState({
                        message: res.data
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <h1>Forgot your password?</h1>
                            <form onSubmit={this.onSubmit}>
                                <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} style={{textAlign: 'center'}}/>
                                <input type = "submit" value = "Reset" />
                            </form>
                            <p>{this.renderMessage()}</p> 
                    </div>
                </div>
            </div>
        )
    }
}