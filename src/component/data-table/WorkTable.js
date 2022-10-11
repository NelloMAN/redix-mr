import React, { useEffect, useState, useImperativeHandle } from "react";
import axios from "axios";
import WorkRow from "./WorkRow";
import "./css/WorkTable.css";

const WorkTable = React.forwardRef((props, ref) => {
	
	const [newWorkDays, setNewWorkDays] = useState([]);
	const [workDays, setWorkDays] = useState([]);
	const [selectedMonth, setMonth] = useState(0);
	const [squadArray, setSquad] = useState([]);
	

	useImperativeHandle(ref, () => ({
		wtMonthChange(newM) {
			setMonth(newM);
		},
		wtAddNewRow(newRow) {
			setNewWorkDays( nwd => [...nwd, newRow]);
		},
		wtSaveWorkDays() {
			saveWorkDays()
		}
	}))

	useEffect(() => {

		axios.get('http://localhost:3001/getSquad')
		.then(res => {
		   setSquad(res.data);
		});

		let qMonth = selectedMonth === 0 ? props.month : selectedMonth;

		axios.get('http://localhost:3001/getUsrWrkDay/' +props.usrID +'/' + qMonth)
		.then(res => {
			setWorkDays(res.data);
		});

	}, [selectedMonth, newWorkDays]);

	if (workDays.length === 0 && squadArray.length === 0) {
        return <p>Loading</p>
    }

	function wdChange(state, name, id, value) {

		console.log("state: "+state+" - name: "+name+" - id: "+id+" - value: "+value );

		if (state === "new") {

			let nwdItems = [...props.nwd];

			nwdItems[id].wrkdUsrID = props.usrID;

			switch(name) {
				case "day":
					nwdItems[id].wrkdDay = value;
					break;
				case "specs": 
					nwdItems[id].wrkdSpecsID = value;
					break;
				case "activity":
					nwdItems[id].wrkdActivity = value;
					break;
				case "hour":
					nwdItems[id].wrkdActivityHour = parseInt(value);
					break;
				case "squad": 
					nwdItems[id].wrkdSqdID = value;
					break;
				case "activity_type":
					nwdItems[id].wrkdActivityType = value;
					break;
				case "cdc":
					nwdItems[id].wrkdCdc = value;
					break;
				default:
					break;
			}
			
			props.UpdateNewRecords(nwdItems)

		} else {

		// workDays.map((subArray, index) => {
		// 	subArray[1].map((w, i) => {
		// 		if (w.wrkdID === id) {
		// 			setWorkDays( w => w.wrkdDay = value);
		// 		}
		// 	})
		// })
		}
	}

	function saveWorkDays() {

		axios.post("http://localhost:3001/insertWorkDays", {
		data: {
			newWorkDays
		}
		}).then((response) => {
			
			let data = response.data;

			//errWar è la lista contenente errori e warnings che il check lato server trova. Se è undefined allora non ce ne sono
			if (data.errWar !== undefined) {
				alert(data.errWar)
			}
			
		}).catch(err => console.log(err))
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
				<React.Fragment>
				{
					// props.nwd !== 'undefined' ? 
					// 	props.nwd.map((nr, i) => {
					// 		return (<WorkRow workDetails={nr} index={i} showDet="true" state="new" squadArray={squadArray} OnWDChange= {(state, name, id, value) => {wdChange(state, name, id, value)}}/>);
					// 	}) : null
					
					props.nwd.map((nr, i) => {
						return (<WorkRow workDetails={nr} index={i} showDet="true" state="new" squadArray={squadArray} OnWDChange= {(state, name, id, value) => {wdChange(state, name, id, value)}}/>);
					})
				}
				</React.Fragment>		
				{
					workDays.map((subArray, index) => {
						return (
							<React.Fragment>
								{
									subArray[1].map((w, i) => {
										return (<WorkRow workDetails={w} index={w.wrkdID} showDet={ i === 0 ? true : false} state="existed" squadArray={squadArray} OnWDChange={(state, name, id, value) => {wdChange(state, name, id, value)}}/>);
									}
								)}
							</React.Fragment>
						);
					})				
				}

			</tbody>
		</table>
	);
})

export default WorkTable;
