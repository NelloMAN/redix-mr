import React from 'react';
import './MonthComboBox.css';

class MonthComboBox extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            months:[]
        }
    }

    componentDidMount() {

        this.setTimeName();
        this.fetchMonths();
    }

    async setTimeName() {

        await fetch('http://localhost:3001/setTimeName')
        .then(response => response.json())
        .then (response => {
            
            console.log(response[0]);
        })
        .catch();
    }

    async fetchMonths() {

        await fetch('http://localhost:3001/getMonths/'+this.props.usrID)
        .then(response => response.json())
        .then (response => {
            
            console.log(response);
            this.setState({months: response});
            console.log(this.state.months);
        })
        .catch();
    }

    render() {

        return (
            <select className="form-select rmr_select w-50" aria-label="Default select example">
                {
                    this.state.months.map((m, i) =>
                        <option value={i}>{m.monthName}</option>
                    )
                }
            </select>
        );
    }
}

export default MonthComboBox;
