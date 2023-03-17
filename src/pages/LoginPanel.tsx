
import '../global-css/_color.scss';
import React, {useState } from 'react';
import './LoginPanel.scss';
import DialogBox, { IDialogBox } from '../component/DialogBox';
import logo_redix from './../img/logo_redix.svg';
import { sha256 } from 'js-sha256';
import {useNavigate} from 'react-router-dom';
import {IoMdLogIn} from 'react-icons/io';
import axios from 'axios';
import { IUser } from '../utils/interface/MRInterface';
import { DialogType } from '../utils/MREnum';

export interface ILoginPanel {}

const LoginPanel: React.FunctionComponent<ILoginPanel> = (props) => {

    const navigate = useNavigate();

    const [usrEmail, setEmail] = useState('');
    const [usrPassword, setPassword] = useState('');

    const refDialog = React.useRef<IDialogBox | null>(null);

    function handleChange(event:any) {

        const name = event.target.name

        if (name === 'email') {
            setEmail(event.target.value);
        } else if (name === 'password') {
            setPassword(event.target.value);
        }
        
    }

    function handleSubmit(event:React.FormEvent) {

        fetchUsr();
        event.preventDefault();
    }

    function handleDialogClose() {

    }

     async function fetchUsr(){

        
        axios.get('http://localhost:3001/checkUsr/'+usrEmail+'/'+sha256(usrPassword))
        .then(res => {
            //setDateWorkDays(res.data.dateWorkDay);
            if (res.data.user.length > 0) {

                const stateToDashboard : IUser = {

                    usrID: res.data.user[0].usrID,
                    usrEmail : res.data.user[0].usrEmail,
                    usrName : res.data.user[0].usrName,
                    selectedMonth : res.data.user[0].lastWorkedMonth
                }

                navigate(
                    "/dashboard", 
                    {
                        replace: true,
                        state:{
                            stateToDashboard
                        }
                    }
                );

            }else {
                refDialog.current?.handleShow('Attenzione','Email o password errati');
            }   
        })
        .catch(err => {
            refDialog.current?.handleShow('Attenzione','Problema nella comunicazione col server: \n'+err);
        });
    }

    return (
        
        <div className="container-fluid d-flex align-items-center justify-content-center w-100 p-0 page" style={{"height":"100vh"}}>
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
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="form-group row">
                                    <div className="col-sm-3 d-flex align-items-center">
                                        <h6 className='m-0'>Email:</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="email" name="email" value={usrEmail} onChange={(event) => {handleChange(event)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group row">
                                    <div className="col-sm-3 d-flex align-items-center">
                                        <h6 className='m-0'>Password:</h6>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="password" name="password" value={usrPassword} onChange={(event) => {handleChange(event) }} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                </div>
                                <br></br>
                                <button type="submit" className="btn rdx-btn w-100"><IoMdLogIn/>   Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        <DialogBox 
            ref={refDialog} 
            type={DialogType.INFO}
            OnActionDialogClose={handleDialogClose}/>
        </div>
        
    );
}

export default LoginPanel;