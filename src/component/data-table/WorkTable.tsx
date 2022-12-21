import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import WorkRow from "./WorkRow";
import "./css/WorkTable.css";
import { IWorkDay, DateWorkDay, Squad } from "../../interface/MRInterface";

export interface IWorkTableProps {
	usrID : number, 
	month : number, 
	dateWorkDays : DateWorkDay [],
	nwd: IWorkDay [],
	UpdateNewRecords(newWorkDay : IWorkDay []) : any,
	UpdateExistingRecords( w : IWorkDay | undefined, dwd : DateWorkDay []) : any
}

const WorkTable: React.FC<IWorkTableProps> = (props:IWorkTableProps) => {

	console.log('WorkTable');
	console.log(props.dateWorkDays);

	const [squadArray, setSquad] = useState<Squad []>([]);

	useEffect(() => {

		axios.get('http://localhost:3001/getSquad')
		.then(res => {
		   setSquad(res.data);
		});

	}, [props.usrID]);

	// Evento cambio dei valori del WorkRow. 
	// state: new se è nuova altrimenti existed
	// name: nome del campo cambiato
	// id: per gli existed corrisponde al wrkdID, per i new è l'index dell'array props.nwd
	// value: il nuovo valore settato
	function wdChange(state : string, name : string, id : number, value : string, wDay : IWorkDay) {

		console.log("state: "+state+" - name: "+name+" - id: "+id+" - value: "+value );

		let nwdS : IWorkDay [];

		if (state === "new") {

			nwdS = [...props.nwd];
			nwdS[id].wrkdUsrID = props.usrID;

			ChangeRecordValues(nwdS[id], name, value)

			props.UpdateNewRecords(nwdS)

		}  else if (state === "existed") {

			// recupero il record modificato
			let record : IWorkDay = props.dateWorkDays.find(w => w.dwdDate === wDay.wrkdDay)!.wdArray.find(c => c.wrkdID === id)!;
			
			ChangeRecordValues(record, name, value);

			props.UpdateExistingRecords(record, props.dateWorkDays);
		}		
	}

	function ChangeRecordValues (modifiedRecord : IWorkDay, name : string, value : string) {

		switch(name) {
			case "day":
				modifiedRecord.wrkdDay = new Date(value);
				break;
			case "specs": 
				switch(parseInt(value)) {
					case 3: //FERIE

						modifiedRecord.wrkdActivity = 'FERIE';
						modifiedRecord.wrkdActivityType = 'FERIE';
						modifiedRecord.wrkdActivityHour = 0;
						modifiedRecord.wrkdSqdID = 1; //NONE SQUAD
						break;
					case 2: // MALATTIA
						modifiedRecord.wrkdActivity = 'MALATTIA';
						modifiedRecord.wrkdActivityType = 'MALATTIA';
						modifiedRecord.wrkdActivityHour = 0;
						modifiedRecord.wrkdSqdID = 1; //NONE SQUAD
						break;
					case 6: // PERMESSO
						modifiedRecord.wrkdActivity = 'PERMESSO';
						modifiedRecord.wrkdActivityType = 'PERMESSO';
						break;
					default:
						break;
				}
				modifiedRecord.wrkdInfoID = parseInt(value);
				break;
			case "activity":
				modifiedRecord.wrkdActivity = value;
				break;
			case "hour":
				modifiedRecord.wrkdActivityHour = parseInt(value);
				break;
			case "squad": 
				modifiedRecord.wrkdSqdID = parseInt(value);
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
						return (<WorkRow workDay={nr} index={i} showDet={true} rowState="new" squad={squadArray} OnWDChange= {(state, name, id, value, wday) => {wdChange(state, name, id, value, wday)}}/>);
					})
				}
				</React.Fragment>		
				{

					props.dateWorkDays.map((subArray, index) => {
						return (
							<React.Fragment>
								{
									subArray.wdArray.map((w, i) => {
										return (<WorkRow workDay={w} index={w.wrkdID} showDet={ i === 0 ? true : false} rowState="existed" squad={squadArray} OnWDChange={(state, name, id, value, wday) => {wdChange(state, name, id, value, wday)}}/>);
									}
								)}
							</React.Fragment>
						);
					})				
				}

			</tbody>
		</table>
	);
}

export default WorkTable;
