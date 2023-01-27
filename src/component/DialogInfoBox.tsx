import '../global-css/_color.scss';
import React, { forwardRef, useImperativeHandle, FC, useState } from 'react';
import './css/DialogBox.css';
import { Modal } from 'react-bootstrap';
import { IAlert } from '../utils/interface/MRInterface';
import { VscError, VscInfo, VscWarning } from 'react-icons/vsc';
import moment from 'moment';


export interface IDialogInfoBox {
    handleShow(ia: IAlert[]):null;
}

const DialogInfoBox = forwardRef((props , ref) => {

    const [showModal, setShowModal] = useState(false);
    const [alerts, setAlerts] = useState<IAlert[]>([]);

    useImperativeHandle(ref, () => ({

        handleShow(ia : IAlert []) {

            setAlerts(ia);
            setShowModal(true);
        }
    }));

    function handleClose () {
        setShowModal(false);
    }


    return (
        <Modal 
            show={showModal} 
            onHide={handleClose} 
            size='xl'
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title"> 
                    <VscInfo /> ATTENZIONE 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className='table'>
                    <tbody> 
                        {
                            alerts.map((a, i) => {
                                return (
                                    <tr>
                                        <td>
                                            { a.info.type === 'E' ? <VscError style={{color:'red',  fontSize:'xx-large'}}/> : <VscWarning style={{color:'orange', fontSize:'xx-large'}}/> }
                                        </td>
                                        <td>
                                            {moment(a.day).format('DD/MM/YYYY')}
                                        </td>
                                        <td>
                                            {a.info.message}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn rdx-btn" onClick={handleClose}>
                    Chiudi
                </button>
            </Modal.Footer>
        </Modal>
    );
    
});

export default DialogInfoBox;
