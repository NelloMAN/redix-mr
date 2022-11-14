import "./RedixMonthlyReportApp.css";
import { HashRouter, Route} from "react-router-dom";
import LoginPanel from "./pages/LoginPanel";
import DashboardPanel from "./pages/DashboardPanel";

function RedixMonthlyReportApp() {
	return (
		<div>
			<main>
      <HashRouter>
		<Route path='/' component={LoginPanel} />
        <Route path='/dashboard/:usrID' component={DashboardPanel} />
      </HashRouter>
			</main>
		</div>
	);
}

export default RedixMonthlyReportApp;
