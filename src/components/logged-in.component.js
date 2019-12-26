import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import moment from "moment";


 class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstname: '',
            id: '',
            level: 0,
            date: new Date(),
            allReadings: [],
            readings: [],
            message: ''
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
                    allReadings: sortedBloodSugarArray,
                    //Set to only display 5 most recent readings
                    readings: sortedBloodSugarArray.slice(0).slice(-5)
                })
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

    //Category based on level.
    renderCategory(lev) {
        let readingCategory;
        if (lev > 140) {
            readingCategory = "High"
        } else if (lev < 70) {
            readingCategory = "Low"
        } else {
            readingCategory = "Normal"
        }

        return readingCategory
    }

    //Color of category based on level.
    categoryStyle(lev) {
        if (lev > 140) {
            return {
                color: 'red'
            }
        } else if (lev < 70) {
            return {
                color: 'blue'
            }
        } else {
            return {
                color: 'green'
            }
        }
    }
    
    renderList() {
        return (
            this.state.readings.map((el, h, i) =>
            <div className = "levelRendered" >
                <li key={h}>{el.level}</li>
                <li key={i} style = {this.categoryStyle(el.level)}>{this.renderCategory(el.level)}</li><br />
            </div> 
        ))
    }
    

    renderDates() {
        return (
            this.state.readings.map((el, j, k) => 
            <div className = "dateAndTime">
                <div className = "dateRendered">
                    <li key={j}>{(moment.utc(el.date).local().format('MMM. D, YYYY  hh:mm A')).substr(0, 13)}</li>
                </div>
                <div className = "timeRendered">
                    <li key={k}>{(moment.utc(el.date).local().format('MMM. D, YYYY  hh:mm A')).substr(13, 20)}</li><br /><br /> 
                </div>
            </div>
        ))
    }

    //All time average
    averageReading() {
        var total = 0;
        for (var i = 0; i < this.state.allReadings.length; i++) {
            total += this.state.allReadings[i].level;
        }

        if (isNaN(Math.round(total / this.state.allReadings.length))) {
            return ""
        } else {
            return Math.round(total / this.state.allReadings.length);
        }  
    }

    renderMessage() {
        return this.state.message
    }

    onSubmit(e) {
        e.preventDefault();
 
         const reading = {
             id: this.state.id,
             level: this.state.level,
             date: this.state.date
         }
 
         axios.post('http://localhost:5000/bloodsugar/add', reading)
         .then((res) => {
             this.setState({
                 message: res.data
             })
             console.log(this.state.message)
             if (this.state.message === "Reading added!") {
                 setTimeout(function(){
                     window.location.reload()
                  }, 1000);
                  
             }
         }) 
     }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <div className = "logout">
                    <a href="/login" onClick={this.onLogoutClick}>Log out</a>
                </div>
                <div className = "info">
                    <h1>Welcome {this.state.firstname.charAt(0).toUpperCase() + this.state.firstname.substring(1)}</h1>
                        <p>Here are your most recent readings.</p>
                        <div className = "list">
                            <div className = "dates">
                                <ul>
                                    {this.renderDates()} 
                                </ul>
                            </div>
                            <div className = "level">
                                <ul>
                                    {this.renderList()}
                                </ul>
                            </div>
                        </div>
                </div>
                <div className = "outer_container"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <p>Your average blood sugar level is: {this.averageReading()}</p>
                    <p>See your <a href="/fullhistory">full history</a>.</p><br />
                    <div className = "inner_container">
                            <p>New Reading</p>
                            <form onSubmit={this.onSubmit}>
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
                                </div>
                            </form>
                            <p>{this.renderMessage()}</p>   
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