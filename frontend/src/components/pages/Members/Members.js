
import React from "react";
import { getCategoriesList } from '../../../store/actions/materialAction/getCategoriesList';
import { getAllMembers } from '../../../store/actions/UsersActions/getAllUsers';
import { getAllFilteredMembers } from '../../../store/actions/UsersActions/getAllFilteredUsers';
import Header from '../../common/Header';
import Sidebar from '../../common/SideBar';
import Footer from '../../common/Footer';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Pagination from "../utils/Pagination";


class Memebers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colorLabel: ['label-success', 'label-info', 'label-warning', 'label-primary'],
            page: 0,
            allMembers: [],
            selectedCategory: "",
            currentPagination: 0,
            allPagination: []
        }
        this.handleChangeFilterCat = this.handleChangeFilterCat.bind(this);
        this.initPagination = this.initPagination.bind(this);
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
            this.props.onGetAllFilteredMembers(0, value);
        } else {
            this.props.onGetAllMembers(0);
        }
    }

    async activePagination(event) {
        this.setState({
            currentPagination: parseInt(event.target.id, 10)
        })
        await this.initPagination();
        if (this.state.selectedCategory === "")
            await this.props.onGetAllMembers(this.state.currentPagination);
        else
            await this.props.onGetAllFilteredMembers(this.state.currentPagination, this.state.selectedCategory)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.selectedCategory !== "")
            this.setState({
                allMembers: nextProps.allFilteredMembers
            })
        else
            this.setState({
                allMembers: nextProps.allMembers
            })
    }
    async UNSAFE_componentWillMount() {
        await this.props.onGetAllMembers();
        await this.props.onGetCategoriesList();
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;

        if (this.state.selectedCategory !== "")
            totalPage = this.props.totalPageFilteredMembers
        else
            totalPage = this.props.totalPage;

        for (var i = 0; i < totalPage; i++) {
            if (i === this.state.currentPagination)
                allPagination.push(<li onClick={this.activePagination} key={i} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else
                allPagination.push(<li onClick={this.activePagination} key={i}><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
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

                            <section className="content">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box box-primary" id="fixMarginTop">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">Liste des membres</h3>

                                                <div className="box-tools pull-right">
                                                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                                </div>
                                            </div>
                                            <div className="box-body">
                                                <div className="row">

                                                    <form className="form-inline margin">
                                                        {/*  <div className="form-group margin">
                                                            <input type="text" className="form-control" />
                                                            <button type="button" className="btn btn-info btn-flat">search!</button>
        </div>*/}
                                                        <div className="form-group margin">
                                                            <label style={{ marginRight: "15px" }} >Filter by interest</label>
                                                            <select className="form-control" name="category" onChange={this.handleChangeFilterCat} placeholder="Enter category">
                                                                <option value="" >Select</option>
                                                                {this.props.listCats.map(cat => {
                                                                    return (
                                                                        <option key={cat._id} value={cat._id} >{cat.categoryTitle}</option>
                                                                    )
                                                                })}   </select>
                                                        </div>
                                                    </form>
                                                    <br></br>

                                                    {this.state.allMembers ?
                                                        this.state.allMembers.map((member, index) => {
                                                            return (
                                                                <div key={index} className="col-md-3">
                                                                    <div className="image-flip" >
                                                                        <div className="mainflip">
                                                                            <div className="frontside">
                                                                                <div className="card">
                                                                                    <div className="card-body text-center">
                                                                                        <p><img className=" img-fluid" src={
                                                                                            member.imageUrl && member.imageUrl.toString().substring(0, 5) === 'https' ?
                                                                                                member.imageUrl
                                                                                                : process.env.REACT_APP_API_URL + "/" + member.imageUrl}
                                                                                            alt="card" /></p>
                                                                                        <h4 className="card-title">{member.givenName} {member.familyName}</h4>
                                                                                        <h5 className="card-title">{member.companyPosition}</h5>
                                                                                        <p style={{ height: '50px', lineHeight: '16px', overflow: 'hidden' }} className="card-text">{member.note}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="backside" style={{ width: '100%' }}>
                                                                                <div className="card">
                                                                                    <div className="card-body text-center mt-4">
                                                                                        <h4 className="card-title">Intrests</h4>
                                                                                        {member.skills.map((option, index) => {
                                                                                            return (
                                                                                                <span key={index} className={this.state.colorLabel[Math.floor(Math.random() * 3) + 0]}>{option.label} - {option.rang}%<br></br></span>
                                                                                            )
                                                                                        })}
                                                                                        <br></br>
                                                                                        <ul className="list-inline">
                                                                                            <li className="list-inline-item">
                                                                                                {member.cv !== "" ?
                                                                                                    <a target="_blank" href={process.env.REACT_APP_API_URL + "/" + member.cv} rel="noopener noreferrer" className="social-icon text-xs-center">
                                                                                                        <i className="fa fa-file"></i>
                                                                                                    </a>
                                                                                                    : ""}
                                                                                            </li>
                                                                                            <li className="list-inline-item">
                                                                                                {member.linkedin !== "" ?
                                                                                                    <a href={member.linkedin} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer" >
                                                                                                        <i className="fa fa-linkedin"></i>
                                                                                                    </a>
                                                                                                    : ""}
                                                                                            </li>
                                                                                            <li className="list-inline-item">
                                                                                                {member.gitlab !== "" ?
                                                                                                    <a href={member.gitlab} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer" >
                                                                                                        <i className="fa fa-github"></i>
                                                                                                    </a>
                                                                                                    : ""}
                                                                                            </li>
                                                                                            <li className="list-inline-item">
                                                                                                {member.website !== "" ?
                                                                                                    <a href={member.website} className="social-icon text-xs-center" target="_blank" rel="noopener noreferrer">
                                                                                                        <i className="fa fa-sitemap"></i>
                                                                                                    </a>
                                                                                                    : ""}
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        : ""}

                                                </div>

                                                {this.props.allMyMaterials && this.props.allMyMaterials.length >= 0 ?
                                                    <Pagination activePagination={this.activePagination} currentPage={this.state.currentPagination} totalPage={this.props.totalPage} />
                                                    : ""}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


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
        allMembers: state.getAllMembers.allMemebers.data,
        allFilteredMembers: state.getAllfilteredMembers.allMemebers.data,
        totalPageFilteredMembers: state.getAllfilteredMembers.allMemebers.total_pages + 1,
        totalPage: state.getAllMembers.allMemebers.total_pages + 1,
        listCats: state.getCategoriesList.listCategories
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetCategoriesList: () => dispatch(getCategoriesList()),
        onGetAllMembers: (page) => dispatch(getAllMembers(page)),
        onGetAllFilteredMembers: (page, catId) => dispatch(getAllFilteredMembers(page, catId))
    }
};

export default connect(state, mapDispatchToProps)(Memebers);
