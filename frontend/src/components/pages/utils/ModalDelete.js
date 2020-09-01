
import React from "react";
import {getUserbyId } from '../../../store/actions/UsersActions/getUserPropsId';
import { connect } from 'react-redux';  
import { bindActionCreators } from "redux";
import { UserDelete } from '../../../store/actions/UsersActions/user_delete'; 


class ModalDelete extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }


    handleDelete(e) {
      e.preventDefault();
      const id = Object.values(this.props.userInfo)[0]['userId'];
      this.props.UserDelete(id);
      document.getElementById('modal-danger').click();
    }

    render() {
        return (
            <div key="user" class="modal modal-danger fade" id="modal-danger" >
            <div  class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Suprimer</h4>
                </div>
                <div class="modal-body">
                  <p>Etes vous sure de vouloir suprimer cette utilisateur : {Object.values(this.props.userInfo)[0]['lastname']} {Object.values(this.props.userInfo)[0]['firstname']}  ?</p>
                </div>
                <div class="modal-footer">
                  <button  type="button" class="btn btn-outline pull-left" data-dismiss="modal">Annuler</button>
                  <button  id={Object.values(this.props.userInfo)[0]['userId']} onClick={this.handleDelete} type="button" class="btn btn-outline">Confirmer</button>
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
      UserDelete
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);