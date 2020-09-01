
import React from "react";
const createHistory = require("history").createBrowserHistory;

class Logout extends React.Component {
    constructor(props) {
        super(props);
        localStorage.setItem('token', "");
        localStorage.setItem('userId', "");
        localStorage.setItem('familyName', "");
        localStorage.setItem('givenName', "");
        localStorage.setItem('imageUrl', "");
        let history = createHistory();
        history.push("/login");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;   
       
    }

    render() {
        
        return (
            <div>
            </div>
        );
    }
}

export default Logout;