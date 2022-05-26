import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkRow from "./WorkRow";
import "./WorkTable.css";

function WorkTable(props) {
	
	const [workDays, setWorkDays] = useState([]);

	useEffect(function effectFunction() {

		console.log('fetching');

		axios.get('http://localhost:3001/getUsrWrkDay/' +props.usrID +'/' +props.month)
		.then(res => {
		  setWorkDays(res.data);
		})

		// fetch('http://localhost:3001/getUsrWrkDay/' +props.usrID +'/' +props.month)
		// 	.then(response => response.json())
		// 	.then((aaa) => {
		// 		setWorkDays(aaa);
		// 	});
	}, []);

	if (workDays.length === 0) {
        return <p>Loading</p>
    }

	function fillTable() {

		workDays.map((wd, i) => {
			return (
				wd[1].map((w,i)=>{
					return <WorkRow workDetails={w} index={w.wrkdID} />
				})
			)
		})

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
}

export default WorkTable;
