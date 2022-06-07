import React, { useEffect } from "react";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';
import {BsClockHistory} from 'react-icons/bs';
import $ from 'jquery';
import './css/SquadCell.css';

function SquadCell(props) {


    function changeHandler(e) {

        let sValue = e.target.value;

        let sTarget = {
			name: props.name,
			value: sValue
		};

		let customEvent = {
			target: sTarget
		};

        props.onChange(customEvent);
    }

    return (

        <select className="form-select rmr_select w-100" value={props.selectedSquad} aria-label="Default select example" onChange={(event) => {changeHandler(event) }}>
            {
                props.squadArray.map((s, i) =>
                    <option value={s.sqdID} key={s.sqdID}>{s.sqdName}</option>
                )
            }
        </select>
        
    )
}

export default SquadCell;
