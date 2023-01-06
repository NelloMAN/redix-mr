import React, { useEffect } from "react";
import { Squad } from "../../../utils/interface/MRInterface";
import './css/SquadCell.css';

export interface ISquadCellProps {
    name:string,
    selectedSquad: number,
    disabled: boolean,
    squad : Squad [],
    onChange(name : string, value : string): any 
}

const SquadCell: React.FC<ISquadCellProps> = (props:ISquadCellProps) => {

    function changeHandler(e:React.ChangeEvent<HTMLSelectElement>) {
        props.onChange( props.name, e.target.value);
    }

    return (

        <select className="form-select rmr_select w-100" value={props.selectedSquad} aria-label="Default select example" onChange={(event) => {changeHandler(event) }} disabled={props.disabled}>
            {
                props.squad.map((s, i) =>
                    <option value={s.sqdID} key={s.sqdID}>{s.sqdName}</option>
                )
            }
        </select>
        
    )
}

export default SquadCell;