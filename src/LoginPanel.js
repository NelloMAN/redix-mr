/*import logo from './logo.svg';
import './App.css';*/
import './LoginPanel.css';
import logo_redix from './img/logo_redix.svg';

function LoginPanel() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center w-100 p-0" style={{"height":"100vh"}}>
        <div className="LoginPanel h-50 w-100 p-0">
            <div className="row h-100 d-flex align-items-center">
                <div className="col-sm-4 d-flex align-items-center justify-content-center">
                    <img src={logo_redix} className='img-fluid w-50 h-auto'></img>
                </div>
                <div className="col-sm-4">
                    Form
                </div>
                <div className="col-sm-4">
                    EmptySpace
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <p className="text-end m-0">Versione 1.0</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPanel;
