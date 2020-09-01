import React from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Select from 'react-select';
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import Slider from 'react-input-slider';
import { uploadProfile } from '../../../store/actions/ProfileAction/profile'
import { getProfileInfo } from '../../../store/actions/ProfileAction/getProfileInfo';
import { ToastContainer, toast } from 'react-toastify';
import { getUserStats } from '../../../store/actions/StatsActions/getStatsAction';
import PasswordStrengthMeter from '../Signup/PasswordStrengthMeter';
import zxcvbn from 'zxcvbn';
const customNotification = require('../utils/notification');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   colorLabel: ['label-success', 'label-info', 'label-warning', 'label-primary'],
      colorLabel: ['label-info', 'label-info', 'label-info', 'label-info'],
      firstname: "",
      pseudonyme: "",
      lastname: "",
      email: "",
      password: "",
      degree: "",
      linkedin: "",
      gitlab: "",
      companyPosition: "",
      location: "",
      website: "",
      cv: "",
      note: "",
      x: [],
      selectedOption: [],
      userData: {
        userId: localStorage.getItem("userId"),
        familyName: localStorage.getItem("familyName"),
        givenName: localStorage.getItem("givenName"),
        imageUrl: localStorage.getItem("imageUrl")
      }
    };
    this.handleRange = this.handleRange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlFormSubmitAction = this.handlFormSubmitAction.bind(this);
  }

  handleFormSubmit(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (target.type === "file") {
      this.setState({
        cv: target.files.length > 0 ? target.files[0] : this.state.cv
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
    if (this.state.password !== "" && this.state.password.length < 8) {
      customNotification.fireNotification("warning", "Password must contain at least 8 characters")
      return false;
    } else if (this.state.password !== "" && parseInt(testedResult.score) < 3) {
      customNotification.fireNotification("error", "Password must be strong")
      return false;
    } else if (!validateEmail.test(this.state.email)) {
      customNotification.fireNotification("warning", "Email not valid")
      return false;
    }
    return true;
  }


  async handlFormSubmitAction(e) {
    e.preventDefault();
    if (this.valdateFormData()) {
      await this.props.onUploadProfile(this.state);
      await this.props.onGetProfileInfo();
      await this.props.onGetCategoriesList();
    }
  }


  //TODO PUT THIS FUNCTIONS IN UTILS
  successNotification(msg) {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  dangerNotification(msg) {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  handleChange = selectedOption => {
    let x = [];
    if (selectedOption) {
      selectedOption.map((option, index) => {
        return (
          x.push({
            id: option.value,
            label: option.label,
            rang: this.state.x[index] !== undefined && this.state.x.length > 0 ? this.state.x[index].rang : 0,
          })
        )
      })
    }

    this.setState({ selectedOption, x });
  };


  handleRange(rang, x, index) {
    x[index].rang = rang;
    this.setState({ x });
  }

  async UNSAFE_componentWillMount() {
    //  await this.props.onGetUserStats();
    await this.props.onGetProfileInfo();
    await this.props.onGetCategoriesList();
  }

  async initPropsValues(profileData) {
    if (this.props.profileInfo && profileData !== "" && profileData !== undefined) {
      if (profileData.data.cv !== "") {
        localStorage.setItem("imageUrl", profileData.data.cv)
        localStorage.setItem('familyName', profileData.data.lastname);
        localStorage.setItem('givenName', profileData.data.firstname);
      }
      
      this.setState({
        firstname: profileData.data.firstname,
        lastname: profileData.data.lastname,
        email: profileData.data.email,
        degree: profileData.data.degree,
        linkedin: profileData.data.linkedin,
        pseudonyme: profileData.data.pseudonyme,
        gitlab: profileData.data.gitlab,
        companyPosition: profileData.data.companyPosition,
        location: profileData.data.location,
        userData: {
          userId: localStorage.getItem("userId"),
          familyName: profileData.data.familyName,
          givenName: profileData.data.givenName,
          imageUrl: localStorage.getItem("imageUrl")
        },
        website: profileData.data.website,
        cv: profileData.data.cv === "" ? this.state.cv : profileData.data.cv,
        note: profileData.data.note,
        x: profileData.data.skills,
        selectedOption: profileData.selectedItems,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let profileData = nextProps.profileInfo;
    if (nextProps.profileUpdated.profileUpdated !== "") {
      if (nextProps.profileUpdated.profileUpdated.data.code === 200) {
        this.successNotification("Profile updated with success")
        setTimeout(() => {
          this.props.onGetProfileInfo();
        }, 30)
      }
      else
        this.dangerNotification("Sorry, an error occured")
    }
    setTimeout(() => {
      this.initPropsValues(profileData);
    }, 50)
  }

  render() {
    let catArray = [];

    if (this.props.listCats) {
      this.props.listCats.map(cat => {
        return catArray.push({ value: cat._id, label: cat.categoryTitle })
      })
    }

    return (
      <div>
        <Header />
        <ToastContainer />
        <div className="content-wrapper" >
          <section className="content-header" >
            <br></br>
            <ol className="breadcrumb">
              <li>
                <a href="/">
                  <i className="fa fa-dashboard"></i> Home
                </a>
              </li>
            </ol>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-primary" id="fixMarginTop">
                  <div className="box-body box-profile">
                    <img
                      className="profile-user-img img-responsive img-circle"
                      src={
                        this.state.userData.imageUrl && this.state.userData.imageUrl.toString().substring(0, 5) === 'https' ?
                          this.state.userData.imageUrl
                          : process.env.REACT_APP_API_URL + "/" + this.state.userData.imageUrl}

                      alt="User profile"
                    />

                    <h3 className="profile-username text-center">
                      {this.state.userData.givenName}{" "}
                      {this.state.userData.familyName}
                    </h3>

                    <p className="text-muted text-center">
                      {this.state.companyPosition}
                    </p>


                  </div>
                </div>


              </div>
              <div className="col-md-12" id="fixMarginTop">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#settings" data-toggle="tab">
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">

                    <div className="active tab-pane" id="settings">
                      <form onSubmit={this.handlFormSubmitAction} encType="multipart/form-data" className="form-horizontal">
                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            Firstname
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="text"
                              value={this.state.firstname}
                              className="form-control"
                              id="firstName"
                              onChange={this.handleFormSubmit}
                              name="firstname"
                              placeholder="Enter your firstName"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            Lastname
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="text"
                              value={this.state.lastname}
                              className="form-control"
                              id="lastName"
                              name="lastname"
                              onChange={this.handleFormSubmit}
                              placeholder="Enter your Lastname"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            pseudonyme
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="text"
                              value={this.state.pseudonyme}
                              className="form-control"
                              id="pseudonyme"
                              name="pseudonyme"
                              onChange={this.handleFormSubmit}
                              placeholder="Enter your pseudonyme"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            Email
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              value={this.state.email}
                              name="email"
                              onChange={this.handleFormSubmit}
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            Password
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword"
                              value={this.state.password}
                              name="password"
                              onChange={this.handleFormSubmit}
                              placeholder="Password"

                            />
                            <PasswordStrengthMeter password={this.state.password} />
                          </div>

                        </div>



                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >Interests </label>
                          <div className="col-sm-10" style={{ 'zIndex': '222' }}>

                            <Select
                              isMulti
                              isSearchable
                              placeholder="Select your interests"
                              value={this.state.selectedOption}
                              onChange={this.handleChange}
                              options={catArray}
                            />
                          </div>
                        </div>

                        {this.state.x.map((option, index) => {
                          return (
                            <div key={option.id} className="form-group">
                              <p
                                className="col-sm-2 control-label"
                              >{option.label}</p>
                              <div className="col-sm-10">
                                <Slider
                                  axis="x"
                                  xstep="2"
                                  x={this.state.x[index].rang}
                                  onChange={({ x }) => this.handleRange(x, this.state.x, index)}
                                />
                              </div>
                            </div>
                          )
                        })}

                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                          >
                            Profile photo
                          </label>

                          <div className="input-group image-preview col-md-8">
                            <input type="text" className="form-control image-preview-filename" value={this.state.cv.name ? this.state.cv.name : this.state.cv} disabled="disabled" />
                            <span className="input-group-btn">

                              <div className="btn btn-default image-preview-input">
                                <span className="glyphicon glyphicon-folder-open"></span>
                                <span className="image-preview-input-title">   Browse</span>
                                <input id="cv" name="photo" onChange={this.handleFormSubmit} type="file" accept="image/png, image/jpeg, image/gif" />
                              </div>
                            </span>
                          </div>
                          <div className="input-group image-preview col-md-10 col-md-offset-2">
                            {this.state.cv !== "" ?
                              <a target="_blank" href={process.env.REACT_APP_API_URL + "/" + this.state.cv} rel="noopener noreferrer">Click hereto see my profile photo</a>
                              : ""}
                          </div>
                        </div>



                        <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-info">
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Sidebar />
        <Footer />
      </div>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    listCats: state.getCategoriesList.listCategories,
    profileInfo: state.profileInfo.profileInfo.data,
    profileUpdated: state.profileUpdated,
    userStats: state.getUserStats.userStat,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onGetCategoriesList: () => dispatch(getCategoriesList()),
    onUploadProfile: (data) => dispatch(uploadProfile(data)),
    onGetProfileInfo: (data) => dispatch(getProfileInfo()),
    onGetUserStats: () => dispatch(getUserStats()),
  }
};

export default connect(
  state,
  mapDispatchToProps
)(Profile);
