import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./actions/authActions";


class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/loggedin");
        }
      }

    //Works when I call componentDidUpdate but I have to click submit twice
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/loggedin"); 
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
            email: this.state.email.toLowerCase(),
            password: this.state.password
          };
    
           //axios.post('http://localhost:5000/login/login', userData)
           axios.post('/login/login', userData)
                .then(res => {
                    if (res) {
                        if (res.data.success !== true) {
                            this.setState({
                                message: res.data.toString()
                            })
                        } else {
                            this.props.loginUser(userData);
                        }
                    } else {
                        this.setState({
                            message: "No response from server."
                        })
                    }  
                })
    }

    renderMessage() {
        return this.state.message
    }


    render() {
        return (
            <div>
                <div className = "outer_container">
                    <div className = "inner_container">    
                        <h1>Blood Sugar Tracker</h1>
                            <p>An app for diabetics</p>
                            <form onSubmit={this.onSubmit}>
                                <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} style={{textAlign: 'left'}} />
                                <input className = "pword" type = "password" name = "password" placeholder = "password" onChange={this.onChangePassword} />
                                <input type = "submit" value = "Login" />
                            </form>
                            <p> <a href = "/forgotpassword">Forgot</a> my password.</p>
                            <p> <a href = "/createuser">Create</a> an account.</p>
                    </div>
                    <p>{this.renderMessage()}</p>
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

 