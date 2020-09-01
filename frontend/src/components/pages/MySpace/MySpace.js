import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { storeMaterialDetails } from '../../../store/actions/materialAction/StoreMaterialDetails'
import { getAllMyMaterials } from '../../../store/actions/materialAction/getAllMyMaterials';
import { removeMaterial } from '../../../store/actions/materialAction/deleteMaterialAction';
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from "../utils/Pagination";

class MySpace extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            currentPagination: 0,
            allPagination: []
        }

        this.goToMaterialDatails = this.goToMaterialDatails.bind(this);
        this.initPagination = this.initPagination.bind(this);
        this.activePagination = this.activePagination.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
    }

    removeMaterial(material) {
        this.setState({
            page: 0,
            currentPagination: 0,
        })
        this.props.onRemoveMaterial(material._id);
        setTimeout(() => {
            this.props.onGetAllMyMaterials(this.state.page);
        }, 300);
        document.getElementById('close' + material._id).click();
        toast.success("Material has been deleted", {
            position: toast.POSITION.TOP_RIGHT
        })
    }


    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        await this.props.onGetAllMyMaterials(this.state.currentPagination);
    }

    goToMaterialDatails(material) {
        this.props.onStoreMaterialDetails(material);
    }

    async UNSAFE_componentWillMount() {
        await this.props.onGetAllMyMaterials(this.state.page);
    }

    initPagination(active) {
        let allPagination = [];

        for (var i = 0; i < this.props.totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{'cursor': 'pointer'}} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{'cursor': 'pointer'}} id={i}>{i + 1}</span></li>);
        }
        i = 0;
        return allPagination;
    }

    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <div>
                    <div className="content-wrapper">
                        <section className="content">
                            <div className="content">
                                <ToastContainer />
                                <section className="content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="box box-primary" id="fixMarginTop">
                                                <div className="box-header with-border">
                                                    <div className="form-group">
                                                        <label style={{ fontSize: "20px", marginRight: "20px" }} className="control-label">Add movie </label>
                                                        <Link to="/addmaterials" onClick={this.props.navigateTo.bind(this, '/addmaterials')}>
                                                            <button type="submit" className="btn btn-info">
                                                                <i className="fa fa-plus"></i>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="box-tools pull-right">
                                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="box box-primary">
                                                <div className="box-header with-border">
                                                    <h3 className="box-title">My uploaded movies</h3>

                                                    <div className="box-tools pull-right">
                                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                    </div>
                                                </div>
                                                <div className="box-body">
                                                    <div className="row" >
                                                        {/*<div className="input-group margin col-md-5">
                                                            <input type="text" className="form-control" />
                                                            <span className="input-group-btn">
                                                                <button type="button" className="btn btn-info btn-flat">search!</button>
                                                            </span>
        </div>*/}
                                                        <br></br>
                                                        {this.props.allMyMaterials && this.props.allMyMaterials.length > 0 ?
                                                            <span>
                                                                {this.props.allMyMaterials ? this.props.allMyMaterials.map(myMaterial => {
                                                                    return (
                                                                        <div key={myMaterial._id} className="col-md-3">
                                                                            <div id="listLessons" className="card-content">
                                                                                <div className="card-img">
                                                                                    <img src={process.env.REACT_APP_API_URL + "/" + myMaterial.photo} alt="" />
                                                                                </div>
                                                                                <div className="card-desc">

                                                                                    <h3>{myMaterial.title}</h3>
                                                                                    <div style={{ height: '140px', lineHeight: '20px', overflow: 'hidden' }}>
                                                                                        {parse(myMaterial.description)}
                                                                                    </div>
                                                                                    <br></br>
                                                                                    <div className="text-right">
                                                                                        <div className="btn-group">
                                                                                            <Link to="/materialdetails" >
                                                                                                <button type="button" onClick={() => { this.goToMaterialDatails(myMaterial) }} className="btn btn-warning btn-flat"><i className="fa fa-eye"></i></button>
                                                                                            </Link>
                                                                                            <Link to="/editMaterial" >
                                                                                                <button type="button" onClick={() => { this.goToMaterialDatails(myMaterial) }} className="btn btn-info btn-flat"><i className="fa fa-edit"></i></button>
                                                                                            </Link>
                                                                                            <Link to="#" >
                                                                                                <button data-toggle="modal" data-target={'#' + myMaterial._id} type="button" className="btn btn-danger btn-flat"><i className="fa fa-trash"></i></button>
                                                                                            </Link>
                                                                                        </div>
                                                                                    </div>


                                                                                    <div key={myMaterial._id} className="modal fade" id={myMaterial._id}>
                                                                                        <div className="modal-dialog">
                                                                                            <div className="modal-content">
                                                                                                <div className="modal-header">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="close"
                                                                                                        data-dismiss="modal"
                                                                                                        aria-label="Close"
                                                                                                    >
                                                                                                        <span aria-hidden="true">&times;</span>
                                                                                                    </button>
                                                                                                    <h4 className="modal-title">Confirmation</h4>
                                                                                                </div>
                                                                                                <div className="modal-body">
                                                                                                    <p>Are you sure about removing this material ?</p>
                                                                                                </div>
                                                                                                <div className="modal-footer">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-danger pull-right"
                                                                                                        onClick={() => { this.removeMaterial(myMaterial) }}
                                                                                                    >
                                                                                                        Validate
              </button>
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        className="btn btn-default pull-right"
                                                                                                        data-dismiss="modal"
                                                                                                        id={"close" + myMaterial._id}
                                                                                                    >
                                                                                                        Close
              </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }) : ""}
                                                            </span> :
                                                            <div className="col-md-12">
                                                                <h5>There are no uploaded courses. Be the first to add lessons.</h5>
                                                            </div>
                                                        }






                                                    </div>
                                                    {this.props.allMyMaterials && this.props.allMyMaterials.length > 0 ?
                                                        
                                                        <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                         : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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
        allMyMaterials: state.getAllMyMaterials.allMyMaterials.data,
        totalPage: state.getAllMyMaterials.allMyMaterials.total_pages + 1,
        deleteMaterial: state.deleteMaterial.materialDeleted
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetAllMyMaterials: (page) => dispatch(getAllMyMaterials(page)),
        onStoreMaterialDetails: (data) => dispatch(storeMaterialDetails(data)),
        onRemoveMaterial: (data) => dispatch(removeMaterial(data)),
    }
};

export default connect(state, mapDispatchToProps)(MySpace);
