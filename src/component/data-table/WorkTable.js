import React, { useEffect, useState } from 'react';
import WorkRow from './WorkRow';
import './WorkTable.css';

function WorkTable(props) {

	const [workDays, setWorkDays] = useState([]);

	useEffect(() => {
		fetchWorkDay();
	}, []);

	async function fetchWorkDay() {

		console.log(props.usrID + " - " + props.month);

		await fetch('http://localhost:3001/getUsrWrkDay/' + props.usrID + '/' + props.month)
			.then(response => response.json())
			.then(response => {
				setWorkDays(response);
			})
			.catch();
	}

	return (

		<table className="table work-table rounded-3">
			<thead >
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
				{
					workDays.map((w, i) =>
						<WorkRow workDetails={w} index={i} />
					)
				}
			</tbody>
		</table>

	);
}

export default WorkTable;
