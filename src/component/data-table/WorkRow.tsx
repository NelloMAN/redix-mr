import React, { useEffect, useRef, useState } from 'react';
import './css/WorkRow.css';
import InfoCell from "./cell/InfoCell";
import SquadCell from "./cell/SquadCell";
import { Squad, IWorkDay } from '../../utils/interface/MRInterface';
import { RowStateEnum } from '../../utils/MREnum';
import DeleteCell from './cell/DeleteCell';
import $ from 'jquery';

export interface IWorkRowProps {
	rowState: string,
	showDet: boolean,
	index: number,
	workDay: IWorkDay,
	squad: Squad [],
	enable: boolean,
	OnWDChange(rs: string, n : string, i : number, v : string, wd : IWorkDay) : any;
}

const WorkRow: React.FC<IWorkRowProps> = (props:IWorkRowProps) => {

	const [rowInfoType, setFieldEnable] = useState(props.rowState === 'new' ? 0 : props.workDay.wrkdInfoID);
	const [enableRow, setRowEnable] = useState<boolean>(props.enable);
	const [lastSelectedInfo, setSelectedInfo] = useState<string>(''+props.workDay.wrkdInfoID)

	useEffect(() => {

		if (!enableRow) {
			//$('#row_'+props.workDay.wrkdID).off(); //rimuove tutti gli eventi assegnati all'elemento
			$('#row_'+props.workDay.wrkdID).find("*").not('#deleteCell_' + props.workDay.wrkdID).prop('disabled', true); //rimuove tutti gli eventi assegnati ai figli

		} else {
			$('#row_'+props.workDay.wrkdID).on("*", false); //rimuove tutti gli eventi assegnati all'elemento
			setFieldState(lastSelectedInfo);
		}

	  }, [enableRow]);

	function showDet() {

		if (props.showDet) {

			return (
				<React.Fragment>
					<td>
						<input type="date" className="w-100" defaultValue={''+props.workDay.wrkdDay} name="day" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)}/>
					</td>
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

		//#region aggiorno lo stato della riga a seconda della specifica selezionata
		if (name === 'specs') {

			setSelectedInfo(value);

			setFieldState(value);
		}
		//#endregion

		//#region cambio il colore della riga se è in stato CANCELLATO
		if (name === 'delete') {

			$('#row_'+props.workDay.wrkdID).toggleClass('work-row-todelete');

			if ($('#row_'+props.workDay.wrkdID).prop("className").split(" ").includes("work-row-todelete")) {
				setRowEnable(false)
			} else {
				setRowEnable(true)
			};
			
		}

		//#endregion
		props.OnWDChange(props.rowState, name, props.index, value, props.workDay);
	}

	function setFieldState( info : string) {

		if (parseInt(info, 10) === 3 || parseInt(info) === 2) {
			setFieldEnable(RowStateEnum.SICKNESS_HOLIDAYS);
		} else if (parseInt(info) === 6 ){
			setFieldEnable(RowStateEnum.PERMIT);
		} else {
			setFieldEnable(RowStateEnum.WORK);
		}
	}

	return (
		
		<tr id={'row_'+props.workDay.wrkdID} key={props.index} className={"work-row"+(props.rowState === "new" ? " work-row-new":"")}>

			{showDet()}
			<td>
				<input type="text" className="w-100" defaultValue={props.workDay.wrkdActivity} value={props.workDay.wrkdActivity} name="activity" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowInfoType === RowStateEnum.WORK ? false : true}/>
			</td>
			<td>
				<input type="number" className="w-100" defaultValue={props.workDay.wrkdActivityHour} value={props.workDay.wrkdActivityHour} name="hour" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowInfoType === RowStateEnum.SICKNESS_HOLIDAYS ? true : false}/>
			</td>
			<SquadCell squad={props.squad} name="squad" selectedSquad={props.workDay.wrkdSqdID} onChange={(n,v) => onWorkDayChange(n, v)} disabled = {rowInfoType === RowStateEnum.WORK ? false : true}/>
			<td>
				<input type="text" className="w-100" defaultValue={props.workDay.wrkdActivityType} value={props.workDay.wrkdActivityType}  name="activity_type" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowInfoType === RowStateEnum.WORK ? false : true}/>
			</td>
			<td>
				<input type="text" className="w-100" defaultValue={props.workDay.wrkdCdc} value={props.workDay.wrkdCdc} name="cdc" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)} disabled = {rowInfoType === RowStateEnum.WORK ? false : true} />
			</td>
			<DeleteCell cellID = {'deleteCell_' + props.workDay.wrkdID} wd={props.workDay} onChange={(n,v) => onWorkDayChange(n, v)} disabled = {false} />
		</tr>
	);
}

export default WorkRow;
