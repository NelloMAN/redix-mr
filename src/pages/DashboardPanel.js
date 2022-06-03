import React, { useEffect, useState, useRef } from 'react';
import './DashboardPanel.css';
import logo_redix from '../img/logo_redix.svg';
import Hamburger from 'hamburger-react'
import MonthComboBox from '../component/MonthComboBox';
import {useLocation} from 'react-router-dom';
import WorkTable from '../component/data-table/WorkTable';
import SumTable from '../component/data-table/SumTable';
import AddWDButton from '../component/AddWDButton';
import SaveWDButton from '../component/SaveWDButton';
import ExportWDButton from '../component/ExportWDButton';

function DashboardPanel() {

    const location = useLocation();
    const wtRef = useRef(null)

    const [usrData, setUsrData] = useState({
        usrEmail:"",
        usrName:"",
        selectedMonth: 0
    });

    useEffect(() => {

        fetch('http://localhost:3001/getUsrMonth/'+location.state.usrID)
        .then(response => response.json())
        .then (response => {

            setUsrData({
                usrEmail: response[0].usrEmail,
                usrName:  response[0].usrName,
                selectedMonth: response[0].lastMonth
            });
        })
        .catch();
    },[]);

    if (usrData.usrEmail === "") {
        return <p>Loading</p>
    }

    //Funzione callback di MonthComboBox: quando viene cambiato il mese viene aggiornata anche la WorkTable
    function monthChange(m) {

        if (wtRef.current) {
            //Funzione per cambiare i dati della WorkTable
            wtRef.current.wtMonthChange(m);
        }
    }

    function wtAddNewRow(newRow) {

        if (wtRef.current) {
            //Funzione per cambiare i dati della WorkTable
            wtRef.current.wtAddNewRow(newRow);
        }
    }

    return (
        <div>
            <header className=''>
                <div className='container-fluid'>
                    <div className='row ps-2 pt-3 pb-3'>
                        <div className='col-sm-9'>
                            <img src={logo_redix} alt="logo_redix" className="header-logo img-fluid"></img>
                        </div>
                        <div className='col-sm-3 d-flex justify-content-end'>
                            <Hamburger color='#0963AD' />
                        </div>
                    </div>
                    <div className='row header-name'>
                        <div className='col-sm-4 ps-3 pt-1 pb-1'>
                            <p className='m-0'>Bentornato {usrData.usrName} ({usrData.usrEmail})</p>
                        </div>
                        <div className='offset-sm-6 col-sm-2 ps-3 pt-1 pb-1'>
                            <p className='m-0 text-end'> versione 1.0</p>
                        </div>
                    </div>
                </div>
            </header>
            <br></br>
            <section>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <MonthComboBox usrID={location.state.usrID} month={usrData.selectedMonth} OnMonthChange= {(m) => {monthChange(m)}}/> 
                                </div>
                                <div className='offset-sm-4 col-sm-1 d-flex justify-content-end'>
                                    <AddWDButton OnSingleAWDClick = {(newRow)=>{wtAddNewRow(newRow)}}type='s'/>
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <AddWDButton type='m'/>
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <SaveWDButton/>
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <ExportWDButton/>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <WorkTable usrID={location.state.usrID} month={usrData.selectedMonth} ref={wtRef} />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-2'>
                            {<SumTable/>}
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>

                    </div>
                </div>
            </section>
        </div>   
    );
}

export default DashboardPanel;
