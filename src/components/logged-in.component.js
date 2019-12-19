import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";

var listOfReadings =[]
var listOfDates = []

/*export default class LoggedIn*/ class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstname: '',
            dataFirstName: '',
            level: 0,
            levelsList: [],
            datesList: [],
            date: new Date(),
            readings: []
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    componentDidMount() {
        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                

                //Sort the array by date so that values display in order.
                var sortedBloodSugarArray = response.data[2].bloodSugar.sort(function(a,b) {
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
                       levelsList: listOfReadings.slice(1).slice(-10),
                        readings: response.data,
                        datesList: listOfDates.slice(1).slice(-10),
                        dataFirstName: response.data[2].firstname
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

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLevel(e) {
        this.setState({
            level: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
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
        return Math.round(total / listOfReadings.length);
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <div className = "logout">
                    <a href="/entrypage">Log out</a>
                </div>
                <div className = "info">
                    <h1>Welcome {user.firstname/*this.state.dataFirstName*/}</h1>
                        <p>Here are your most recent readings.</p>
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
                </div>
                <div className = "outer_container"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <p>Your average blood sugar level is: {this.averageReading()}</p>
                    <p>See your <a href="/fullhistory">full history</a>.</p><br />
                    <div className = "inner_container">    
                            <p>New Reading</p>
                            <form onSubmit={this.onSubmit}>
                                <input className = "firstname" type = "text" name = "firstname" placeholder = "Enter your firstname (testing)" onChange = {this.onChangeFirstname} />
                                <input className = "newreading" type = "text" name = "newreading" placeholder = "Enter your number" onChange = {this.onChangeLevel} />
                                <input type = "submit" value = "Submit"/>
                                <div className="dateform">
                                    <label>Date: </label>
                                    <div>
                                        <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}
                                        />
                                    </div>
                                    <input type = "submit" value = "logout" onClick={this.onLogoutClick}/>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Dashboard);