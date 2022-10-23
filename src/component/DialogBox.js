import '../global-css/_color.scss';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './css/DialogBox.css';
import { Modal } from 'react-bootstrap';


const DialogBox = forwardRef((props, ref) => {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    useImperativeHandle(ref, () => ({

        handleShow(t, b) {
            setShowModal(true);
            setTitle(t);
            setBody(b);
        }
    }));

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
    
});

export default DialogBox;
