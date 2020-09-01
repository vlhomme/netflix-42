
import React from "react";
import {getUserbyId } from '../../../store/actions/UsersActions/getUserPropsId';
import { connect } from 'react-redux';  
import { bindActionCreators } from "redux";
import { userEdit } from '../../../store/actions/UsersActions/user_edit';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firsname : "",
            lastname: "",
            email: "",
            pIsActive: "",
            pIsAdmin: "",
        }

        this.state = {
            switchCheckbox: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.editThisUser = this.editThisUser.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
       // alert(value);
              this.setState({
                  [name]: value
              });
          }
    
    editThisUser() {
        let id =  Object.values(this.props.userInfo)[0]['userId'];     
        let AllUsersInfis = Object.values(this.props.userInfo)[0];
        this.props.userEdit(AllUsersInfis, id, this.state.firstname, this.state.lastname, this.state.email, this.state.pIsActive, this.state.pIsAdmin);
        document.getElementById('modal-warning').click();
    }
    render() {
        let activeValue = true;
        let adminValue = true;
        let userInfoGet = Object.values(this.props.userInfo);

        let pIsAdmin = "";
        let pIsActive = "";

        userInfoGet[0]['profileRole'] == 1 || userInfoGet[0]['profileRole'] == "true" ?
        pIsAdmin = true : pIsAdmin = false;
        
                

        userInfoGet[0]['profileIsActive'] == 1 || userInfoGet[0]['profileIsActive'] == "true" ?
        pIsActive = true : pIsActive = false;
        

        return (
            <div class="modal modal-info fade" id="modal-warning" >
            <div  class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Modifier</h4>
                </div>
                <div class="modal-body">
                <form role="form" method="post"  encType="multipart/form-data">
                    <div class="box-body">
    
                    <div class="form-group">
                        <label for="exampleInputPassword1">Nom</label>
                        <input type="text" onChange={this.handleChange} name="lastname" class="form-control"  placeholder={userInfoGet[0]['lastname']} required/>
                        </div>
    
                        <div class="form-group">
                        <label for="exampleInputPassword1">Prenom </label>
                        <input type="text" onChange={this.handleChange} name="firstname" class="form-control"  placeholder={userInfoGet[0]['firstname']} required/>
                        </div>
    
                        <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onClick={adminValue = false } onClick={activeValue = false} type="email" onChange={this.handleChange} name="email" class="form-control"  placeholder={userInfoGet[0]['email']} required/>
                        </div>
    
                         <div class="form-group">
                        <label class="custom-control custom-checkbox">
                        { pIsAdmin == adminValue ? <input type="checkbox" name="pIsAdmin" onChange={this.handleChange} style={{display:"none"}} class="custom-control-input" checked/>
                        : <input type="checkbox" style={{display:"none"}} onChange={this.handleChange} name="pIsAdmin" class="custom-control-input" />}
    
                            <span onClick={adminValue = false } class="custom-control-indicator"></span>Admin
                        </label>
                        </div>
                        
                        <div class="form-group">
                        <label class="custom-control custom-checkbox">
                        {pIsActive == activeValue ? <input type="checkbox" name="pIsActive" onChange={this.handleChange}  style={{display:"none"}} class="custom-control-input"  checked/>
                        : <input type="checkbox" style={{display:"none"}}name="pIsActive" onChange={this.handleChange}  class="custom-control-input" />}
    
                            <span onClick={activeValue = false} class="custom-control-indicator"></span>Active
                        </label>
                        </div>
    
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                  <button  type="button" class="btn btn-outline pull-left" data-dismiss="modal">Annuler</button>
                  <button  onClick={this.editThisUser} type="button" class="btn btn-outline">Confirmer</button>
                </div>
              </div>
            </div>
            </div>
    
        );
    }
}

const mapStateToProps = (state, ownProps = {}) => {
    return {
      userInfo: state.userIdInfo
    };
  };
  
  const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getUserbyId,
        userEdit
    },
    dispatch,
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);