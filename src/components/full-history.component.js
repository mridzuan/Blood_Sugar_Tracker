import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

var listOfReadings =[]
var listOfDates = []
let currentUser;

 class FullHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            levelsList: [],
            datesList: [],
            readings: []
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount() {
        const { user } = this.props.auth;

        
        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                //Match the current user with info in database
                for (var i = 0; i < response.data.length; i++) {
                    if (user.id === response.data[i]._id) {
                        console.log("Success!")
                        currentUser = response.data[i]
                    } else {
                        console.log("can't find!")
                    }
                }

                

                //Sort the array by date so that values display in order.
                var sortedBloodSugarArray = currentUser.bloodSugar.sort(function(a,b) {
                    a = new Date(a.date)
                    b = new Date(b.date)

                    return a - b
                })

                //Need to only show last 10 readings, but show overall average.
                for (var i = 0; i < sortedBloodSugarArray.length; i++) {
                        listOfReadings.push(sortedBloodSugarArray[i].level)
                        listOfDates.push(sortedBloodSugarArray[i].date)
                }
                    this.setState({
                        firstname: user.name,
                        id: user.id,
                        levelsList: listOfReadings,
                        readings: response.data,
                        datesList: listOfDates,
                    })

                   console.log(user)
                   console.log(currentUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderList() {
        return (this.state.levelsList.map(el => <li>{el} <a href="">edit</a></li>))
    }

    renderDates() {
        return ((this.state.datesList.map(el => <li>{el.substr(0, 10)} <a href="">delete</a></li>)))
    }

    //All time average
    averageReading() {
        var total = 0;
        for (var i = 0; i < listOfReadings.length; i++) {
            total += listOfReadings[i];
        }
        return Math.round(total / this.state.levelsList.length);
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>
            <div className = "back">
                <a href="/loggedin">---Back to submit reading.</a>
            </div>
                <div className = "logout">
                    <a href="/login" onClick={this.onLogoutClick}>Log out</a>
                </div>
                <div className = "info">
                    <h1>Welcome {user.name}</h1>
                        <p>Here is your full history of readings.</p>
                        <div className = "list">
                            <ul>
                                <p><u>Level</u></p>
                                {this.renderList()} 
                            </ul>
                            <ul>
                                <p><u>Date</u></p>
                                {this.renderDates()}
                            </ul>
                        </div>
                        <p>Your average blood sugar level is: {this.averageReading()}</p><br></br>
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