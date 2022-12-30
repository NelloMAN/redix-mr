import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdAddBox} from 'react-icons/md';
import {MdLibraryAdd} from 'react-icons/md';
import { IWorkDay } from '../interface/MRInterface';
import './css/AddWDButton.css';

export interface IAddSingleWDButtonProps {
	type : string,
    OnSingleAWDClick(newWorkDay: IWorkDay) : any
}

const AddSingleWDButton: React.FC<IAddSingleWDButtonProps> = (props:IAddSingleWDButtonProps) => {

    const [lastID, setLastID] = useState(0);

    function addSingleRowClicked() {

        //setto nuovo id per la nuova riga
        let lid = lastID
        setLastID(lid + 1);

        let newWorkDay : IWorkDay = {
            wrkdID: lastID,
            wrkdDay: new Date(),
            wrkdInfoID: 1,
            wrkdActivity: '',
            wrkdActivityHour: 8,
            wrkdSqdID: 1,
            wrkdActivityType: '',
            wrkdCdc: '',
            wrkdUsrID: 0
        };

        props.OnSingleAWDClick(newWorkDay);
    }


    return (
        <button type="button" className='btn rdx-btn btn-circle' onClick={() => addSingleRowClicked()} data-bs-toggle="tooltip" data-bs-placement="top" title="Add one row"> <MdAddBox className='wd-button-icon'/></button>
    )
}

export default AddSingleWDButton;
