import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdSave} from 'react-icons/md';
import axios from 'axios';
import './css/SaveWDButton.css';
import { IWorkDay } from '../interface/MRInterface';

export interface ISaveWDButtonProps {
	nwd : IWorkDay [],
    OnSaveWDButtonClick(result: string) : any
}

const SaveWDButton: React.FC<ISaveWDButtonProps> = (props:ISaveWDButtonProps) => {

    //Gestione salvataggio attività
    function saveWorkDaysClick() {

        let newWorkDays : IWorkDay [] = props.nwd;

        axios.post("http://localhost:3001/insertWorkDays", {
            data: {
                newWorkDays
            }
            }).then((response) => {
                
                let data = response.data;
    
                //errWar è la lista contenente errori e warnings che il check lato server trova. Se è undefined allora non ce ne sono
                if (data.errWar !== undefined) {
                    alert(data.errWar)
                    props.OnSaveWDButtonClick(data.errWar);
                }
                
            }).catch(err => console.log(err))
    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={saveWorkDaysClick} data-bs-toggle="tooltip" data-bs-placement="top" title="Save"> <MdSave className='wd-button-icon'/></button>                
    )
}

export default SaveWDButton;
