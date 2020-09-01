
import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { signUpNewUser } from '../../../store/actions/UsersActions/RegisterUserAction'
import PasswordStrengthMeter from './PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';
const customNotification = require('../utils/notification');

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            pseudonyme: "",
            password: "",
            email: "",
            photo: "",
            confPassword: "",
            resgiterUser: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlFormSubmit = this.handlFormSubmit.bind(this);
    }

    handlFormSubmit(e) {
        e.preventDefault();
        if (this.valdateFormData())
            this.props.onSignUpNewUser(this.state);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (target.type === "file") {
            this.setState({
                photo: target.files[0]
            });
        } else {
            this.setState({
                [name]: value
            });
        }

    }

    valdateFormData() {
        let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        const testedResult = zxcvbn(this.state.password);
   
        if (this.state.password !== this.state.confPassword) {
            customNotification.fireNotification("warning", "Passwords does not match")
            return false;
        } else if (this.state.password.length < 8) {
            customNotification.fireNotification("warning", "Password must contain at least 8 characters")
            return false;
        } else if (parseInt(testedResult.score) < 3) {
            customNotification.fireNotification("error", "Password must be strong")
            return false;
        } else if (!validateEmail.test(this.state.email)) {
            customNotification.fireNotification("warning", "Email not valid")
            return false;
        }
        return true;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.registerUser && nextProps.registerUser.code === 200)
            customNotification.fireNotification("success", nextProps.registerUser.msg);
        if (nextProps.registerUser && nextProps.registerUser.code === 204)
            customNotification.fireNotification("warning", nextProps.registerUser.msg);
        if (nextProps.registerUser && nextProps.registerUser.code === 500)
            customNotification.fireNotification("error", nextProps.registerUser.msg);
    }

    render() {
        return (
            <div className="login-box">
                <ToastContainer />
                <div className="login-logo1">
                    <b>H</b>yper<b>Tube</b>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">
                        <Link to="/login" onClick={this.props.navigateTo.bind(this, '/login')}>
                            <i className="fa fa-backward pull-left"></i>
                        </Link>Signup a new account</p>
                    <form onSubmit={this.handlFormSubmit} encType="multipart/form-data">
                        <div className="form-group has-feedback">
                            <input required type="text" className="form-control" onChange={this.handleChange} name="firstname" placeholder="firstname" />
                            <span className="glyphicon glyphicon-book form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="text" className="form-control" onChange={this.handleChange} name="lastname" placeholder="Lastname" required />
                            <span className="glyphicon glyphicon-book form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="text" className="form-control" onChange={this.handleChange} name="pseudonyme" placeholder="Pseudonyme" required />
                            <span className="glyphicon glyphicon-book form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="email" className="form-control" onChange={this.handleChange} name="email" placeholder="Email" required />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="file" className="form-control" onChange={this.handleChange} name="photo" placeholder="Photo" required />
                            <span className="glyphicon glyphicon-file form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="password" className="form-control" onChange={this.handleChange} name="password" placeholder="Password" required />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input required type="password" className="form-control" onChange={this.handleChange} name="confPassword" placeholder="Confirm your password" required />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <PasswordStrengthMeter password={this.state.password} />
                        <div className="row">
                            <div className="col-xs-4 pull-right">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                            </div>
                        </div>
                    </form>
                    <div className="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="http://localhost:3000/auth/google" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google"></i> Sign in using
        Google+</a>
                        <a href="http://localhost:3000/login/42" style={{ 'marginTop': '10px' }} class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-hotjar">42</i> Sign in using
        42</a>
                    </div>
                </div>
            </div>
        );
    }
};

const state = (state, ownProps = {}) => {

    return {
        registerUser: state.registerUser.registerUser,
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onSignUpNewUser: (data) => dispatch(signUpNewUser(data))
    }
};

export default connect(state, mapDispatchToProps)(Signup);