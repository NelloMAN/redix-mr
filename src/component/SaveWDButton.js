import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdSave} from 'react-icons/md';
import axios from 'axios';
import './css/SaveWDButton.css';

function SaveWDButton(props) {

    //Gestione salvataggio attività
    function saveWorkDaysClick(e) {
        //props.OnSaveClick(e)

        let newWorkDays = props.nwd;

        axios.post("http://localhost:3001/insertWorkDays", {
            data: {
                newWorkDays
            }
            }).then((response) => {
                
                let data = response.data;
    
                //errWar è la lista contenente errori e warnings che il check lato server trova. Se è undefined allora non ce ne sono
                if (data.errWar !== undefined) {
                    alert(data.errWar)
                }
                
            }).catch(err => console.log(err))
    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={(e) => saveWorkDaysClick(e)} data-bs-toggle="tooltip" data-bs-placement="top" title="Save"> <MdSave className='wd-button-icon'/></button>                
    )
}

export default SaveWDButton;
