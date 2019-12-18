import React, { Component } from 'react';
import axios from 'axios'

var listOfReadings =[]
var listOfDates = []

export default class LoggedIn extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            dataFirstName: '',
            levelsList: [],
            datesList: [],
            readings: []
        }
    }

    

    componentDidMount() {
        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                

                //Sort the array by date so that values display in order.
                var sortedBloodSugarArray = response.data[4].bloodSugar.sort(function(a,b) {
                    a = new Date(a.date)
                    b = new Date(b.date)

                    return a - b
                })

                //[4] needs to be the specific user that is logged in.
                //Need to only show last 10 readings, but show overall average.
                for (var i = 0; i < sortedBloodSugarArray.length; i++) {
                        listOfReadings.push(sortedBloodSugarArray[i].level)
                        listOfDates.push(sortedBloodSugarArray[i].date)
                }
                    this.setState({
                        //level: response.data[4].bloodSugar[0].level,
                       levelsList: listOfReadings,
                        readings: response.data,
                        datesList: listOfDates,
                        dataFirstName: response.data[4].firstname
                    })
                   //console.log(this.state.levelsList)
                   console.log(this.state.readings)
                   //console.log(this.state.datesList)
                   console.log(sortedBloodSugarArray)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onSubmit(e) {
        e.preventDefault();

        const reading = {
            firstname: this.state.firstname,
            level: this.state.level,
            date: this.state.date
        }

        axios.post('http://localhost:5000/bloodsugar/add', reading)
            .then(res => console.log(res.data))

        console.log(reading)
    }

    renderList() {
        return (this.state.levelsList.map(el => <li>{el}</li>))
    }

    renderDates() {
        return ((this.state.datesList.map(el => <li>{el.substr(0, 10)}</li>)))
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
        return (
            <div>
            <div className = "back">
                <a href="localhost:3001/loggedin">---Back to submit reading.</a>
            </div>
                <div className = "logout">
                    <a href="localhost:3001/entrypage">Log out</a>
                </div>
                <div className = "info">
                    <h1>Welcome {this.state.dataFirstName}</h1>
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
                        <p>Your average blood sugar level is: {this.averageReading()}</p><br />
                        <p>See a reading that is incorrect?  <a href="">Edit</a> or <a href="">delete</a> a reading.</p>
                </div>
            </div>
        )
    }
}