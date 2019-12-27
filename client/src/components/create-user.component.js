import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";


class CreateUser extends Component {
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
            message: ''
        }
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/loggedin");
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

            const user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password1: this.state.password1,
                password2: this.state.password2
            }
    
            axios.post('/users/add', user)
                .then((res) => {
                    this.setState({
                        message: res.data
                    })
                    if (this.state.message === "User added! Redirecting you to login page!") {
                        setTimeout(function(){
                            window.location = '/login';
                         }, 1000);    
                    }
                })   
    }

    renderMessage() {
        return this.state.message
    }


    render() {
        return (
            <div>
                <div className = "info">
                <h1>Sign Up</h1>
                    <p>Start tracking your blood sugar levels</p><br /><br /><br />
                    <div style={{textAlign: 'left'}} className = "listCreate">
                        <ol>
                            <li>Create a profile.</li><br />
                            <li>Log in.</li><br />
                            <li>Enter your blood sugar level and click submit.</li><br />
                            <li>Your reading will be saved.</li><br />
                            <li>Repeat whenever you are required to take a reading.</li>
                        </ol>
                    </div>
                </div>
                <div className = "outer_container"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <div className = "inner_container">    
                        <p>Profile</p>
                        <form onSubmit={this.onSubmit}>
                            <input className = "firstname" type = "text" name = "firstname" placeholder = "first name" onChange={this.onChangeFirstname} style={{textAlign: 'left'}}/>
                            <input className = "lastname" type = "text" name = "lastname" placeholder = "last name" onChange={this.onChangeLastname} style={{textAlign: 'left'}}/>
                            <input className = "email" type = "text" name = "email" placeholder = "email" onChange={this.onChangeEmail} style={{textAlign: 'left'}}/>
                            <input className = "pword1" type = "password" name = "password1" placeholder = "password" onChange={this.onChangePassword1} />
                            <input className = "pword2" type = "password" name = "password2" placeholder = "password" onChange={this.onChangePassword2} />
                            <input type = "submit" value = "Create" />
                         </form>
                    </div>
                    <p>{this.renderMessage()}</p>
                </div>
            </div>
        )
    }
}

CreateUser.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps
  )(CreateUser);