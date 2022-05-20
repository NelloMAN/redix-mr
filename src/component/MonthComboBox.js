import React, { useEffect, useState } from 'react';
import './MonthComboBox.css';

function MonthComboBox(props) {

    const [selectedMonth, setSelectedMonth] = useState(1)
    const [months, setMonths] = useState([]);

    useEffect(() => {

        setTimeName();
        fetchMonths();
    }, []);


    async function setTimeName() {

        await fetch('http://localhost:3001/setTimeName')
        .then(response => response.json())
        .then (response => {
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

    function changeHandler(event) {

        // const value = event.value
        // setSelectedMonth(value)
    }

    return (

        <select className="form-select rmr_select w-50" aria-label="Default select example" onChange={changeHandler()}>
            {
                months.map((m, i) =>
                    <option value={i} key={i}>{m.monthName}</option>
                )
            }
        </select>
        
    )
}

export default MonthComboBox;
