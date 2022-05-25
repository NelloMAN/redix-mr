import React, { useEffect } from "react";
import './WorkRow.css';
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';

function WorkRow(props) {

	useEffect(() => {
		console.log(props)
	}, [])

	function setSpecification() {

		console.log(props.workDetails);

		switch (props.workDetails.wrkdSpecsID) {
			case 5:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-active"/> </td>;
			case 2:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-active"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 3:
				return <td><GiPalmTree className="specs-active"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 4:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane  className="specs-active"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 1:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			default:
				break;
		}
	}

	return (
		
		<tr key={props.index} className="work-row">
			<td>{props.workDetails.wrkdDay}</td>
			{setSpecification()}
			<td>{props.workDetails.wrkdActivity}</td>
			<td>{props.workDetails.wrkdActivityHour}</td>
			<td>{props.workDetails.sqdName}</td> 
			<td>{props.workDetails.wrkdActivityType}</td>
			<td>{props.workDetails.wrkdCdc}</td>
		</tr>
	);
}

export default WorkRow;
