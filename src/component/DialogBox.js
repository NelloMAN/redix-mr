import '../global-css/_color.scss';
import React from 'react';
import './css/DialogBox.css';
import { Modal, Button } from 'react-bootstrap';

class DialogBox extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            showModal: false,
            title: '',
            body: ''
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleShow (t, b) {
        this.setState(
            {
                showModal : true,
                title: t,
                body: b
            }
        );
    }

    handleClose () {
        this.setState({showModal : false});
    }

    render(){

        return (
            <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.body}</Modal.Body>
                <Modal.Footer>
                    <button className="btn rdx-btn" onClick={this.handleClose}>
                        Chiudi
                    </button>
                </Modal.Footer>
            </Modal>
          );
    }
}

export default DialogBox;
