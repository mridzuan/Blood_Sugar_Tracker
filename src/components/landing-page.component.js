import React, { Component } from 'react';

class LandingPage extends Component {

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/loggedin");
        }
      }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default LandingPage
 