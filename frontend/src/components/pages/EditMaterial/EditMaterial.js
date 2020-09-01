import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { ToastContainer, toast } from 'react-toastify';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editMyMaterial } from '../../../store/actions/materialAction/editMaterial';
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import ProgressBar from '../AddMaterials/progressBar';

class EditMaterials extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            materialId: this.props.materialDetails._id,
            progressPercentage: 0,
            countFiles: 0,
            progressBarPerc: 0,
            progress: false,
            addedVideo: false,
            title: this.props.materialDetails.title,
            oldPhoto: this.props.materialDetails.photo,
            photo: "",
            description: this.props.materialDetails.description,
            videos: this.props.materialDetails.videos,
            category: this.props.materialDetails.category,
        }

        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.handlFormSubmit = this.handlFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCurentVideoChange = this.handleCurentVideoChange.bind(this);
        this.removeVideo = this.removeVideo.bind(this);
    }

    removeVideo(index) {
        let splicedVideos = this.state.videos;
        splicedVideos.splice(index, 1)
        this.setState({
            videos: splicedVideos
        })
    }

    async UNSAFE_componentWillMount() {
        this.props.onGetCategoriesList();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            progressBarPerc: nextProps.add.progressUpload
        })

        if (this.state.progressBarPerc === 99 && this.state.addedVideo === true) {
            toast.success("Course uploaded with success !", {
                position: toast.POSITION.TOP_RIGHT
            })
            this.setState({
                progress: false,
                progressBarPerc: 0,
            });
        }
    }

    validator() {
        let check = 0;

        if (this.state.title === "") {
            this.warningNotification("Title is required");
            check = 1;
        }
        if (this.state.category === "") {
            this.warningNotification("Category is required");
            check = 1;
        } else {
            this.state.videos.forEach(video => {
                if (video.newFile !== undefined && video.newFile.type !== "video/mp4") {
                    this.warningNotification("All videos must respect MP4 format");
                    check = 1;
                }
            })
        }

        if (check === 0)
            return true;
        else
            return false
    }

    warningNotification(msg) {
        toast.warning(msg, {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    async handlFormSubmit(e) {
        e.preventDefault();
        if (this.validator()) {
            if (this.state.addedVideo === true)
                this.setState({
                    progress: true
                });
            await this.props.onEditMyMaterial(this.state)
            if (this.state.addedVideo === false) {
                toast.success("Materials uploaded with success !", {
                    position: toast.POSITION.TOP_RIGHT
                }) 
            }
        }
    }

    handleVideoChange(event) {
        const target = event.target;
        let videos = this.state.videos;
        let files = target.files;

        let i = 0;
        if (files.length > 0) {
            while (i < files.length) {
                videos.push({
                    comments: [],
                    dislikes: [],
                    likes: [],
                    newFile: files[i],
                    videoLink: "",
                    videoTitle: files[i].name.substring(0, files[i].name.length - 4),
                    views: []
                })
                i++;
            }
            this.setState({
                addedVideo: true,
                videos: videos
            })
        }
    }

    handleCurentVideoChange(event) {
        const target = event.target;
        const value = target.value;
        const index = target.name;
        let video = this.state.videos;

        if (target.type === "file") {
            video[index].newFile = target.files[0];
            this.setState({
                addedVideo: true,
                videos: video
            });
        } else {
            video[index].videoTitle = value;
            this.setState({
                video: video,
            });
        }
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

    render() {

        return (
            <div>
                <ToastContainer />
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">

                        <section className="content">

                            <div className="box-body" id="fixMarginTop">
                                <div className="row" >
                                    <div className="box box-primary">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">Edit course</h3>
                                        </div>
                                        <form method="post" onSubmit={this.handlFormSubmit} encType="multipart/form-data">
                                            <div className="box-body">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="text" value={this.state.title} className="form-control" name="title" onChange={this.handleChange} placeholder="Enter title" />
                                                </div>
                                                <div className="form-group">
                                                    <label>Category</label>
                                                    <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange} placeholder="Enter category">
                                                        <option value="" >Select</option>
                                                        {this.props.listCats.map(cat => {
                                                            return (
                                                                <option key={cat._id} value={cat._id} >{cat.categoryTitle}</option>
                                                            )
                                                        })}   </select>
                                                </div>

                                                <div className="form-group">
                                                    <label>Description</label>

                                                    <CKEditor
                                                        data={this.state.description}
                                                        editor={ClassicEditor}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({
                                                                description: data
                                                            });
                                                        }}
                                                    />
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Upload a photo</label>

                                                    <div className="input-group image-preview col-md-6">
                                                        <input type="text" className="form-control image-preview-filename" value={this.state.photo.name} disabled="disabled" />
                                                        <span className="input-group-btn">

                                                            <div className="btn btn-default image-preview-input">
                                                                <span className="glyphicon glyphicon-folder-open"></span>
                                                                <span className="image-preview-input-title">   Browse</span>
                                                                <input name="photo" onChange={this.handleChange} type="file" accept="image/png, image/jpeg, image/gif" />
                                                            </div>
                                                        </span>
                                                    </div>
                                                    <p className="help-block">Only format JPEG/PNG allowed.</p>
                                                    {this.state.oldPhoto && this.state.photo === "" ? <img style={{ position: 'relative', float: 'left', width: '300px' }}
                                                        className="img-responsive center-block"
                                                        src={
                                                            process.env.REACT_APP_API_URL +
                                                            "/" +
                                                            this.state.oldPhoto
                                                        }
                                                        alt="pic holder"
                                                    />
                                                        : ""}
                                                </div>
                                                <div className="form-group files col-md-5">
                                                    <label>Added more videos</label>
                                                    <input type="file" name="videos" onChange={this.handleVideoChange} multiple />
                                                    <p className="help-block">Only format MP4 allowed.</p>
                                                </div>
                                                <div className="form-group col-md-12">
                                                    <label>Uploaded videos</label>
                                                    <p className="help-block">Only format MP4 allowed.</p>

                                                    {this.state.videos ?
                                                        this.state.videos.map((video, index) => {
                                                            return (

                                                                <div key={index} className="form-group col-md-3">
                                                                    <div className="input-group">
                                                                        <input type="text" className="form-control image-preview-filename" id={video._id} value={video.videoTitle} name={index} onChange={this.handleCurentVideoChange} />
                                                                        <span className="image-preview-input input-group-addon danger">
                                                                            <span className="glyphicon glyphicon-folder-open"></span>
                                                                            <input id={video._id} name={index} onChange={this.handleCurentVideoChange} type="file" accept="video/mp4" />
                                                                        </span>
                                                                        <span className="image-preview-input input-group-addon danger" style={{ backgroundColor: 'red', color: 'white' }}>
                                                                            <span onClick={() => { this.removeVideo(index) }} className="glyphicon glyphicon-remove"></span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : ""}
                                                </div>
                                                {/* <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" /> Check me out
                  </label>
                                                </div> */}


                                                {this.state.progress === true ? <ProgressBar countTotal={this.state.countFiles} count={this.props.add.countUploadedFiles} percentage={this.state.progressBarPerc !== undefined ? this.state.progressBarPerc : 0} /> : ""}

                                            </div>
                                            <div className="box-footer">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
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
        add: state.addMaterial,
        listCats: state.getCategoriesList.listCategories,
        materialDetails: state.materialDetails.materialDetails
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetCategoriesList: () => dispatch(getCategoriesList()),
        onEditMyMaterial: (data) => dispatch(editMyMaterial(data))
    }
};

export default connect(state, mapDispatchToProps)(EditMaterials);
