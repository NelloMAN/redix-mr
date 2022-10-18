import React, { useEffect, useState, useImperativeHandle } from "react";
import axios from "axios";
import WorkRow from "./WorkRow";
import "./css/WorkTable.css";

const WorkTable = React.forwardRef((props, ref) => {
	
	const [squadArray, setSquad] = useState([]);

	useEffect(() => {

		console.log(props.workDays);

		axios.get('http://localhost:3001/getSquad')
		.then(res => {
		   setSquad(res.data);
		});

	}, []);

	if (props.workDays.length === 0 && squadArray.length === 0) {
        return <p>Loading</p>
    }

	// Evento cambio dei valori del WorkRow. 
	// state: new se è nuova altrimenti existed
	// name: nome del campo cambiato
	// id: per gli existed corrisponde al wrkdID, per i new è l'index dell'array props.nwd
	// value: il nuovo valore settato
	function wdChange(state, name, id, value, wDay) {

		console.log("state: "+state+" - name: "+name+" - id: "+id+" - value: "+value );

		let nwdS;
		let wd;

		if (state === "new") {

			nwdS = [...props.nwd];
			nwdS[id].wrkdUsrID = props.usrID;

			ChangeRecordValues(nwdS[id], name, value)

			props.UpdateNewRecords(nwdS)

		}  else if (state === "existed") {

			// recupero il record modificato
			let record = props.workDays.find(w => w[0] === wDay)[1].find(c => c.wrkdID === id);
			
			ChangeRecordValues(record, name, value);

			props.UpdateExistingRecords(record, props.workDays);
		}		
	}

	function ChangeRecordValues (modifiedRecord, name, value) {

		switch(name) {
			case "day":
				modifiedRecord.wrkdDay = value;
				break;
			case "specs": 
				switch(value) {
					case 3: //FERIE
						modifiedRecord.wrkdActivity = 'FERIE';
						modifiedRecord.wrkdActivityType = 'FERIE';
						modifiedRecord.wrkdActivityHour = 8;
						modifiedRecord.wrkdSqdID = 1; //NONE SQUAD
						break;
					case 2: // MALATTIA
						modifiedRecord.wrkdActivity = 'MALATTIA';
						modifiedRecord.wrkdActivityType = 'MALATTIA';
						modifiedRecord.wrkdActivityHour = 8;
						modifiedRecord.wrkdSqdID = 1; //NONE SQUAD
						break;
					case 6: // PERMESSO
						modifiedRecord.wrkdActivity = 'PERMESSO';
						modifiedRecord.wrkdActivityType = 'PERMESSO';
						break;
					default:
						break;
				}
				modifiedRecord.wrkdSpecsID = value;
				break;
			case "activity":
				modifiedRecord.wrkdActivity = value;
				break;
			case "hour":
				modifiedRecord.wrkdActivityHour = parseInt(value);
				break;
			case "squad": 
				modifiedRecord.wrkdSqdID = value;
				break;
			case "activity_type":
				modifiedRecord.wrkdActivityType = value;
				break;
			case "cdc":
				modifiedRecord.wrkdCdc = value;
				break;
			default:
				break;
		}
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
					props.nwd.map((nr, i) => {
						return (<WorkRow workDetails={nr} index={i} showDet="true" state="new" squadArray={squadArray} OnWDChange= {(state, name, id, value, wday) => {wdChange(state, name, id, value, wday)}}/>);
					})
				}
				</React.Fragment>		
				{
					props.workDays.map((subArray, index) => {
						return (
							<React.Fragment>
								{
									subArray[1].map((w, i) => {
										console.log(w);
										return (<WorkRow workDetails={w} index={w.wrkdID} showDet={ i === 0 ? true : false} state="existed" squadArray={squadArray} OnWDChange={(state, name, id, value, wday) => {wdChange(state, name, id, value, wday)}}/>);
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
