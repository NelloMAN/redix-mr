import React, { useEffect } from "react";
import { IWorkDay } from "../../../utils/interface/MRInterface";
import './css/DeleteCell.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import $ from 'jquery';

export interface IDeleteCellProps {
    wd:IWorkDay,
    cellID:string
    disabled: boolean,
    onChange(name : string, value : string): any 
}

const DeleteCell: React.FC<IDeleteCellProps> = (props:IDeleteCellProps) => {

    function deleteHandler() {

        //#region gestione cambio colore tasto delete
        let currentClass : string = $('#'+props.cellID).attr('class')!;

        if (currentClass === 'btn del-cell-clicked'){
            $('#'+props.cellID).removeClass('btn del-cell-clicked').addClass('btn del-cell');    
        } else {
            $('#'+props.cellID).removeClass('btn del-cell').addClass('btn del-cell-clicked');
        }
        //#endregion

        props.onChange('delete', ''+props.wd.wrkdID);
    }

    return (

        <td>
            <button 
                type="button" 
                id={props.cellID} 
                className='btn del-cell' 
                onClick={deleteHandler} 
                data-bs-toggle="tooltip" 
                data-bs-placement="top" 
                title="Delete row" 
                disabled={props.disabled}> 
                
                <RiDeleteBin6Line 
                    className='wd-button-icon'/>
            </button>                
        </td>
    )
}

export default DeleteCell;