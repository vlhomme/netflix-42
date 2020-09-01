import React from "react";
import ModalDelete from '../utils/ModalDelete'; 
import {getUserbyId } from '../../../store/actions/UsersActions/getUserPropsId';
import { connect } from 'react-redux';  
import { bindActionCreators } from "redux";

    class UsersTableRow extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                userId : ""
            }
            this.handleDelete = this.handleDelete.bind(this);
        }


        handleDelete(e) {
            e.preventDefault();
            this.setState({
                userId: e.target.id
            })
        }
        
        render() {
            
            return (
                <tr key={this.props.index}>
                    <td >{this.props.usr.lastname}</td>
                    <td >{this.props.usr.firstname}</td>
                    <td >{this.props.usr.email}</td>
                    <td >{this.props.usr.profileRole == 0 ? <small style={{fontSize: "15px"}} className="label bg-green">User</small>
                    : <small style={{fontSize: "15px"}} className="label bg-yellow">Admin</small>}</td>
                    <td >{this.props.usr.profileIsActive == true ? <small style={{fontSize: "15px"}} className="label bg-green">Active</small> 
                    : <small style={{fontSize: "15px"}} className="label bg-red">disactive</small> } </td>
                    <td >
                    <div class="btn-group">
                        <button  id={this.props.getUserbyId(this.props.usr) }  type="button" class="btn btn-warning btn-flat" data-toggle="modal" data-target="#modal-warning" onClick={this.handleDelete}><i class="fa fa-edit"></i></button>
                        <button  id={this.props.getUserbyId(this.props.usr) } type="button"  class=" btn btn-danger btn-flat" data-toggle="modal" data-target="#modal-danger" onClick={this.handleDelete} ><i class="fa fa-trash"></i></button>
                    </div>
                    </td>
                </tr>
            );
        }
    }


const mapStateToProps = (state, ownProps = {}) => {
    return {
        getUserbyId: state.getUserbyId
    };
  };

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserbyId,
    },
    dispatch,
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(UsersTableRow);