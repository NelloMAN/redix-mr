import React from 'react';
import './DashboardPanel.css';
import logo_redix from '../img/logo_redix.svg';
import Hamburger from 'hamburger-react'
import MaterialTable from 'material-table';
import MonthComboBox from '../component/MonthComboBox';
import {useLocation} from 'react-router-dom';
import WorkTable from '../component/data-table/WorkTable';


function DashboardPanel() {

    const location = useLocation();

    return (
        <div>
            <header className=''>
                <div className='container-fluid'>
                    <div className='row ps-2 pt-3 pb-3'>
                        <div className='col-sm-9'>
                            <img src={logo_redix} alt="logo_redix" className="header-logo img-fluid"></img>
                        </div>
                        <div className='col-sm-3 d-flex justify-content-end'>
                            <Hamburger color='#0963AD' />
                        </div>
                    </div>
                    <div className='row header-name'>
                        <div className='col-sm-3 ps-3 pt-1 pb-1'>
                            <p className='m-0'>Bentornato {location.state.usrName} ({location.state.usrEmail})</p>
                        </div>
                        <div className='offset-sm-8 col-sm-1 ps-3 pt-1 pb-1'>
                            <p className='m-0'> versione 1.0</p>
                        </div>
                    </div>
                </div>
            </header>
            <br></br>
            <section>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <MonthComboBox usrID={location.state.usrID} /> 
                        </div>
                    </div>
                    <br></br>
                    <div className='row'>
                        <div className='col-sm-8'>
                            {/* <MaterialTable
                                columns={[
                                    { title: 'Adı', field: 'name' },
                                    { title: 'Soyadı', field: 'surname' },
                                    { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                                    { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                                ]}
                                data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
                                title="Demo Title"
                            />  */}
                            <WorkTable usrID={location.state.usrID} month=''/>
                        </div>
                        <div className='col-sm-4'>
                            {/* resume table */}
                        </div>
                    </div>
                </div>
            </section>
        </div>   
    );
}

export default DashboardPanel;
