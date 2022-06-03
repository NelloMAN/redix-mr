import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdSave} from 'react-icons/md';
import './css/SaveWDButton.css';

function SaveWDButton(props) {

    //Gestione cambio mese: chiamo funzione DashboardPanel che chiamerà funzione WorkTable per aggiornare i dati
    function saveWorkDaysClick(e) {

    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={() => saveWorkDaysClick()} data-bs-toggle="tooltip" data-bs-placement="top" title="Save"> <MdSave className='wd-button-icon'/></button>                
    )
}

export default SaveWDButton;
