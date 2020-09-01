import React from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/SideBar";
import Footer from "../../common/Footer";
import { connect } from "react-redux";
import { DefaultPlayer as Video } from 'react-html5video';
import { push } from "react-router-redux";
import parse from "html-react-parser";
import moment from "moment";
import { saveMovieDetails } from '../../../store/actions/moviesActions/SaveMovieAction';
import { saveMovieComments } from '../../../store/actions/moviesActions/SaveMovieCommentAction';
import { getMovieComments } from '../../../store/actions/moviesActions/getMovieCommentsAction';
import ReactPlayer from 'react-player'
import styles from './style.css';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      magnetLink: "",
      videoName: "",
      currentPagination: 0,
      subTitlesArr: [],
      videoUrlLink: "",
      totalPage: 0,
      imageUrl: localStorage.getItem('imageUrl'),
      allPagination: [],
      userId: localStorage.getItem("userId"),
      selectedVideo: "",
      commentContent: "",
      videos: [],
      moviesComments: [],
      materialDetails: {},
    };

    this.initVideoList = this.initVideoList.bind(this);
    this.handleCommentSave = this.handleCommentSave.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  async handleCommentSave(e) {
    e.preventDefault();
    let allMovieComments = this.state.moviesComments;

    let data = {
      movieId: this.state.materialDetails.id,
      userId: this.state.userId,
      userImage: this.state.imageUrl,
      commentContent: this.state.commentContent,
      userFullName: localStorage.getItem('familyName') + " " + localStorage.getItem('givenName'),
      dateOfCreation: moment().toString(),
    }

    if (this.state.commentContent !== "") {
      await this.props.onSaveMovieComments(data);
      allMovieComments.push(data);
      this.setState({
        moviesComments: allMovieComments,
        commentContent: "",
      })
    }
  }



  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.saveMovie.data !== undefined && nextProps.saveMovie.code === 200) {
      this.setState({
        videoUrlLink: nextProps.saveMovie.data.videoUrlLink,
        subTitlesArr: nextProps.saveMovie.data.subTitlesArr
      })
      this.videoPlayer();
    }

    if (nextProps.getMovieComments.data !== undefined && nextProps.getMovieComments.code === 200) {
      this.setState({
        moviesComments: nextProps.getMovieComments.data,
      })
    }
  }

  async initVideoList() {
    let videos = [];

    if (this.props.materialDetails.videos !== undefined) {
      localStorage.removeItem("materialDetails");
      localStorage.setItem("materialDetails", JSON.stringify(this.props.materialDetails));
    }

    if (this.props.materialDetails.length === 0)
      videos = JSON.parse(localStorage.getItem("materialDetails"));
    else
      videos = this.props.materialDetails;

    if (videos.url !== undefined) {
      //this.props.onSaveMovieDetails(videos);
      this.setState({
        materialDetails: videos
      })
    }
  }

  async UNSAFE_componentWillMount() {
    this.initVideoList();
  }

  async componentDidMount() {

    if (this.state.materialDetails.url !== undefined) {
      this.props.onSaveMovieDetails(this.state.materialDetails);
    }

    if (this.state.materialDetails.id !== undefined)
      this.props.onGetMovieComments(this.state.materialDetails.id);
  }

  updateVideo() {
    this.videoPlayer();
  }

  formatSubtitleTracker(arr) {
    let data = [];
    let i = 0;

    if (arr.length > 0) {
      while (i < arr.length) {
        data.push({
          label: arr[i].lang,
          kind: 'subtitles',
          srclang: arr[i].langShort,
          src: process.env.REACT_APP_API_URL + "/" + arr[i].path.substr(13, arr[i].path.length)
        })
        i++;
      }
    }

    return data;
  }


  videoPlayer() {
    if (this.state.videoUrlLink !== "") {

      return <div className={styles.component}>

        <ul className={styles.videoList}>
          <li className={styles.videoListItem}>
            <ReactPlayer
              url={['http://localhost:3000/movies/stream/' + this.state.videoUrlLink]}
              className='react-player'
              controls
              width='100%'
              height='100%'
              config={{
                file: {
                  attributes: {
                    crossOrigin: 'true'
                  },
                  tracks: this.formatSubtitleTracker(this.state.subTitlesArr)
                }
              }}
            />
          </li>
        </ul>
      </div>
    }
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
                      <h3 className="box-title">Movie details</h3>

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
                        <div className="col-md-6 tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="seite1"
                          >
                            <article className="panel panel-default">
                              {/* <header className="panel-heading">
                                <h1 className="text-muted text-center">
                                  {this.state.materialDetails.title}
                                </h1>
                              </header> */}
                              <div className="panel-body">
                                <div className="row">
                                  <img
                                    className="img-responsive center-block"
                                    src={
                                      this.state.materialDetails.large_cover_image
                                    }
                                    alt="pic holder"
                                  />
                                  <br></br>


                                </div>
                              </div>
                            </article>
                          </div>
                        </div>

                        <div className="col-md-6 tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="seite1"
                          >
                            <article className="panel panel-default">
                              <header className="panel-heading">
                                <h1 className="text-muted text-center">
                                </h1>
                              </header>
                              <div className="panel-body">
                                <div className="row">
                                  <div className="textbox">
                                    <b>Rating :</b>
                                    {this.state.materialDetails.rating}
                                    <br></br>
                                    <b>Year :</b>{" "} {this.state.materialDetails.year}
                                  </div>

                                  <div className="textbox">
                                    <b>Genre :</b>
                                    {this.state.materialDetails.genres && this.state.materialDetails.genres.length > 0 ?
                                      this.state.materialDetails.genres.map((g, i) => {
                                        return <div key={i} class="tags">
                                          <a href="#" class="success">{g}</a>
                                        </div>
                                      }) : ""}

                                  </div>

                                  <div className="textbox">
                                    <b>Description :</b>{" "}
                                    {this.state.materialDetails.description_full}
                                  </div>


                                  <br></br>
                                  <b>Play movie :</b>
                                   <br></br>
                                  <div
                                    data-toggle="modal"
                                    data-target='#openModalMovie'
                                    id="modal-default-toggle"
                                    className="col-md-12 image-grid-item"
                                    className="col-md-12 image-grid-item"
                                  >
                                    <div
                                      style={{ backgroundColor: "light-blue" }}
                                      className="image-grid-cover"
                                    >
                                      <span className="image-grid-clickbox"></span>
                                      <span className="cover-wrapper">
                                        {this.state.materialDetails.title} <br></br>
                                        {this.state.videoUrlLink === "" ? "loading ..." : ""}
                                      </span>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Leave a comment</h3>

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
                        <div>

                          <div
                            className="modal fade"
                            id="openModalMovie"
                          >
                            <div className="modal-dialog" id="opnVideo">
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
                                    {this.state.materialDetails.title}
                                  </h4>
                                </div>
                                <div className="modal-body">
                                  {this.videoPlayer()}
                                  {/* <div className="pull-right form-group col-md-3 col-md-offset-7">
                                    <div className="input-group">
                                      <span style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className="image-preview-input input-group-addon">
                                        <span style={{ marginRight: '5px' }}>12</span>
                                        <span className="glyphicon glyphicon-eye-open">
                                        </span>
                                      </span>
                                      <span style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className=" image-preview-input input-group-addon">
                                        <span style={{ marginRight: '5px' }}>12</span>
                                        <span className="glyphicon  glyphicon-thumbs-down"></span>
                                      </span>
                                      <span style={{ 'backgroundColor': 'transparent', 'color': 'white', 'border': '0px', 'fontSize': '18px' }} className="image-preview-input input-group-addon">
                                        <span style={{ marginRight: '5px' }}>12</span>
                                        <span className="glyphicon  glyphicon-thumbs-up"></span>
                                      </span>
                                    </div>
                                  </div> */}
                                </div>
                                <br></br>
                              </div>
                            </div>

                          </div>



                        </div>
                      </div>
                      <div className="row">
                        {this.state.moviesComments && this.state.moviesComments.length > 0 ?
                          this.state.moviesComments.map(cm => {
                            return (
                              <div class="box-footer box-comments col-md-12">
                                <div className="box-comment">
                                  <img className="img-circle img-sm" src={
                                    cm.userImage && cm.userImage.toString().substring(0, 5) === 'https' ?
                                      cm.userImage
                                      : process.env.REACT_APP_API_URL + "/" + cm.userImage} alt="User Image" />

                                  <div className="comment-text">
                                    <span className="username">
                                      {cm.userFullName}
                                      <span className="text-muted pull-right">{moment().format('ll', cm.dateOfCreation)}</span>
                                    </span>
                                    {cm.commentContent}
                                  </div>
                                </div>
                              </div>

                            )
                          })

                          : ""}




                        <div className="box-footer col-md-12">
                          <form>
                            <img className="img-responsive img-circle img-sm" src={
                              this.state.imageUrl && this.state.imageUrl.toString().substring(0, 5) === 'https' ?
                                this.state.imageUrl
                                : process.env.REACT_APP_API_URL + "/" + this.state.imageUrl} alt="Alt Text" />

                            <div className="img-push">
                              <textarea col="10" row="22" type="text" className="form-control input-sm" name="commentContent" onChange={this.handleFormSubmit} placeholder="Press enter to post comment" />
                              <button onClick={(e) => { this.handleCommentSave(e) }} style={{ 'marginTop': '20px' }} className="pull-right btn btn-primary">Send</button>
                            </div>
                          </form>
                        </div>
                      </div>


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
    getMovieComments: state.getMovieComments.getMovieComments,
    saveMovie: state.saveMovie.saveMovie,
    location: state.location,
    materialDetails: state.materialDetails.materialDetails
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    navigateTo: location => {
      dispatch(push(location));
    },
    onSaveMovieDetails: (data) => dispatch(saveMovieDetails(data)),
    onSaveMovieComments: (data) => dispatch(saveMovieComments(data)),
    onGetMovieComments: (movieId) => dispatch(getMovieComments(movieId))
  };
};

export default connect(
  state,
  mapDispatchToProps
)(MovieDetails);
