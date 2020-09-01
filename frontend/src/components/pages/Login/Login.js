
import React from "react";
import { connect } from 'react-redux';
import { authUser } from "../../../store/actions/UsersActions/auth_user";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { loginFormThisUser } from '../../../store/actions/UsersActions/LoginFormUserAction';
import { oauth2User } from '../../../store/actions/UsersActions/oauth2User';
import queryString from "query-string";
const createHistory = require("history").createBrowserHistory;
const customNotification = require('../utils/notification');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      email: "",
    }

    this.handlFormSubmit = this.handlFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let history = createHistory();
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      localStorage.setItem('token', query.token);
      localStorage.setItem('userId', query.userId);
      localStorage.setItem('familyName', query.familyName);
      localStorage.setItem('givenName', query.givenName);
      localStorage.setItem('imageUrl', query.imageUrl);
      localStorage.setItem('dateOfCreation', query.dateOfCreation);
      history.push("/");
    }
  }



  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.loginFormUser && nextProps.loginFormUser.code === 204)
      customNotification.fireNotification("warning", nextProps.loginFormUser.msg);
  }

  handlFormSubmit(e) {
    e.preventDefault();
    this.props.loginFormThisUser(this.state);
  }

  render() {


    return (
      <div className="login-box fadein-fast" >
        <ToastContainer />
        <div className="login-logo1">
          <b>H</b>yper<b>Tube</b>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>

          <form onSubmit={this.handlFormSubmit} encType="multipart/form-data">
            <div className="form-group has-feedback">
              <input type="text" className="form-control" name="email" onChange={this.handleChange} placeholder="Email" />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div className="form-group has-feedback">
              <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div className="row">
         
              <div className="col-xs-4 pull-right">
                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
              </div>
            </div>
          </form>

          <div className="social-auth-links text-center">
            <p>- OR -</p>
            <a href="http://localhost:3000/auth/google" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google"></i> Sign in using
        Google+</a>
            {/* <GoogleLogin
                className="signInButton"
                clientId="508247381072-mkltitqrnb22o26irdte7jjdkamctosg.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                buttonText="Login via Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              /> */}
            <a href="http://localhost:3000/login/42" style={{ 'marginTop': '10px' }} class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-hotjar">42</i> Sign in using
        42</a>
          </div>
          <a href="/resetpwd" className="text-center">Reset your password</a>
          <br></br>
          <a href="/register" className="text-center">Register a new membership</a>
        </div>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    loginFormUser: state.loginFormUser.loginFormUser,
    auth: state.auth,
  };
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginFormThisUser, authUser, oauth2User }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);