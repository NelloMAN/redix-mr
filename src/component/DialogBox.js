import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import './css/DialogBox.css';
import { Modal } from 'react-bootstrap';


function DialogBox(props) {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // constructor(props){

    //     super(props);
    //     this.state = {
    //         showModal: false,
    //         title: '',
    //         body: ''
    //     }

    //     this.handleClose = this.handleClose.bind(this);
    // }

    function handleShow(t, b) {

        setShowModal(true);
        setTitle(t);
        setBody(b);
    }

    function handleClose () {
        setShowModal(false);
    }

    return (
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <button className="btn rdx-btn" onClick={handleClose}>
                    Chiudi
                </button>
            </Modal.Footer>
        </Modal>
    );
    
}

export default DialogBox;
