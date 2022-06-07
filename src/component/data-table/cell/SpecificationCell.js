import React, { useEffect } from "react";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';
import {BsClockHistory} from 'react-icons/bs';
import $ from 'jquery';
import './css/SpecificationCell.css';

function SpecificationCell(props) {

	function handleInfoClick(event) {

		let sValue = 1
		let isActive = $(event.currentTarget).hasClass('specs-active'); //prendo la spec cliccata e verifico se è attiva o meno

		$(event.currentTarget).parent().children().removeClass('specs-active'); //rimuovo lo stato di attivo da tutte le specs

		//se la spec cliccata non era attiva all'ora l'attivo
		if (!isActive)  {

			$(event.currentTarget).toggleClass('specs-active');
			
			switch(event.currentTarget.getAttribute('name')) {
				case "FERIE":
					sValue = 3;
					break;
				case "MALATTIA":
					sValue = 2;
					break;
				case "TRASFERTA":
					sValue = 4;			
					break;
				case "SMARTWORKING":
					sValue = 5;				
					break;
				case "PERMESSO":
					sValue = 6;
					break;
			}
		}

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
