
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getUserStats } from '../../store/actions/StatsActions/getStatsAction';
import { getProfileInfo } from '../../store/actions/ProfileAction/getProfileInfo';
import { getUserWallet } from '../../store/actions/UsersActions/getUserWalletAction';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        userId: localStorage.getItem('userId'),
        tcoinValue: 0,
        familyName: "",
        givenName: "",
        imageUrl: "",
        role: ""
      }
    }
  }

  async UNSAFE_componentWillMount() {
    // await this.props.onGetUserStats();
    await this.props.onGetProfileInfo();
    // await this.props.onGetUserWallet();
  }

  async initPropsValues(profileData) {
    if (this.props.profileInfo && profileData !== "" && profileData !== undefined) {
      this.setState({
        userData: {
          userId: localStorage.getItem("userId"),
          familyName: profileData.data.familyName,
          givenName: profileData.data.givenName,
          imageUrl: localStorage.getItem("imageUrl"),
          role: profileData.data.role,
        },
      })
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    let profileData = nextProps.profileInfo;
    this.initPropsValues(profileData);
    this.setState({
      tcoinValue: nextProps.getTcoin
    })
  }

  render() {

    return (
      <div>
        <aside id="sideBarStyle" className="main-sidebar">
          <section className="sidebar">
            <div className="user-panel">
              <div className="pull-left image">
                <img src={
                    this.state.userData.imageUrl && this.state.userData.imageUrl.toString().substring(0, 5) === 'https' ?
                    this.state.userData.imageUrl
                  : process.env.REACT_APP_API_URL + "/" + this.state.userData.imageUrl}
                   className="img-circle" alt="User" />
              </div>
              <div className="pull-left info">
                <p>{this.state.userData.givenName} {this.state.userData.familyName}</p>
                {/* <p style={{ fontSize: '16px' }}>{this.state.tcoinValue} <img style={{ position: 'relative', width: '13px', marginLeft: '3px', top: '-1px' }} src="./assets/dollar.svg" alt="imageSidebar" />
                  <span style={{ position: 'relative', marginLeft: '2px', color: 'gold', fontSize: '13px', }}>TCoin
                    </span>

                </p> */}
              </div>
            </div>
            {/*  
        <form action="#" method="get" className="sidebar-form">
        <div className="input-group">
          <input type="text" name="q" className="form-control" placeholder="Search..."/>
          <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
       */}
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">MAIN NAVIGATION</li>
              <li>
                  <a href="/movies">
                  <i className="glyphicon glyphicon-book"></i>
                  <span>Movies</span>
                  <span className="pull-right-container">
                  </span>
                  </a>
              </li>
              <li>
                <Link to="/myspace" onClick={this.props.navigateTo.bind(this, '/myspace')}>
                  <i className="glyphicon glyphicon-list-alt"></i>
                  <span>My space</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>

              <li>
                <a href="/uploadedMovies">
                <i className="glyphicon glyphicon-list-alt"></i>
                  <span>upLoaded movies</span>
                  <span className="pull-right-container">
                  </span>
                </a>
              </li>
              <li>
                <Link to="/members" onClick={this.props.navigateTo.bind(this, '/members')}>
                  <i className="glyphicon glyphicon-user"></i> <span>Users</span>
                  <span className="pull-right-container">
                  </span>
                </Link>
              </li>

            </ul>
          </section>
        </aside>
      </div>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    getTcoin: state.getTcoin.getTcoin.data,
    userStats: state.getUserStats.userStat,
    profileInfo: state.profileInfo.profileInfo.data,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: (location) => {
      dispatch(push(location));
    },
    onGetUserStats: () => dispatch(getUserStats()),
    onGetProfileInfo: (data) => dispatch(getProfileInfo()),
    onGetUserWallet: () => dispatch(getUserWallet()),
  }
};

export default connect(state, mapDispatchToProps)(Sidebar);