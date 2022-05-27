import React, { useEffect, useState, useImperativeHandle } from "react";
import axios from "axios";
import WorkRow from "./WorkRow";
import "./WorkTable.css";

const WorkTable = React.forwardRef((props, ref) => {
	
	const [workDays, setWorkDays] = useState([]);
	const [selectedMonth, setMonth] = useState(0);
	

	useImperativeHandle(ref, () => ({
		wtMonthChange(newM) {
			setMonth(newM);
		},
	}))

	useEffect(() => {

		console.log('fetching');

		let qMonth = selectedMonth === 0 ? props.month : selectedMonth;

		axios.get('http://localhost:3001/getUsrWrkDay/' +props.usrID +'/' + qMonth)
		.then(res => {
		  setWorkDays(res.data);
		})

	}, [selectedMonth]);

	if (workDays.length === 0) {
        return <p>Loading</p>
    }
 
	return (

		<table className="table work-table rounded-3">
			<thead>
				<tr>
					<th scope="col">Giorno</th>
					<th scope="col">Info</th>
					<th scope="col">Attività</th>
					<th scope="col">Ore</th>
					<th scope="col">Squad</th>
					<th scope="col">Tipo Attività</th>
					<th scope="col">CDC</th>
				</tr>
			</thead>
			<tbody>				
				{workDays.map((subArray, index) => {
					return (
						<React.Fragment>
							{
								subArray[1].map((w, i) => {
									return (<WorkRow workDetails={w} index={w.wrkdID} showDet={ i === 0 ? true : false}/>);
								}
							)}
						</React.Fragment>
					);
				})}
			</tbody>
		</table>
	);
})

export default WorkTable;
