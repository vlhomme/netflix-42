
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { resetUserPassword } from "../../../store/actions/UsersActions/ResetPwdAction";
import { ToastContainer } from 'react-toastify';
const customNotification = require('../utils/notification');


class ResetPwd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlFormSubmit = this.handlFormSubmit.bind(this);
    }

    handlFormSubmit(e) {
        e.preventDefault();
        this.props.onResetPwdUser(this.state);
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
        if (nextProps.resetPwd.code === 200)
            customNotification.fireNotification("success", nextProps.resetPwd.msg)
        if (nextProps.resetPwd !== "" && nextProps.resetPwd.code === 205)
            customNotification.fireNotification("warning", nextProps.resetPwd.msg)
        if (nextProps.resetPwd !== "" && nextProps.resetPwd.code === 500)
            customNotification.fireNotification("error", nextProps.resetPwd.msg)

    }


    render() {
        return (
            <div className="login-box">
                <ToastContainer />
                <div className="login-logo1">
                    <b>H</b>yper<b>Tube</b>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Reinitialize your password
                    <Link to="/login" onClick={this.props.navigateTo.bind(this, '/login')}>
                            <i className="fa fa-backward pull-left"></i>
                        </Link>Signup a new account</p>
                    <form onSubmit={this.handlFormSubmit} encType="multipart/form-data">
                        <div className="form-group has-feedback">
                            <input required type="text" className="form-control" name="email" onChange={this.handleChange} placeholder="Email or Username" />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-4 pull-right">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Send</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

const state = (state, ownProps = {}) => {
    return {
        resetPwd: state.resetPwd.resetPwd,
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onResetPwdUser: (data) => dispatch(resetUserPassword(data)),
    }
};

export default connect(state, mapDispatchToProps)(ResetPwd);