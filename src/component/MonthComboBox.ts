import React, { useEffect, useState } from 'react';
import './css/MonthComboBox.css';

export interface IMonthComboBoxProps {
	usrID : number, 
	month : number,
    OnMonthChange(selectedMonth: number) : any
}

const MonthComboBox: React.FC<IMonthComboBoxProps> = (props:IMonthComboBoxProps) => {

    const [selectedMonth, setSelectedMonth] = useState(1);
    const [months, setMonths] = useState([]);

    useEffect(() => {

        setSelectedMonth(props.month);
        setTimeName();
    }, []);


    async function setTimeName() {

        await fetch('http://localhost:3001/setTimeName')
        .then(response => response.json())
        .then (response => {
            fetchMonths();
        })
        .catch();
    }

    async function fetchMonths() {

        await fetch('http://localhost:3001/getMonths/'+props.usrID)
        .then(response => response.json())
        .then (response => {
            setMonths(response);
        })
        .catch();
    }

    //Gestione cambio mese: chiamo funzione DashboardPanel che chiamerà funzione WorkTable per aggiornare i dati
    function changeHandler(e:any) {

        setSelectedMonth(e.target.value);
        props.OnMonthChange(e.target.value);
    }

    return (

        <select className="form-select rmr_select w-50" value={selectedMonth} aria-label="Default select example" onChange={(event) => {changeHandler(event) }}>
            {
                months.map((m, i) =>
                    <option value={m.monthNumb} key={m.monthNumb}>{m.monthName}</option>
                )
            }
        </select>
        
    )
}

export default MonthComboBox;