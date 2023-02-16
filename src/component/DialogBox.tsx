import '../global-css/_color.scss';
import React, { forwardRef, useImperativeHandle, FC, useState } from 'react';
import './css/DialogBox.css';
import { Modal } from 'react-bootstrap';
import { DialogType } from '../utils/MREnum'; 

export interface IDialogBox {
    handleShow(title:string, body:string):null;
}

export interface IDialogBoxProps {
    type : number;
    OnActionDialogClose() : any;
}

const DialogBox = forwardRef((props : IDialogBoxProps, ref) => {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');


    useImperativeHandle(ref, () => ({

        handleShow(t:string, b:string) {
            setShowModal(true);
            setTitle(t);
            setBody(b);
        }
    }));

    function handleClose () {

        if (props.type === DialogType.ACTION_AFTER_CLOSE) {
            props.OnActionDialogClose();
        } 
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
