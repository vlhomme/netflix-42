
import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import moment from "moment";


class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    initPag(currentPage) {
        let allPagination = [];
        let i = 0;
        var CurrentDate = moment();

        //if (currentPage - 2 >= 0)
         //   i = currentPage - 2;

        for (i; i <= currentPage + 2; i++) {
            if (i === currentPage)
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99} className="active"><span id={i}>{i + 1}</span></li>);
            else {
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99}><span id={i}>{i + 1}</span></li>);
            }
        }
        allPagination.push(<li style={{ 'cursor': 'pointer' }} key="..."><span>...</span></li>);
        allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={this.props.totalPage - 1 + CurrentDate + Math.random() * 99}><span id={this.props.totalPage - 1}>{this.props.totalPage}</span></li>);


        return allPagination;
    }

    initPagDub(currentPage) {
        let allPagination = [];
        let i = 0;
        let delimiter = 0;
        var CurrentDate = moment();
        if (currentPage - 2 >= 0)
            i = currentPage - 2;

        allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={"0" + CurrentDate + Math.random() * 299} ><span id="0">1</span></li>);
        allPagination.push(<li style={{ 'cursor': 'pointer' }} key={CurrentDate + Math.random() * 99}><span>...</span></li>);

        if (currentPage === this.props.totalPage - 1) {
            delimiter = currentPage;
        } else {
            delimiter = currentPage + 2;
        }

        for (i; i <= delimiter; i++) {
            if (i === currentPage)
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99} className="active"><span style={{ 'cursor': 'pointer' }} id={i}>{i + 1}</span></li>);
            else {
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99}><span id={i}>{i + 1}</span></li>);
            }
        }

        if (currentPage !== this.props.totalPage - 1) {
            allPagination.push(<li style={{ 'cursor': 'pointer' }} key={CurrentDate + Math.random() * 99}><span>...</span></li>);
            allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={this.props.totalPage - 1 + CurrentDate + Math.random() * 99}><span id={this.props.totalPage - 1}>{this.props.totalPage}</span></li>);
        }

        i = 0;
        delimiter = 0;
        return allPagination;

    }

    initPagEnd(currentPage) {
        let allPagination = [];
        let i = 0;
        var CurrentDate = moment();

        allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={CurrentDate + Math.random() * 99 + "0"} ><span id="0">1</span></li>);
        allPagination.push(<li style={{ 'cursor': 'pointer' }} key={CurrentDate + Math.random() * 99}><span>...</span></li>);

        i = this.props.totalPage - 6;

        for (i; i < this.props.totalPage; i++) {
            if (i === currentPage)
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99} className="active"><span id={i}>{i + 1}</span></li>);
            else if (i !== this.props.totalPage - 1) {
                allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99}><span id={i}>{i + 1}</span></li>);
            }
        }
        if (currentPage !== this.props.totalPage - 1)
            allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={this.props.totalPage - 1 + CurrentDate + Math.random() * 99}><span id={this.props.totalPage - 1}>{this.props.totalPage}</span></li>);
        return allPagination;
    }

    initPagination(active) {
        let allPagination = [];
        let totalPage = 0;
        var CurrentDate = moment();
        totalPage = this.props.totalPage;

        if (totalPage > 15) {
            if (this.props.currentPage < 6) {
                allPagination = this.initPag(this.props.currentPage)
            } else if (this.props.currentPage >= 6 && this.props.totalPage - this.props.currentPage > 5) {
                allPagination = this.initPagDub(this.props.currentPage)
            } else {
                allPagination = this.initPagEnd(this.props.currentPage)
            }
        } else {
            for (var i = 0; i < totalPage; i++) {
                if (i === this.props.currentPage)
                    allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99} className="active"><span id={i}>{i + 1}</span></li>);
                else
                    allPagination.push(<li style={{ 'cursor': 'pointer' }} onClick={this.props.activePagination} key={i + CurrentDate + Math.random() * 99}><span id={i}>{i + 1}</span></li>);
            }
        }
        i = 0;
        totalPage = 0;
        return allPagination;
    }


    render() {

        return (
            <div className="row" style={{ display: "flex", justifyContent: "center" }}>
                <ul className="pagination">
                    {this.props.totalPage > 1 ?
                        this.initPagination(this.props.currentPagination)
                        : ""}
                </ul></div>
        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        location: state.location,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
    }
};

export default connect(state, mapDispatchToProps)(Pagination);