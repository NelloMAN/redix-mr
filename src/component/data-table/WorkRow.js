import React, { useEffect } from "react";
import './WorkRow.css';
import SpecificationCell from "./cell/SpecificationCell";

function WorkRow(props) {

	useEffect(() => {
		console.log(props)
	}, [])


	function showDet() {
		
		if (props.showDet) {
			return (
				<React.Fragment>
					<td>{props.workDetails.wrkdDay}</td>
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
		
		<tr key={props.index} className="work-row">
			{showDet()}
			<td>{props.workDetails.wrkdActivity}</td>
			<td>{props.workDetails.wrkdActivityHour}</td>
			<td>{props.workDetails.sqdName}</td> 
			<td>{props.workDetails.wrkdActivityType}</td>
			<td>{props.workDetails.wrkdCdc}</td>
		</tr>
	);
}

export default WorkRow;
