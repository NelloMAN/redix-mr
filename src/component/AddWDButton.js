import '../global-css/_color.scss';
import React, { useEffect, useState } from 'react';
import {MdAddBox} from 'react-icons/md';
import {MdLibraryAdd} from 'react-icons/md';
import './css/AddWDButton.css';

function AddWDButton(props) {

    const [lastID, setLastID] = useState(0);

    function addSingleRowClicked() {

        //setto nuovo id per la nuova riga
        let lid = lastID
        setLastID(lid + 1);

        let newRow = {
            wrkdID:lastID,
            wrkdDay:'',
            wrkdSpecsID:1,
            wrkdActivity: '',
            wrkdActivityHour: '',
            wrkdSqdID: 1,
            wrkdActivityType: '',
            wrkdCdc: ''
        };

        props.OnSingleAWDClick(newRow);
    }

    function addMultipleRowClicked() {
        alert('Multiple row clicked');
    }

    if (props.type === 's') {
        return (
            <button type="button" className='btn rdx-btn btn-circle' onClick={() => addSingleRowClicked()} data-bs-toggle="tooltip" data-bs-placement="top" title="Add one row"> <MdAddBox className='wd-button-icon'/></button>
        )
    } else {
        return (
            <button type="button" className='btn rdx-btn btn-circle' onClick={() => addMultipleRowClicked()} data-bs-toggle="tooltip" data-bs-placement="top" title="Add multiple rows"> <MdLibraryAdd className='wd-button-icon'/></button>
        )
    }
}

export default AddWDButton;
