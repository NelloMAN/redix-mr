import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import './DialogBox.css';
import { Modal } from 'bootstrap';

class DialogBox extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            showModal: false
        }
    }

    toggleDialogVisibility () {
        this.setState({showModal : !this.state.showModal});
    }

    render(){

        return (
            <Modal show={this.state.showModal} className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <p>One fine body&hellip;</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </Modal>
          );
    }
}

export default DialogBox;
