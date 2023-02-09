import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdAddBox} from 'react-icons/md';
import {MdLibraryAdd} from 'react-icons/md';
import { IUser, IWorkDay } from '../utils/interface/MRInterface';
import './css/AddWDButton.css';
import { RowStateEnum } from '../utils/MREnum';
import axios from 'axios';

export interface IAddSingleWDButtonProps {
	type : string,
    usrID: number,
    OnSingleAWDClick(newWorkDay: IWorkDay) : any
}

const AddSingleWDButton: React.FC<IAddSingleWDButtonProps> = (props:IAddSingleWDButtonProps) => {

    const [lastID, setFirstWDIDAvailable] = useState(0);

    useEffect(() => {

        axios.get('http://localhost:3001/getFirstWDIDAvailable/' +props.usrID)
        .then(res => {
            setFirstWDIDAvailable(parseInt(res.data[0].firstWDIDAvailable));
        }); 

    },[]);

    function addSingleRowClicked() {

        //setto nuovo id per la nuova riga
        let lid = lastID

        let newWorkDay : IWorkDay = {
            wrkdID: lid,
            wrkdDay: new Date(),
            wrkdInfoID: 1,
            wrkdInfoGrpID: RowStateEnum.WORK,
            wrkdActivity: '',
            wrkdActivityHour: 8,
            wrkdSqdID: 1,
            wrkdActivityType: '',
            wrkdCdc: '',
            wrkdUsrID: props.usrID
        };

        setFirstWDIDAvailable(lid + 1);
        props.OnSingleAWDClick(newWorkDay);
    }


    return (
        <button 
            type="button" 
            className='btn rdx-btn btn-circle' 
            onClick={() => addSingleRowClicked()} 
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title="Add one row"> 

            <MdAddBox 
                className='wd-button-icon'/>
        </button>
    )
}

export default AddSingleWDButton;
