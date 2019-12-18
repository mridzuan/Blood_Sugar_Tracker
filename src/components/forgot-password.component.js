import React, { Component } from 'react';
import axios from 'axios';

export default class EntryPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e) {
    
            axios.get('http://localhost:5000/users')
                .then(res => console.log(res.data))
    
      // window.location = '/entrypage'

        
    }

    render() {
        return (
            <div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <h1>Forgot your password?</h1>
                            <form onSubmit={this.onSubmit}>
                                <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} />
                                <input type = "submit" value = "Reset" />
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}