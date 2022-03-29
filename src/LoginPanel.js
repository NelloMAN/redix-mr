/*import logo from './logo.svg';
import './App.css';*/
import './LoginPanel.css';

function LoginPanel() {
  return (
    <div className="container-fluid" style={{"height":"100vh"}}>
        <div className="LoginPanel h-50">
            <div className="row h-75">
                <div className="col-sm-4">
                    Logo
                </div>
                <div className="col-sm-4">
                    Form
                </div>
                <div className="col-sm-4">
                    EmptySpace
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 h-25">
                    <p className="text-end">Versione 1.0</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPanel;
