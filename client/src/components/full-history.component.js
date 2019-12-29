import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

 class FullHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            readings: [],
            message: '',
            id: '',
            listMessage: '',
        }
    }

    componentDidMount() {
        const { user } = this.props.auth;

       // axios.get('http://localhost:5000/bloodsugar')
        axios.get('/bloodsugar')
            .then(response => {
                //Match the current user with user in database
                const currentUser = response.data.filter((x) => 
                    x._id === user.id
                )

                //Sort the array with readings by date so that values display in order.
                const sortedBloodSugarArray = currentUser[0].bloodSugar.sort((a,b) =>
                    new Date(b.date)  - new Date(a.date) 
                )
                
                //If no readings are available, display a message.
                if (sortedBloodSugarArray.length === 0) {
                    this.setState({
                        listMessage: "Your readings will display here"
                    })
                }

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

    alertBox(id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this reading?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteItem(id)
                },
                {
                    label: 'No'
                  
                }
            ],
            closeOnClickOutside: true,
            closeOnEscape: true,
            willUnmount: () => {},
            onClickOutside: () => {},
            onKeypressEscape: () => {}
        })
    }
    
   deleteItem (id) {
    /*if (window.confirm("Are you sure you wish to delete this reading?")) {
            //const url = `http://localhost:5000/bloodsugar/${this.state.id}/${id}`*/
        const url = `/bloodsugar/${this.state.id}/${id}`
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
       //}        
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
                color: 'red',
            }
        } else if (lev < 70) {
            return {
                color: 'blue',
            }
        } else {
            return {
                color: 'green',
            }
        }
    }

    renderList() {
        return (
            this.state.readings.map((el, h, i, g) =>
            <div className = "levelRendered2" >
                <li key={h}>{el.level}</li>
                <li key={i} style = {this.categoryStyle(el.level)}>{this.renderCategory(el.level)}</li><br /><br />
            </div>
        ))    
    }

    renderDates() {
        console.log(this.state.readings)
        return (
            this.state.readings.map((el, j, k, l) => 
            <div className = "dateAndTime">
                <div className = "dateRendered">
                    <li key={j}>{(moment.utc(el.date).local().format('MMM. D, YYYY  hh:mm A')).substr(0, 13)}</li>
                </div>
                <div className = "timeRendered">
                    <li key={k}>{(moment.utc(el.date).local().format('MMM. D, YYYY  hh:mm A')).substr(13, 20)}</li>
                </div>
                <div className = "delete">
                    <li key={l} className = "delete" value={el._id} onClick={()=> this.alertBox(el._id)}><u>delete</u>&emsp;</li><br />
                </div>
            </div>
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

    listStyle(item) {
        if (item === "Your readings will display here") {
            return {
                justifyContent: 'center'
            }
        }
    }

    recentStyle(item) {
        if (item === "Your readings will display here") {
            return {
                visibility: 'hidden'
            }
        }
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
                    <p style = {this.recentStyle(this.state.listMessage)}>Here is your full history of readings.</p>
                        <div className = "list" style = {this.listStyle(this.state.listMessage)}>
                            <ul>
                                {this.renderDates()}
                            </ul>
                            <div className="listMessage">
                                {this.state.listMessage}
                            </div><br /><br /><br /><br /><br />
                            <ul>
                                {this.renderList()} 
                            </ul>
                        </div> 
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