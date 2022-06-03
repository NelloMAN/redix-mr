import React, { useEffect } from "react";
import './WorkRow.css';
import SpecificationCell from "./cell/SpecificationCell";

function WorkRow(props) {

	function showDet() {
		
		if (props.showDet) {
			return (
				<React.Fragment>
					<td><input type="date" value={props.workDetails.wrkdDay}/></td>
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

	return (
		
		<tr key={props.index} className={"work-row"+(props.state === "new" ? " work-row-new":"")}>
			{showDet()}
			<td><input type="text" value={props.workDetails.wrkdActivity}/></td>
			<td><input type="number" value={props.workDetails.wrkdActivityHour}/></td>
			<td><input type="text" value={props.workDetails.sqdName}/></td> 
			<td><input type="text" value={props.workDetails.wrkdActivityType}/></td>
			<td><input type="text" value={props.workDetails.wrkdCdc}/></td>
		</tr>
	);
}

export default WorkRow;
