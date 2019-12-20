import React, { Component } from 'react';
//import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";
//import classnames from "classnames";

/*export default class EntryPage*/class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            password: '',
            redirectTo: '',
            errors: {}
        }
    }

   componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/loggedin"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
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
        
        const userData = {
            email: this.state.email,
            password: this.state.password
          };
    
   
          this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
         // console.log(userData)
            /*const user = {
                email: this.state.email,
                password: this.state.password
            }
    
           console.log(user)
    
            axios.post('http://localhost:5000/login/login', user)
                .then(res => {
                    if (res) {
                        console.log(res.data)
                        //window.location = '/loggedin'
                    } else {
                        console.log("No response from server.")
                    }
                    
                })
      // window.location = '/entrypage'*/

        
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/loggedin");
        }
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
                            <p> <a href = "/forgotpassword">Forgot</a> my password.</p>
                            <p> <a href = "/createuser">Create</a> an account.</p>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);

 