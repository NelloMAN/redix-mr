/*import logo from './logo.svg';
import './App.css';*/
import './LoginPanel.css';
import logo_redix from './img/logo_redix.svg';

function LoginPanel() {
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
                        <form>
                            <div className="form-group row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 for="exampleInputEmail1" className='m-0'>Email:</h6>
                                </div>
                                <div className="col-sm-9">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-group row">
                                <div className="col-sm-3 d-flex align-items-center">
                                    <h6 for="exampleInputPassword1" className='m-0'>Password:</h6>
                                </div>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPanel;
