import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdSave} from 'react-icons/md';
import axios from 'axios';
import './css/SaveWDButton.css';
import { IAlert, IWorkDay } from '../utils/interface/MRInterface';

export interface ISaveWDButtonProps {
	nwd : IWorkDay [],
    changewd: IWorkDay [],
    deleteWdIDList: number [],
    OnSaveWDButtonClick(a?: IAlert[], wd?: IWorkDay []) : any
}

const SaveWDButton: React.FC<ISaveWDButtonProps> = (props:ISaveWDButtonProps) => {

    //Gestione salvataggio attività
    function saveWorkDaysClick() {

        let newWorkDays : IWorkDay [] = props.nwd;
        let changeWorkDays : IWorkDay [] = props.changewd;
        let deletedWorkDaysID : number [] = props.deleteWdIDList;

        axios.post("http://localhost:3001/saveWorkDays", {
            
                newWorkDays,
                changeWorkDays,
                deletedWorkDaysID
                
            }).then((response) => {
                
                let alert : IAlert[] = response.data.errWar;
    
                //errWar è la lista contenente errori e warnings che il check lato server trova. Se è undefined allora non ce ne sono
                if (alert !== undefined) {

                    const wdToSave : IWorkDay [] = response.data.wdToSave;
                    props.OnSaveWDButtonClick(alert, wdToSave);

                } else {
                    props.OnSaveWDButtonClick();
                }       
            }).catch(err => console.log(err)
        )
    }

    return (
        <button 
            type="button" 
            className='btn rdx-btn btn-circle' 
            onClick={saveWorkDaysClick} 
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title="Save"> 

                <MdSave className='wd-button-icon'/>
        </button>                
    )
}

export default SaveWDButton;
