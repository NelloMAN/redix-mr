import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdSave} from 'react-icons/md';
import './css/SaveWDButton.css';

function SaveWDButton(props) {

    //Gestione salvataggio attività
    function saveWorkDaysClick(e) {
        props.OnSaveClick(e)
    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={(e) => saveWorkDaysClick(e)} data-bs-toggle="tooltip" data-bs-placement="top" title="Save"> <MdSave className='wd-button-icon'/></button>                
    )
}

export default SaveWDButton;
