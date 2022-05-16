import React from "react";
import { useLocation } from "react-router-dom";

function WorkTable() {
	const location = useLocation();

    function fetchWorkDay(){

        // fetch('http://localhost:3001/getWorkDay/'+this.state.email+'/'+sha256(this.state.password))
        // .then(response => response.json())
        // .then (response => {
            
        //     console.log(response);
        //     this.setState({
        //         email: response[0]['usrEmail'],
        //         name: response[0]['usrName'],
        //         usrID: response[0]['usrID']
        //     });
        // })
        // .catch();
    }

	return (
		<table className="table">
			<thead>
				<tr>
					<th scope="col">#</th>
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
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
	);
}

export default WorkTable;
