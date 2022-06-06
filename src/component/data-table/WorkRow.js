import React, { useEffect, useRef, useState } from 'react';
import './css/WorkRow.css';
import SpecificationCell from "./cell/SpecificationCell";
import SquadCell from "./cell/SquadCell";

function WorkRow(props) {

	function showDet() {
		
		if (props.showDet) {
			return (
				<React.Fragment>
					<td><input type="date" className="w-100" defaultValue={props.workDetails.wrkdDay} name="day" onChange={(e) => onWorkDayChange(e)}/></td>
					<SpecificationCell details={props.workDetails.wrkdSpecsID}/>
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

	function onWorkDayChange(e) {

		const name = e.target.name
		props.OnWDChange(props.state, name, props.index, e.target.value);
	}



	return (
		
		<tr key={props.index} className={"work-row"+(props.state === "new" ? " work-row-new":"")}>
			{showDet()}
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdActivity} name="activity" onChange={(e) => onWorkDayChange(e)}/></td>
			<td><input type="number" className="w-100" defaultValue={props.workDetails.wrkdActivityHour} name="hour" onChange={(e) => onWorkDayChange(e)}/></td>
			<td><SquadCell squadArray={props.squadArray} selectedSquad={props.workDetails.sqdID} /></td> 
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdActivityType} name="activity_type" onChange={(e) => onWorkDayChange(e)}/></td>
			<td><input type="text" className="w-100" defaultValue={props.workDetails.wrkdCdc} name="cdc" onChange={(e) => onWorkDayChange(e)}/></td>
		</tr>
	);
}

export default WorkRow;
