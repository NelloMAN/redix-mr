import React, { useEffect, useRef, useState } from 'react';
import './css/WorkRow.css';
import SpecificationCell from "./cell/SpecificationCell";
import SquadCell from "./cell/SquadCell";

function WorkRow(props) {

	const RowStateEnum = {
		WORK: 0,
		SICKNESS_HOLIDAYS: 1,
		PERMIT:2
	}

	const [rowState, setDisabled] = useState(0);

	function showDet() {

		if (props.showDet) {
			return (
				<React.Fragment>
					<td><input type="date" className="w-100" defaultValue={props.workDetails.wrkdDay} name="day" onChange={(e) => onWorkDayChange(e)}/></td>
					<SpecificationCell name="specs" details={props.workDetails.wrkdSpecsID} onChange={(e) => onWorkDayChange(e)}/>
				</React.Fragment>
			);
		} else 
		{
			return (
				<React.Fragment>
					<td></td>
					<td></td>
				</React.Fragment>
			);
		}
	}

	// evento triggerato quando una cella della riga cambia stato/valore
	function onWorkDayChange(e) {

		const name = e.target.name;
		const value = e.target.value;

		if (value === 3 || value === 2) {
			setDisabled(RowStateEnum.SICKNESS_HOLIDAYS);
		} else if (value === 6 ){
			setDisabled(RowStateEnum.PERMIT);
		} else {
			setDisabled(RowStateEnum.WORK);
		}

		props.OnWDChange(props.state, name, props.index, value, props.workDetails.wrkdDay);
	}



	return (
		
		<tr key={props.index} className={"work-row"+(props.state === "new" ? " work-row-new":"")}>
			{showDet()}
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdActivity} value={props.workDetails.wrkdActivity} name="activity" onChange={(e) => onWorkDayChange(e)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td>
			<td><input type="number" className="w-100" defaultValue={props.workDetails.wrkdActivityHour} value={props.workDetails.wrkdActivityHour} name="hour" onChange={(e) => onWorkDayChange(e)} disabled = {rowState === RowStateEnum.SICKNESS_HOLIDAYS ? true : false}/></td>
			<td><SquadCell squadArray={props.squadArray} name="squad" selectedSquad={props.workDetails.wrkdSqdID} onChange={(e) => onWorkDayChange(e)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td> 
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdActivityType} value={props.workDetails.wrkdActivityType}  name="activity_type" onChange={(e) => onWorkDayChange(e)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td>
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdCdc} value={props.workDetails.wrkdCdc} name="cdc" onChange={(e) => onWorkDayChange(e)} disabled = {rowState === RowStateEnum.WORK ? false : true} /></td>
		</tr>
	);
}

export default WorkRow;
