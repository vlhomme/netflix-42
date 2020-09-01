
import React from "react";
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getAllMaterials } from '../../../store/actions/materialAction/getAllMaterials'
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { storeMaterialDetails } from '../../../store/actions/materialAction/StoreMaterialDetails';
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import { getFilteredMaterials } from '../../../store/actions/materialAction/filterMaterialByCategoryAction';
import { getUserStats } from '../../../store/actions/StatsActions/getStatsAction';
import Pagination from '../Utils/Pagination';

class Training extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            selectedCategory: "",
            allMaterials: [],
            currentPagination: 0,
            allPagination: []
        }
        this.handleChangeFilterCat = this.handleChangeFilterCat.bind(this);
        this.initPagination = this.initPagination.bind(this);
        this.goToMaterialDatails = this.goToMaterialDatails.bind(this);
        this.activePagination = this.activePagination.bind(this);
    }

    handleChangeFilterCat(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            selectedCategory: value,
            currentPagination: 0,
        });
        if (value !== "") {
            this.props.onGetFilteredMaterials(0, value);
        } else {
            this.props.onGetAllMaterials(0);
        }
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        if (this.state.selectedCategory === "")
            await this.props.onGetAllMaterials(this.state.currentPagination);
        else
            await this.props.onGetFilteredMaterials(this.state.currentPagination, this.state.selectedCategory)
    }

    goToMaterialDatails(material) {
        this.props.onStoreMaterialDetails(material);
    }

    async UNSAFE_componentWillMount() {
        await this.props.onGetAllMaterials(this.state.page);
        await this.props.onGetCategoriesList();
        await this.props.onGetUserStats();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.selectedCategory !== "")
            this.setState({
                allMaterials: nextProps.filteredMaterials
            })
        else
            this.setState({
                allMaterials: nextProps.allMaterials
            })
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;

        if (this.state.selectedCategory !== "")
            totalPage = this.props.totalPageFiltered
        else
            totalPage = this.props.totalPage;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{'cursor':'pointer'}} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{'cursor':'pointer'}} id={i}>{i + 1}</span></li>);
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

                            <div className="row" id="fixMarginTop">
                                <div className="col-lg-3 col-xs-6">
                                    <div className="small-box bg-olive">
                                        <div className="inner">
                                            <h3>{this.props.userStats.countMaterials}</h3>

                                            <p>UPLOADED</p>
                                        </div>
                                        <div className="icon">
                                            <i className="glyphicon glyphicon-cloud-upload"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xs-6">
                                    <div className="small-box bg-olive">
                                        <div className="inner">
                                            <h3>{this.props.userStats.countCategories}</h3>

                                            <p>CATEGORIES</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-stats-bars"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xs-6">
                                    <div className="small-box bg-olive">
                                        <div className="inner">
                                            <h3>{this.props.userStats.countMemebers}</h3>

                                            <p>MEMBERS</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-person-add"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xs-6">
                                    <div className="small-box bg-olive">
                                        <div className="inner">
                                            <h3>{this.props.userStats.countMyView}</h3>

                                            <p>VIEWS</p>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-pie-graph"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Materials list</h3>

                                                <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="row" >


                                                    <form className="form-inline margin">
                                                        {/*  <div className="form-group margin">
                                                            <input type="text" className="form-control" />
                                                            <button type="button" className="btn btn-info btn-flat">search!</button>
        </div>*/}
                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filter by category</label>
                                                            <select className="form-control" name="category" onChange={this.handleChangeFilterCat} placeholder="Enter category">
                                                                <option value="" >Select</option>
                                                                {this.props.listCats && this.props.listCats.length > 0 ?this.props.listCats.map(cat => {
                                                                    return (
                                                                        <option key={cat._id} value={cat._id} >{cat.categoryTitle}</option>
                                                                    )
                                                                }): ""}   </select>
                                                        </div>
                                                    </form>
                                                    <br></br>
                                                    {this.state.allMaterials && this.state.allMaterials.length > 0 ?
                                                        <span>
                                                            {this.state.allMaterials ? this.state.allMaterials.map(material => {
                                                                return (
                                                                    <div key={material._id} className="col-md-3">
                                                                        <div id={material._id} className="listLessons card-content">
                                                                            <div className="card-img">
                                                                                <img src={process.env.REACT_APP_API_URL + "/" + material.photo} alt="" />
                                                                            </div>
                                                                            <div className="card-desc" style={{ overflowWrap: 'break-word' }}>
                                                                                <h3>{material.title}</h3>
                                                                                <div style={{ height: '140px', lineHeight: '20px', overflow: 'hidden' }}>
                                                                                    {parse(material.description)}
                                                                                </div>
                                                                                <br></br>
                                                                                <Link to="/materialdetails" >
                                                                                    <button type="button" onClick={() => { this.goToMaterialDatails(material) }} className="btn-card" style={{ fontSize: "12px", fontWeight: "bold" }}>See more</button>
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }) : ""}
                                                        </span> :
                                                        <div className="col-md-12">
                                                            <h5>There are no uploaded courses. Be the first to add materials.</h5>
                                                        </div>}



                                                </div>
                                                {this.state.allMaterials && this.state.allMaterials.length > 0 && this.props.totalPage > 1 ?
                                                     <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                     :
                                                       ""}

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
        location: state.location,
        userStats: state.getUserStats.userStat,
        filteredMaterials: state.filteredMaterials.listFilteredCategories.data,
        allMaterials: state.allMaterials.allMaterials.data,
        totalPage: state.allMaterials.allMaterials.total_pages + 1,
        totalPageFiltered: state.filteredMaterials !== undefined ? state.filteredMaterials.listFilteredCategories.total_pages + 1 : 0,
        listCats: state.getCategoriesList.listCategories
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetAllMaterials: (page) => dispatch(getAllMaterials(page)),
        onStoreMaterialDetails: (data) => dispatch(storeMaterialDetails(data)),
        onGetCategoriesList: () => dispatch(getCategoriesList()),
        onGetFilteredMaterials: (page, catId) => dispatch(getFilteredMaterials(page, catId)),
        onGetUserStats: () => dispatch(getUserStats()),
    }
};

export default connect(state, mapDispatchToProps)(Training);