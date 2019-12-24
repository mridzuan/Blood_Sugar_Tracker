import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";


 class FullHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            readings: [],
            message: '',
            id: ''
        }
    }


    componentDidMount() {
        const { user } = this.props.auth;

        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                //Match the current user with user in database
                const currentUser = response.data.filter((x) => 
                    x._id === user.id
                )

                //Sort the array with readings by date so that values display in order.
                const sortedBloodSugarArray = currentUser[0].bloodSugar.sort((a,b) =>
                    new Date(a.date) - new Date(b.date)  
                )

                this.setState({
                    firstname: user.name,
                    id: user.id,
                    readings: sortedBloodSugarArray,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    

   deleteItem (id) {
        const url = `http://localhost:5000/bloodsugar/${this.state.id}/${id}`
        axios.delete(url)
            .then(res => {
                this.setState({
                    message: res.data
                })
                if (this.state.message === "Reading deleted!") {
                    setTimeout(function(){
                        window.location.reload()
                     }, 1000);     
                }
            })
    }

    renderList() {
        return (
            this.state.readings.map((el, i) => 
                <li key={i}>{el.level}</li>
        ))
    }

    renderDates() {
        return ((
            this.state.readings.map((el, j, k) => 
            <div className = "dateList" key={j}>
                <li key={k} className = "delete" value={el._id} onClick={()=> this.deleteItem(el._id)}><u>delete</u>&emsp;</li>
                <li key={j}>{el.date.substr(0, 10)}</li>
            </div>
            )
        ))
    }

    //Should this be replaced with a differnet type of function?
    averageReading() {
        let total = 0;
        for (var i = 0; i < this.state.readings.length; i++) {
            total += this.state.readings[i].level;
        }
        if (isNaN(Math.round(total / this.state.readings.length))) {
            return ""
        } else {
            return Math.round(total / this.state.readings.length);
        }
    }

    renderMessage() {
        return this.state.message
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
            <div className = "back">
                <a href="/loggedin">---Back to submit reading.</a>
            </div>
                <div className = "logout">
                    <a href="/login" onClick={this.onLogoutClick}>Log out</a>
                </div>
                <div className = "info">
                <h1>Welcome {this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.substring(1)}</h1>
                        <p>Here is your full history of readings.</p>
                        <div className = "list">
                            <ul>
                                <p><u>Date</u></p>
                                {this.renderDates()}
                            </ul>
                            <ul>
                                <p><u>Level</u></p>
                                {this.renderList()} 
                            </ul>
                        </div>
                        <p>Your average blood sugar level is: {this.averageReading()}</p>
                        <p>{this.renderMessage()}</p>   
                </div>
            </div>
        )
    }
}

FullHistory.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(FullHistory);