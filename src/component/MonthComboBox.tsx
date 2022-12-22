import React, { useEffect, useState, FC } from 'react';
import { IUsrMonth } from '../interface/MRInterface';
import './css/MonthComboBox.css';

export interface IMonthComboBoxProps {
	usrID : number, 
	month : number,
    OnMonthChange(selectedMonth: number) : any
}

const MonthComboBox: React.FC<IMonthComboBoxProps> = (props:IMonthComboBoxProps) => {

    const [selectedMonth, setSelectedMonth] = useState(1);
    const [months, setMonths] = React.useState<IUsrMonth[]>([]);

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

        await fetch('http://localhost:3001/getUsrMonths/'+props.usrID)
        .then(response => response.json())
        .then (response => {
            console.log(response.usrMonth);
            setMonths(response.usrMonth);
        })
        .catch();
    }

    //Gestione cambio mese: chiamo funzione DashboardPanel che chiamerà funzione WorkTable per aggiornare i dati
    function changeHandler(e: React.ChangeEvent<HTMLSelectElement>) {

        console.log('MonthComboBox onChange new value selected: '+e.target.value)

        setSelectedMonth(parseInt(e.target.value));
        props.OnMonthChange(parseInt(e.target.value));
    }

    return (
        <select className="form-select rmr_select w-50" value={selectedMonth} aria-label="Default select example" onChange={(event) => {changeHandler(event) }}>
            {
                months.map((m, i) =>
                    <option value={m.monthNumb} key={m.monthNumb}>{m.monthName}</option>
                )
            }
        </select> 
    );
}

export default MonthComboBox;