import React, { useEffect } from "react";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';
import {BsClockHistory} from 'react-icons/bs';
import $ from 'jquery';
import './SpecificationCell.css';

function SpecificationCell(props) {

	function handleInfoClick(event) {

		let isActive = $(event.currentTarget).hasClass('specs-active');

		$(event.currentTarget).parent().children().removeClass('specs-active');

		if (!isActive)  {
			$(event.currentTarget).toggleClass('specs-active');
		}
	}

	return (

		<td className="specs-cell">
			<GiPalmTree name='FERIE' className={'info-icon '+(props.details === 3 ? 'specs-active' : 'specs-inactive')} onClick={(event) => handleInfoClick(event)}/>&ensp;
			<BiPlusMedical name='MALATTIA' className={'info-icon '+(props.details === 2 ? 'specs-active' : 'specs-inactive')} onClick={(event) => handleInfoClick(event)}/>&ensp; 
			<ImAirplane name='TRASFERTA' className={'info-icon '+(props.details === 4 ? 'specs-active' : 'specs-inactive')} onClick={(event) => handleInfoClick(event)}/>&ensp;
			<VscRemoteExplorer name='SMARTWORKING' className={'info-icon '+(props.details === 5 ? 'specs-active' : 'specs-inactive')} onClick={(event) => handleInfoClick(event)}/>&ensp;
			<BsClockHistory name='PERMESSO' className={'info-icon '+(props.details === 6 ? 'specs-active' : 'specs-inactive')} onClick={(event) => handleInfoClick(event)}/>
		</td>
		
	);
}

export default SpecificationCell;
