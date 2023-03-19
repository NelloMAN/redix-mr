import React, { useEffect, useState } from 'react';
import './DashboardPanel.css';
import logo_redix from '../img/logo_redix.svg';
import Hamburger from 'hamburger-react'
import MonthComboBox from '../component/MonthComboBox';
import {useLocation} from 'react-router-dom';
import WorkTable from '../component/data-table/WorkTable';
import DialogBox, { IDialogBox } from '../component/DialogBox';
import AddSingleWDButton from '../component/AddSingleWDButton';
import AddMultipleWDButton from '../component/AddMultipleWDButton';
import SaveWDButton from '../component/SaveWDButton';
import ExportWDButton from '../component/ExportWDButton';
import axios from "axios";
import {IWorkDay, DateWorkDay, IUser, IAlert} from '../utils/interface/MRInterface';
import DialogInfoBox, { IDialogInfoBox } from '../component/DialogInfoBox';
import { DialogType } from '../utils/MREnum';
import $ from 'jquery';


export interface IDashboardPanel {}

const DashboardPanel: React.FC<IDashboardPanel> = (props) => {

    const location = useLocation();
    const refInfoDialog = React.useRef<IDialogInfoBox | null>(null);
    const refDialog = React.useRef<IDialogBox | null>(null);

    const [usr, setMonth] = React.useState<IUser>(location.state.stateToDashboard);

    const [nwd, setNewWorkDays] = useState<IWorkDay[]>([]); //array con la lista dei nuovi record inseriti

    const [dateWorkDays, setDateWorkDays] = useState<DateWorkDay[]>([]); //array con la lista dei giorni lavorati dell'utente
    // useEffect per prendere i giorni dell'utente
    useEffect(() => {

        if (usr.selectedMonth !== 0) {
            axios.get('http://localhost:3001/getUsrWrkDay/' +usr.usrID +'/' + usr.selectedMonth)
            .then(res => {
                setDateWorkDays(res.data.dwd);
            });
        }

    },[
        usr.usrID, 
        usr.selectedMonth,
    ]);

    const [changewd, setModifiedRecords] = useState<IWorkDay[]>([]); //array con la lista dei record esistenti e modificati

    const [deleteWdID, setDeleteWdIDList] = useState<number []>([]); //array contenente gli id da cancellare

    /*
    Se, una volta cliccato Salva, ci sono delle attività nella lista deleted che
    compaiono anche nella lista modified, queste vengono rimosse dalla modified chiamando
    l'API /saveWorkDays. Se però ci sono anche delle correzioni da effettuare (es. aggiungere ore
    permesso) viene chiamata un'altra API (/applyCorrection) che effettua quelle correzioni e salva il tutto.
    In wdToSave salviamo la lista che viene generata da /saveWorkDays che verrà 
    passata come parametro alla applyCorrection
    */
    const [wdToSave, setWorkDayToSave] = useState<IWorkDay []>([]); 

    if (usr.usrEmail === "" || dateWorkDays.length === 0) {
        return <p>Loading</p>
    }

    // funzione per aggiornare gli array contenente i record modificati 
    // updRecord: il record modificato
    function UpdateWorkDays( updRecord : IWorkDay) {

        let tempChangeWD : IWorkDay [] = changewd;

        //verifico se è necessario sostituire dei record in modo da non più volte lo stesso record
        if (tempChangeWD.some( x => x.wrkdID === updRecord.wrkdID)) {
            tempChangeWD = tempChangeWD.filter(elem => elem.wrkdID !== updRecord.wrkdID);
        }

        //aggiungo il record modificato
        tempChangeWD.push(updRecord);

        //aggiorno lo state
        setModifiedRecords( tempChangeWD);
    }


    function UpdateDeletedRecords( dwdID : number) {

        //aggiungo il wrkdID nella lista dei cancellati, a meno che sia già presente il che vuol dire che l'utente ha annullato la cancellazione
        if(deleteWdID.includes(dwdID)) {
        	setDeleteWdIDList(deleteWdID.filter(item => item !== dwdID))
        } else {

            if (nwd.some( x => x.wrkdID === dwdID)) {
                
                let tempNewWorkDays = nwd;
                tempNewWorkDays = tempNewWorkDays.filter(elem => elem.wrkdID !== dwdID);

                setNewWorkDays(tempNewWorkDays);

            } else {
                setDeleteWdIDList( dwdList => [...dwdList, dwdID]);
            }
        }
    }

    function ManageSavedResult(ialert : IAlert [] = [], wdts : IWorkDay [] = [], error: string) {
        //TODO
        //Gestione dell'esito dopo il salvataggio
        if (error === undefined || error === "") {

            if (ialert.length > 0) {

                setWorkDayToSave(wdts);
                refInfoDialog.current?.handleShow(ialert);
            } else {
                refDialog.current?.handleShow('Salvataggio dati','Salvataggio avvenuto con successo');
            }

        } else {
            refDialog.current?.handleShow('Salvataggio dati','Attenzione, è avvenuto un problema al momento del salvataggio \n'+error);
        }
    }

    async function onDialogHide() {

        await axios.get('http://localhost:3001/getUsrWrkDay/' +usr.usrID +'/' + usr.selectedMonth)
        .then(res => {
            setDateWorkDays(res.data.dwd);
            resetStati();
        });
    }

    function resetStati() {

        setNewWorkDays([]);
        setModifiedRecords([]);
        setDeleteWdIDList([]);

		$('.work-row').removeClass('work-row-upd');
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
                                        usrID={usr.usrID}
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
                                        changewd={changewd}
                                        deleteWdIDList={deleteWdID} 
                                        OnSaveWDButtonClick={(ia : IAlert[], wd : IWorkDay [], error: string) => {ManageSavedResult(ia, wd, error)}}
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
                                        UpdateExistingRecords = {((updRecord : IWorkDay) => {UpdateWorkDays(updRecord)})}
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
            <DialogInfoBox 
                ref={refInfoDialog} 
                wdToSave={wdToSave}
                wdToDel={deleteWdID}/>
            <DialogBox 
                ref={refDialog}
                type={DialogType.ACTION_AFTER_CLOSE} 
                OnActionDialogClose={onDialogHide}/>
        </div>   
    );
}

export default DashboardPanel;
