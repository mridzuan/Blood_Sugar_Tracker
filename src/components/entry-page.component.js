import React, { Component } from 'react';

export default class EntryPage extends Component {
    render() {
        return (
            <div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <h1>Blood Sugar Tracker</h1>
                            <p>An app for diabetics</p>
                            <form action = "/api/login" method = "post">
                                <input className = "email" type = "text" name = "email" placeholder = "email" />
                                <input className = "pword" type = "text" name = "password" placeholder = "password" />
                                <input type = "submit" value = "Login" />
                            </form>
                            <p><input className = "loggedin" type = "checkbox" name="keeploggedin" />Keep me logged in</p>
                            <p> <a href = "">Forgot</a> my password.</p>
                            <p> <a href = "">Create</a> an account.</p>
                    </div>
                </div>
            </div>
        )
    }
}