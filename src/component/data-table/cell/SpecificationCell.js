import React, { useEffect } from "react";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';
import {BsClockHistory} from 'react-icons/bs';
import './SpecificationCell.css';

function SpecificationCell(props) {

	function handleInfoClick(event) {
		alert(event.target.value)
	}

	return (

		<td className="specs-cell">
			<GiPalmTree value='FERIE' className={props.details === 3 ? 'specs-active' : 'specs-inactive'} onClick={(event) => handleInfoClick(event)}/> 
			<BiPlusMedical value='MALATTIA' className={props.details === 2 ? 'specs-active' : 'specs-inactive'} onClick={(event) => handleInfoClick(event)}/> 
			<ImAirplane value='TRASFERTA' className={props.details === 4 ? 'specs-active' : 'specs-inactive'} onClick={(event) => handleInfoClick(event)}/>
			<VscRemoteExplorer value='SMARTWORKING' className={props.details === 5 ? 'specs-active' : 'specs-inactive'} onClick={(event) => handleInfoClick(event)}/> 
			<BsClockHistory value='PERMESSO' className={props.details === 6 ? 'specs-active' : 'specs-inactive'} onClick={(event) => handleInfoClick(event)}/>
		</td>
		
	);
}

export default SpecificationCell;
