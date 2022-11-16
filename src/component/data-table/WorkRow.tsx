import React, { useEffect, useRef, useState } from 'react';
import './css/WorkRow.css';
import InfoCell from "./cell/InfoCell";
import SquadCell from "./cell/SquadCell";
import { Squad, WorkDay } from '../../interface/MRInterface';

export interface IWorkRowProps {
	rowState: string,
	showDet:boolean,
	index: number,
	workDay: WorkDay,
	squad : Squad [],
	OnWDChange(rs: string, n : string, i : number, v : string, wd : WorkDay) : any;
}

const WorkRow: React.FC<IWorkRowProps> = (props:IWorkRowProps) => {

	const RowStateEnum = {
		WORK: 1,
		SICKNESS_HOLIDAYS: 2,
		PERMIT:3
	}

	const [rowState, setDisabled] = useState(0);

	function showDet() {

		let enableFields = 0;

		if (props.rowState === "new") {
			enableFields = rowState
		} else {
			enableFields = props.workDay.wrkdInfoID
		}

		if (props.showDet) {

			return (
				<React.Fragment>
					<td><input type="date" className="w-100" defaultValue={''+props.workDay.wrkdDay} name="day" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)}/></td>
					<InfoCell name="specs" details={props.workDay.wrkdInfoID} onChange={(n,v) => onWorkDayChange(n,v)}/>
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

	// evento triggerato quando una cella della riga cambia stato/valore
	function onWorkDayChange(n:string, v:string) {

		const name = n;
		const value = v;

		if (parseInt(value, 10) === 3 || parseInt(value) === 2) {
			setDisabled(RowStateEnum.SICKNESS_HOLIDAYS);
		} else if (parseInt(value) === 6 ){
			setDisabled(RowStateEnum.PERMIT);
		} else {
			setDisabled(RowStateEnum.WORK);
		}

		props.OnWDChange(props.rowState, name, props.index, value, props.workDay);
	}



	return (
		
		<tr key={props.index} className={"work-row"+(props.rowState === "new" ? " work-row-new":"")}>
			{showDet()}
			<td><input type="text" className="w-100" defaultValue={props.workDay.wrkdActivity} value={props.workDay.wrkdActivity} name="activity" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td>
			<td><input type="number" className="w-100" defaultValue={props.workDay.wrkdActivityHour} value={props.workDay.wrkdActivityHour} name="hour" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowState === RowStateEnum.SICKNESS_HOLIDAYS ? true : false}/></td>
			<td><SquadCell squad={props.squad} name="squad" selectedSquad={props.workDay.wrkdSqdID} onChange={(n,v) => onWorkDayChange(n, v)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td> 
			<td><input type="text" className="w-100" defaultValue={props.workDay.wrkdActivityType} value={props.workDay.wrkdActivityType}  name="activity_type" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowState === RowStateEnum.WORK ? false : true}/></td>
			<td><input type="text" className="w-100" defaultValue={props.workDay.wrkdCdc} value={props.workDay.wrkdCdc} name="cdc" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowState === RowStateEnum.WORK ? false : true} /></td>
		</tr>
	);
}

export default WorkRow;
