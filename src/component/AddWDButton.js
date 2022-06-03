import { PinDropRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {MdAddBox} from 'react-icons/md';
import {MdLibraryAdd} from 'react-icons/md';
import './AddWDButton.css';

function AddWDButton(props) {

    function addSingleRowClicked() {

        let newRow = {
            wrkdDay:'',
            wrkdSpecsID:1,
            wrkdActivity: '',
            wrkdActivityHour: '',
            sqdName: '',
            wrkdActivityType: '',
            wrkdCdc: ''
        };

        console.log("AddWDButton");
        console.log(newRow);
        props.OnSingleAWDClick(newRow);
    }

    function addMultipleRowClicked() {
        alert('Multiple row clicked');
    }

    if (props.type === 's') {
        return (
            <button type="button" className='wd-button btn btn-circle' onClick={() => addSingleRowClicked()}> <MdAddBox className='wd-button-icon'/></button>
        )
    } else {
        return (
            <button type="button" className='wd-button btn btn-circle' onClick={() => addMultipleRowClicked()}> <MdLibraryAdd className='wd-button-icon'/></button>
        )
    }
}

export default AddWDButton;
