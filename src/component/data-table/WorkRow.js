import React from "react";
import './WorkRow.css';

function WorkRow(props) {

	return (
		<tr key={props.index} className="work-row">
			<td>{props.workDetails.wrkdDay}</td>
			<td>{props.workDetails.wrkdSpecsID}</td>
			<td>{props.workDetails.wrkdActivity}</td>
			<td>{props.workDetails.wrkdActivityHour}</td>
			<td>{props.workDetails.wrkdSqdID}</td>
			<td>{props.workDetails.wrkdActivityType}</td>
			<td>{props.workDetails.wrkdCdc}</td>
		</tr>
	);
}

export default WorkRow;
