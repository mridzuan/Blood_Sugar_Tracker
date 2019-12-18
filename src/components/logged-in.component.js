import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class LoggedIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this)
        this.onChangeLevel = this.onChangeLevel.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstname: '',
            level: 0,
            date: new Date(),
            readings: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/bloodsugar')
            .then(response => {
                    this.setState({
                        level: response.data[0].level,

                        readings: response.data
                    })
                    console.log(this.state.level)
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

    render() {
        return (
            <div>
                <div className = "info">
                    <h1>Welcome (first name of user)</h1>
                        <p>Here are your most recent readings.</p>
                        <div className = "list">
                            <ul>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                                <li>(Date) (Time) (Number)</li>
                            </ul>
                        </div>
                </div>
                <div className = "outer_container"><br />
                    <p>Your average blood sugar level is: avg</p><br />
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
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}