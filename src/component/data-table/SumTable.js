import React, { useEffect, useState, useImperativeHandle } from "react";
import axios from "axios";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';
import {MdWorkOutline} from 'react-icons/md';
import {BsClockHistory} from 'react-icons/bs';
import "./WorkTable.css";

const SumTable = React.forwardRef((props, ref) => {
	
	// const [workDays, setWorkDays] = useState([]);
	// const [selectedMonth, setMonth] = useState(0);
	

	// useImperativeHandle(ref, () => ({
	// 	wtMonthChange(newM) {
	// 		setMonth(newM);
	// 	},
	// }))

	// useEffect(() => {

	// 	console.log('fetching');

	// 	let qMonth = selectedMonth === 0 ? props.month : selectedMonth;

	// 	axios.get('http://localhost:3001/getUsrWrkDay/' +props.usrID +'/' + qMonth)
	// 	.then(res => {
	// 	  setWorkDays(res.data);
	// 	})

	// }, [selectedMonth]);

	// if (workDays.length === 0) {
    //     return <p>Loading</p>
    // }
 
	return (

		<table className="table work-table rounded-3">
			<thead>
				<tr>
					<th colSpan='2' scope="col">Resoconto</th>
				</tr>
			</thead>
			<tbody>	
                <tr key="1" className="work-row">
                    <td><MdWorkOutline/></td>
                    <td>10</td>
                </tr>			
                <tr key="2" className="work-row">
                    <td><GiPalmTree/></td>
                    <td>10</td>
                </tr>
                <tr key="3" className="work-row">
                    <td><BiPlusMedical/></td>
                    <td>10</td>
                </tr>
                <tr key="4" className="work-row">
                    <td><ImAirplane/></td>
                    <td>10</td>
                </tr>
                <tr key="5" className="work-row">
                    <td><VscRemoteExplorer/></td>
                    <td>10</td>
                </tr>
                <tr key="6" className="work-row">
                    <td><BsClockHistory/></td>
                    <td>10</td>
                </tr>
			</tbody>
		</table>
	);
})

export default SumTable;
