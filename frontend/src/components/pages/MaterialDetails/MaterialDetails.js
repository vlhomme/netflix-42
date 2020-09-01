import React from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import parse from "html-react-parser";
import { updateMaterialViews } from "../../../store/actions/materialAction/updateMaterialViews";
import { updateMaterialLikeDislike } from '../../../store/actions/materialAction/updateLikeDislikeMaterial';
import Moment from 'moment';

class MaterialDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentPagination: 0,
      totalPage: 0,
      allPagination: [],
      userId: localStorage.getItem("userId"),
      selectedVideo: "",
      videos: [],
      materialDetails: {},
    };

    this.trackModal = this.trackModal.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.initPagination = this.initPagination.bind(this);
    this.initVideoList = this.initVideoList.bind(this);
    this.activePagination = this.activePagination.bind(this);
    this.updateDislike = this.updateDislike.bind(this);
    this.updatelike = this.updatelike.bind(this);
    this.updateVideoViews = this.updateVideoViews.bind(this);
  }

  updatelike(e, likeVideo, index) {
    e.preventDefault()
    let data = {
      materialId: this.state.materialDetails._id,
      videoId: likeVideo._id,
      userId: this.state.userId,
      dislike: false,
      index: index,
      like: true
    }
    if (likeVideo.likes.indexOf(this.state.userId) === -1) {
      likeVideo.likes.push(this.state.userId);
    } else {
      likeVideo.likes.splice(likeVideo.likes.indexOf(this.state.userId), 1);
    }

    let videos = this.state.videos;

    this.setState({
      videos: videos
    })

    this.props.onUpdateMaterialLikeDislike(data)

  }

  updateDislike(e, dislikeVideo, index) {
    e.preventDefault();
    let data = {
      materialId: this.state.materialDetails._id,
      videoId: dislikeVideo._id,
      userId: this.state.userId,
      dislike: true,
      index: index,
      like: false
    }

    if (dislikeVideo.dislikes.indexOf(this.state.userId) === -1) {
      dislikeVideo.dislikes.push(this.state.userId);
    } else {
      dislikeVideo.dislikes.splice(dislikeVideo.dislikes.indexOf(this.state.userId), 1);
    }

    let videos = this.state.videos;
    this.setState({
      videos: videos
    })

    this.props.onUpdateMaterialLikeDislike(data)
  }

  async activePagination(event) {
    this.setState({
      currentPagination: parseInt(event.target.id, 10)
    })
    await this.initPagination();
    await this.initVideoList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("test :", nextProps.profileInfo)
  }

  initVideoList() {
    let videos = [];

    if (this.props.materialDetails.videos !== undefined) {
      localStorage.removeItem("materialDetails");
      localStorage.setItem("materialDetails", JSON.stringify(this.props.materialDetails));
    }

    if (this.props.materialDetails.length === 0)
      videos = JSON.parse(localStorage.getItem("materialDetails"));
    else
      videos = this.props.materialDetails;

    if (videos !== [])
      this.setState({
        totalPage: videos.videos.length / 30,
        videos: videos.videos.slice(this.state.currentPagination * 30, (this.state.currentPagination + 1) * 30),
        materialDetails: videos
      })
  }

  UNSAFE_componentWillMount() {
    this.initVideoList();
    this.initPagination();
  }

  initPagination(active) {
    let allPagination = [];

    for (var i = 0; i < this.state.totalPage; i++) {
      if (i === this.state.currentPagination)
        allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
      else
        allPagination.push(<li onClick={this.activePagination} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
    }
    i = 0;
    return allPagination;
  }

  trackModal(e, videoIn) {
    e.preventDefault();
    let modal = document.getElementById(videoIn._id);
    let video = document.getElementById('video' + videoIn._id);
    if (modal && modal.classList.contains('in') === false) {
      this.updateVideoViews(e, videoIn);
      video.pause();
    }
  }

  async updateVideoViews(e, video) {
    e.preventDefault();
    let data = {
      materialId: this.state.materialDetails._id,
      videoId: video._id,
      userId: this.state.userId
    }
    await this.props.onUpdateMaterialViews(data);
  }

  selectVideo(video) {
    this.setState({
      selectedVideo: video
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div>
          <div className="content-wrapper">
            <section className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="box box-primary" id="fixMarginTop">
                    <div className="box-header with-border">
                      <h3 className="box-title">Material details</h3>

                      <div className="box-tools pull-right">
                        <button
                          type="button"
                          className="btn btn-box-tool"
                          data-widget="collapse"
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-box-tool"
                          data-widget="remove"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="row">
                        <div className="col-md-12 tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="seite1"
                          >
                            <article className="panel panel-default">
                              <header className="panel-heading">
                                <h1 className="text-muted text-center">
                                  {this.state.materialDetails.title}
                                </h1>
                              </header>
                              <div className="panel-body">
                                <div className="row">
                                  <img
                                    className="img-responsive center-block"
                                    src={
                                      process.env.REACT_APP_API_URL +
                                      "/" +
                                      this.state.materialDetails.photo
                                    }
                                    alt="pic holder"
                                  />
                                  <br></br>
                                  <div className="textbox">
                                    <b>Uploaded by :</b>{" "}
                                    {this.state.materialDetails.uploadedBy
                                      ? this.state.materialDetails.uploadedBy
                                        .userFullname
                                      : ""}{" "}
                                    <br></br>
                                    <b>At :</b>{" "}
                                    {this.state.materialDetails
                                      ? Moment().format('ll', this.state.materialDetails.dateOfCreation)
                                      : ""}
                                  </div>

                                  <div className="textbox">
                                    <b>Description :</b>{" "}

                                    {this.state.materialDetails.description
                                      ? parse(
                                        this.state.materialDetails.description
                                      )
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Materials List</h3>

                      <div className="box-tools pull-right">
                        <button
                          type="button"
                          className="btn btn-box-tool"
                          data-widget="collapse"
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-box-tool"
                          data-widget="remove"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="row">
                        {this.state.videos
                          ? this.state.videos.map((video, index) => {
                            return (
                              <div key={video._id}>

                                <div
                                  onClick={(e) => { this.trackModal(e, video) }}
                                  className="modal fade"
                                  id={video._id}
                                >
                                  <div className="modal-dialog" id="videosList">
                                    <div className="modal-content" id="modal-contentStyle">
                                      <div className="modal-header">
                                        <button
                                          style={{
                                            'color': 'white', 'fontSize': '48px',
                                            'position': 'fixed',
                                            'right': '0px'
                                          }}
                                          type="button"
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                            </span>
                                        </button>
                                        <h4 className="modal-title" style={{ 'color': 'white' }}>
                                          {video.videoTitle}
                                        </h4>
                                      </div>
                                      <div className="modal-body">
                                        <video
                                          id={'video' + video._id}
                                          controls
                                          style={{
                                            position: "relative",
                                            width: "100%",
                                            height: "50%"
                                          }}
                                        >
                                          <source
                                            src={
                                              process.env.REACT_APP_API_URL +
                                              "/materials/video/" +
                                              video.videoLink
                                            }
                                            type="video/mp4"
                                          />
                                        </video>
                                        <div key={video._id} className="pull-right form-group col-md-3 col-md-offset-7">
                                          <div className="input-group">
                                            <span style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className="image-preview-input input-group-addon">
                                              <span style={{ marginRight: '5px' }}>{video.views.length + 1}</span>
                                              <span className="glyphicon glyphicon-eye-open">
                                              </span>
                                            </span>
                                            <span onClick={(e) => {
                                              this.updateDislike(e, video, index)
                                            }} style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className=" image-preview-input input-group-addon">
                                              <span style={{ marginRight: '5px' }}>{video.dislikes.length}</span>
                                              <span className="glyphicon  glyphicon-thumbs-down"></span>
                                            </span>
                                            <span onClick={(e) => {
                                              this.updatelike(e, video, index)
                                            }} style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className="image-preview-input input-group-addon">
                                              <span style={{ marginRight: '5px' }}>{video.likes.length}</span>
                                              <span className="glyphicon  glyphicon-thumbs-up"></span>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <br></br>
                                    </div>
                                  </div>

                                </div>

                                <div
                                  data-toggle="modal"
                                  data-target={'#' + video._id}
                                  id="modal-default-toggle"
                                  className="col-md-2 image-grid-item"
                                >
                                  <div
                                    style={{ backgroundColor: "light-blue" }}
                                    className="image-grid-cover"
                                  >
                                    <span className="image-grid-clickbox"></span>
                                    <span className="cover-wrapper">
                                      {video.videoTitle}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                          : ""}
                      </div>


                      {/**
                      <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                        <ul className="pagination">
                          {this.initPagination(this.state.currentPagination)}
                        </ul></div>

*/}

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const state = (state, ownProps = {}) => {
  return {
    location: state.location,
    materialDetails: state.materialDetails.materialDetails
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location));
    },
    onUpdateMaterialViews: (data) => dispatch(updateMaterialViews(data)),
    onUpdateMaterialLikeDislike: (data) => dispatch(updateMaterialLikeDislike(data)),
  };
};

export default connect(
  state,
  mapDispatchToProps
)(MaterialDetails);
