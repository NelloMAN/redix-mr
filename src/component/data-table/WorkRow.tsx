import React, { useEffect, useRef, useState } from 'react';
import './css/WorkRow.css';
import InfoCell from "./cell/InfoCell";
import SquadCell from "./cell/SquadCell";
import { Squad, IWorkDay } from '../../utils/interface/MRInterface';
import { RowStateEnum } from '../../utils/MREnum';
import DeleteCell from './cell/DeleteCell';
import $ from 'jquery';

export interface IWorkRowProps {
	rowState: string,		//stato della riga: nuova(new) o esistente(existed)
	showDet: boolean,		//mostrare data e info: true se è il primo elemento dell'array dateworkday o false se non è il primo
	index: number,			//indice della riga
	workDay: IWorkDay,		//Workday da mostrare nella riga
	squad: Squad [],		//lista delle squad
	enable: boolean,		//abilitare la riga: true se è modificabile false se non lo è
	OnWDChange(rs: string, n : string, i : number, v : string, wd : IWorkDay) : any;
}

const WorkRow: React.FC<IWorkRowProps> = (props:IWorkRowProps) => {

	const [rowInfoType, setFieldEnable] = useState(props.rowState === 'new' ? RowStateEnum.WORK : props.workDay.wrkdInfoGrpID);
	const [enableRow, setRowEnable] = useState<boolean>(props.enable);
	const [lastSelectedInfo, setSelectedInfo] = useState<string>(''+props.workDay.wrkdInfoID)

	function renderComponent() {

		if (enableRow) {

			if (props.showDet) { //

				return (
					<tr id={'row_'+props.workDay.wrkdID} key={props.index} className={"work-row"+(props.rowState === "new" ? " work-row-new":"")}>
						<td>
							<input type="date" className="w-100" defaultValue={''+props.workDay.wrkdDay} name="day" onChange={(e) => onWorkDayChange(e.target.name, e.target.value)}/>
						</td>
						<InfoCell name="specs" details={parseInt(lastSelectedInfo)} onChange={(n,v) => onWorkDayChange(n,v)}/>
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
			} else 
			{
				return (
					<tr id={'row_'+props.workDay.wrkdID} key={props.index} className={"work-row"+(props.rowState === "new" ? " work-row-new":"")}>
						<td></td>
						<td></td>
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
		} else {

			return (
				<tr id={'row_'+props.workDay.wrkdID} key={props.index} className={"work-row"+(props.rowState === "new" ? " work-row-new":"")}>
					<td>{''+props.workDay.wrkdDay}</td>
					<td></td>
					<td>{props.workDay.wrkdActivity}</td>
					<td>{''+props.workDay.wrkdActivityHour}</td>
					<td>{''+props.workDay.wrkdSqdID}</td>
					<td>{props.workDay.wrkdActivityType} </td>
					<td>{props.workDay.wrkdCdc}</td>
					<DeleteCell cellID = {'deleteCell_' + props.workDay.wrkdID} wd={props.workDay} onChange={(n,v) => onWorkDayChange(n, v)} disabled = {false} />
				</tr>
			)
		}
	}

	// evento triggerato quando una cella della riga cambia stato/valore
	function onWorkDayChange(n:string, v:string) {

		const name = n;
		const value = v;

		//#region cambio il colore della riga se è in stato CANCELLATO
		if (name === 'delete' && props.rowState !== 'new') {

			//aggiungo il colore rosso per le righe cancellate, rimuovo eventualmente il colore arancione nel caso si stesse cancellando una righa modificata
			$('#row_'+props.workDay.wrkdID).removeClass("work-row-upd");
			$('#row_'+props.workDay.wrkdID).toggleClass('work-row-todelete');

			if ($('#row_'+props.workDay.wrkdID).prop("className").split(" ").includes("work-row-todelete")) {
				setRowEnable(false)
			} else {
				setRowEnable(true)
			};
			
		} else {

			// aggiungo il colore arancione per le righe modificate
			if (!$('#row_'+props.workDay.wrkdID).hasClass("work-row-upd") && props.rowState !== 'new') { 
				$('#row_'+props.workDay.wrkdID).addClass("work-row-upd");
			}

			//#region aggiorno lo stato della riga a seconda della specifica selezionata
			if (name === 'specs') {

				setSelectedInfo(value);

				setFieldState(value);
			}
			//#endregion
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
		renderComponent()
	);
}

export default WorkRow;
