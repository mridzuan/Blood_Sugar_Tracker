import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

var listOfReadings =[]
var listOfDates = []
let listOfIds = []
let currentUser;
//let currentReading;
//let itemId;


 class FullHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            levelsList: [],
            datesList: [],
            readings: [],
            message: '',
            id: '',
            currentReadingId: [],
            currentUserId: '',
            idsList: []
        }
        this.deleteItem = this.deleteItem.bind(this)
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount() {
        const { user } = this.props.auth;

        
        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                //use map or filter it will be more efficient/ quicker
                //Match the current user with info in database
                for (var i = 0; i < response.data.length; i++) {
                    if (user.id === response.data[i]._id) {
                        currentUser = response.data[i]
                    } 
                }

                //Sort the array by date so that values display in order.
                var sortedBloodSugarArray = currentUser.bloodSugar.sort(function(a,b) {
                    a = new Date(a.date)
                    b = new Date(b.date)

                    return a - b
                })

                //Need to only show last 10 readings, but show overall average.
                for (var j = 0; j < sortedBloodSugarArray.length; j++) {
                    listOfReadings.push(sortedBloodSugarArray[j].level)
                    listOfDates.push(sortedBloodSugarArray[j])
                }

                 //Get ID of the current reading.
               for (var  k = 0; k < sortedBloodSugarArray.length; k ++) {
                    listOfIds.push(sortedBloodSugarArray[k]._id)
                }
                    this.setState({
                        firstname: user.name,
                        id: user.id,
                        levelsList: listOfReadings,
                        readings: response.data,
                        datesList: listOfDates,
                        idsList: listOfIds
                        //currentReadingId: currentUser.bloodSugar[56]._id
                    })

                   console.log(currentUser)
                   //console.log(currentUser.bloodSugar[56]._id)
                   //console.log(user.id)
                   console.log(listOfDates[0]._id)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    renderReadingId() {
        return this.state.currentReadingId
    }

  //Array of collections for each one.  Need to have id as well as date.
   deleteItem (id) {
       console.log(id)
  //  e.preventDefault();

      const url = `http://localhost:5000/bloodsugar/${this.state.id}/${id}`
        axios.delete(url)
            .then(res => {
                console.log(res)
            })
    }

    renderList() {
        return (
            this.state.levelsList.map((el, i) => 
                <li key={i}>{el}</li>
        ))
    }

    renderDates() {
        //console.log(this.state.datesList)
        return ((
            this.state.datesList.map((el, i) => 
              //  <li key={el.id}>{el.substr(0, 10)} <a href="" onClick={this.deleteItem}>delete</a></li>
                <li key={i} value={el._id} onClick={()=> this.deleteItem(el._id)}>{el.date.substr(0, 10)} </li>
            )
        ))
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
                        <p>{this.renderReadingId()}</p>
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