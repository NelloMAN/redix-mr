import React, { useEffect, useState } from 'react';
import './LoginPanel.css';
import DialogBox from '../component/DialogBox';
import logo_redix from '../img/logo_redix.svg';
import { sha256 } from 'js-sha256';
import {Navigate, Route, useNavigate} from 'react-router-dom';

function LoginPanel() {

    let toDashboard;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [usrID, setUsrID] = useState(0);

    function handleChange(event) {

        const name = event.target.name
        if (name === 'email') {
            setEmail(event.target.value);
        } else if (name === 'password') {
            setPassword(event.target.value);
        }
        
    }

    function handleSubmit(event) {

        event.preventDefault();
        fetchUsr();
    }

    function fetchUsr(){

        fetch('http://localhost:3001/checkUsr/'+email+'/'+sha256(password))
        .then(response => response.json())
        .then (response => {
            
            console.log(response);

            setEmail(response[0]['usrEmail']);
            setName(response[0]['usrName']);
            setUsrID(response[0]['usrID']);
        })
        .catch();
    }

    useEffect(() => {

        if (usrID != 0)
            toDashboard = <Navigate to='/dashboard' replace={true} state={{usrID : usrID, usrName: name, usrEmail: email}}/>
        else 
            toDashboard = '';
    });

    return (
        
            <div className="container-fluid d-flex align-items-center justify-content-center w-100 p-0" style={{"height":"100vh"}}>
                <div className="LoginPanel row d-flex align-items-center h-50 w-100">
                    <div className="col-sm-4 d-flex align-items-center justify-content-center">
                        <img src={logo_redix} alt="logo_redix" className="img-fluid w-50 h-auto"></img>
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className='offset-sm-1 col-sm-10'>
                                <h5>Please Log On:</h5>
                            </div>
                        </div>
                        <br></br>
                        <div className='row'>
                            <div className='offset-sm-1 col-sm-10'>
                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <div className="form-group row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 for="exampleInputEmail1" className='m-0'>Email:</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="email" name="email" value={email} onChange={handleChange()} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <h6 for="exampleInputPassword1" className='m-0'>Password:</h6>
                                        </div>
                                        <div className="col-sm-9">
                                            <input type="password" name="password" value={password} onChange={handleChange()} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            <DialogBox ref={this.refDialog} />
            {toDashboard}
            </div>
        
    );
}

export default LoginPanel;
