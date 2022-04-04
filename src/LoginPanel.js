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
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-sm-4">
                EmptySpace
            </div>
        </div>
    </div>
  );
}

export default LoginPanel;
