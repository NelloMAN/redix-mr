import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdImportExport} from 'react-icons/md';
import './css/ExportWDButton.css';

function ExportWDButton(props) {

    //Gestione cambio mese: chiamo funzione DashboardPanel che chiamerà funzione WorkTable per aggiornare i dati
    function exportWorkDaysClick(e) {

    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={() => exportWorkDaysClick()} data-bs-toggle="tooltip" data-bs-placement="top" title="Export"> <MdImportExport className='wd-button-icon'/></button>                
    )
}

export default ExportWDButton;
