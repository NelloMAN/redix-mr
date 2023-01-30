import '../global-css/_color.scss';
import React, { forwardRef, useImperativeHandle, FC, useState } from 'react';
import './css/DialogBox.css';
import { Modal } from 'react-bootstrap';
import { IAlert, IWorkDay } from '../utils/interface/MRInterface';
import { VscError, VscInfo, VscWarning } from 'react-icons/vsc';
import moment from 'moment';
import axios from 'axios';


export interface IDialogInfoBox {
    handleShow(ia: IAlert[]):null;
}

export interface IDialogInfoBoxProps {

    wdToSave: IWorkDay [],
    wdToDel: number []
}

const DialogInfoBox = forwardRef((props : IDialogInfoBoxProps , ref) => {

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

    function applyCorrection(wdts : IWorkDay [], wdtd : number []) {

        axios.post("http://localhost:3001/saveWorkDays", {
            wdts,
            wdtd
        }).then((response) => {
            
        }).catch(err => console.log(err)
)
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
                                    <tr key={i+'_'+a.day}>
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
                <button 
                    className="btn rdx-btn" 
                    onClick={handleClose}>
                    Chiudi
                </button>
                <button 
                    className="btn rdx-btn" 
                    onClick={() => applyCorrection(props.wdToSave, props.wdToDel)}>
                    Applica correzioni
                </button>
            </Modal.Footer>
        </Modal>
    );
    
});

export default DialogInfoBox;
