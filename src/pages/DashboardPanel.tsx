import React, { useEffect, useState } from 'react';
import './DashboardPanel.css';
import logo_redix from '../img/logo_redix.svg';
import Hamburger from 'hamburger-react'
import MonthComboBox from '../component/MonthComboBox';
import {useLocation} from 'react-router-dom';
import WorkTable from '../component/data-table/WorkTable';
import DialogBox from '../component/DialogBox';
import AddSingleWDButton from '../component/AddSingleWDButton';
import AddMultipleWDButton from '../component/AddMultipleWDButton';
import SaveWDButton from '../component/SaveWDButton';
import ExportWDButton from '../component/ExportWDButton';
import axios from "axios";
import {IWorkDay, DateWorkDay, IUser} from '../utils/interface/MRInterface';


export interface IDashboardPanel {}

const DashboardPanel: React.FC<IDashboardPanel> = (props) => {

    const location = useLocation();

    const [usr, setMonth] = React.useState<IUser>({
        usrID: location.state.usrID,
        usrName: location.state.usrName,
        usrEmail: location.state.usrEmail,
        selectedMonth: location.state.selectedMonth
    })

    const [nwd, setNewWorkDays] = useState<IWorkDay[]>([]); //array con la lista dei nuovi record inseriti

    const [dateWorkDays, setDateWorkDays] = useState<DateWorkDay[]>([]); //array con la lista dei giorni lavorati dell'utente
    // useEffect per prendere i giorni dell'utente
    useEffect(() => {

        if (usr.selectedMonth !== 0) {
            axios.get('http://localhost:3001/getUsrWrkDay/' +usr.usrID +'/' + usr.selectedMonth)
            .then(res => {
                setDateWorkDays(res.data.dateWorkDay);
            });
        }

    },[usr.usrID, usr.selectedMonth]);

    const [changewd, setModifiedRecords] = useState<IWorkDay[]>([]); //array con la lista dei record esistenti e modificati

    const [deleteWdID, setDeleteWdIDList] = useState<number []>([]); //array contenente gli id da cancellare

    if (usr.usrEmail === "" || dateWorkDays.length === 0) {
        return <p>Loading</p>
    }

    // funzione per aggiornare gli array contenente i record modificati 
    // updRecord: il record modificato
    // wd: la lista dei record esistenti; aggiornare la lista con setDateWoekDays serve per aggiornare le righe
    function UpdateWorkDays( updRecord : IWorkDay, wd : DateWorkDay[]) {

        setModifiedRecords( changewd => [...changewd, updRecord]);
        //setDateWorkDays(wd);
    }


    function UpdateDeletedRecords( dwdID : number) {

        if(deleteWdID.includes(dwdID)) {
        	setDeleteWdIDList(deleteWdID.filter(item => item !== dwdID))
        } else {
        	setDeleteWdIDList( dwdList => [...dwdList, dwdID]);
        }
    }

    function ManageSavedResult(result : string) {
        //TODO
        //Gestione dell'esito dopo il salvataggio
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
                            <p className='m-0'>Bentornato {usr.usrName} ({usr.usrEmail})</p>
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
                                    <MonthComboBox 
                                        usrID={usr.usrID} 
                                        month={usr.selectedMonth}
                                        OnMonthChange= {(m:number) => {setMonth({...usr, selectedMonth : m})}}
                                    /> 
                                </div>
                                <div className='offset-sm-4 col-sm-1 d-flex justify-content-end'>
                                    <AddSingleWDButton 
                                        OnSingleAWDClick = {(newWD : IWorkDay)=>{setNewWorkDays( nwd => [...nwd, newWD])}} 
                                        type='s'
                                    />
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <AddMultipleWDButton 
                                        OnMultipleAWDClick = {(newWDS : IWorkDay[])=>{setNewWorkDays( nwd => nwd.concat(newWDS))}} 
                                        type='m'
                                    />
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <SaveWDButton 
                                        nwd={nwd} 
                                        OnSaveWDButtonClick={(result : string) => {ManageSavedResult(result)}}
                                    />
                                </div>
                                <div className='col-sm-1 d-flex justify-content-end'>
                                    <ExportWDButton/>
                                </div>
                            </div>
                            <br></br>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <WorkTable 
                                        usrID={usr.usrID} 
                                        month={usr.selectedMonth} 
                                        dateWorkDays={dateWorkDays} 
                                        nwd={nwd} 
                                        UpdateNewRecords = {((newRecords : IWorkDay[]) => {setNewWorkDays(newRecords)})} 
                                        UpdateExistingRecords = {((updRecord : IWorkDay, wd : DateWorkDay[]) => {UpdateWorkDays(updRecord, wd)})}
                                        UpdateDeleteRecords = {((dwd : number) => (UpdateDeletedRecords(dwd)))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-2'>
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
