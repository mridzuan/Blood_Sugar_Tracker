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
    }

    async componentDidMount() {
        console.log(this.props.params.token)
        await axios 
            .get('http://localhost:5000/reset', {
                params: {
                    ResetPasswordToken: this.props.match.params.token,
                }
            })
            .then(res => {
                console.log(res)
                
            })
    }
}