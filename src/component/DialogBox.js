import React from 'react';
import './DialogBox.css';
import { Modal, Button } from 'react-bootstrap';

class DialogBox extends React.Component{

    constructor(props){

        super(props);
        this.state = {
            showModal: false
        }

        this.handleClose = this.handleClose.bind(this);
    }

    toggleDialogVisibility () {
        this.setState({showModal : !this.state.showModal});
    }

    handleClose () {
        this.setState({showModal : false});
    }

    render(){

        return (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Attenzione</Modal.Title>
                </Modal.Header>
                <Modal.Body>Email o password non corretta</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
          );
    }
}

export default DialogBox;
