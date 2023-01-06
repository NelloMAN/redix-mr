import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdAddBox} from 'react-icons/md';
import {MdLibraryAdd} from 'react-icons/md';
import { IWorkDay } from '../utils/interface/MRInterface';
import './css/AddWDButton.css';

export interface IAddMultipleWDButtonProps {
	type : string,
    OnMultipleAWDClick(newWorkDay: IWorkDay[]) : any
}

const AddMultipleWDButton: React.FC<IAddMultipleWDButtonProps> = (props:IAddMultipleWDButtonProps) => {

    const [lastID, setLastID] = useState(0);

    // function addSingleRowClicked() {

    //     //setto nuovo id per la nuova riga
    //     let lid = lastID
    //     setLastID(lid + 1);

    //     let newWorkDay : IWorkDay = {
    //         wrkdID: lastID,
    //         wrkdDay: new Date(),
    //         wrkdInfoID: 1,
    //         wrkdActivity: '',
    //         wrkdActivityHour: 8,
    //         wrkdSqdID: 1,
    //         wrkdActivityType: '',
    //         wrkdCdc: '',
    //         wrkdUsrID: 0
    //     };

    //     props.OnSingleAWDClick(newWorkDay);
    // }

    function addMultipleRowClicked() {

        alert('Multiple row clicked');
        let newWDS : IWorkDay [] = [];

        props.OnMultipleAWDClick(newWDS);
    }

    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={() => addMultipleRowClicked()} data-bs-toggle="tooltip" data-bs-placement="top" title="Add multiple rows"> <MdLibraryAdd className='wd-button-icon'/></button>
    )
}

export default AddMultipleWDButton;
