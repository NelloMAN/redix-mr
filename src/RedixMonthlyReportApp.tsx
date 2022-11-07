import "./RedixMonthlyReportApp.css";
import { Route, Routes} from "react-router-dom";
import LoginPanel from "./pages/LoginPanel";
import DashboardPanel from "./pages/DashboardPanel";

function RedixMonthlyReportApp() {
	return (
		<div>
			<main>
      <Routes>
		<Route path='/' element={<LoginPanel />} />
        <Route path='/dashboard' element={<DashboardPanel />} />
      </Routes>
			</main>
		</div>
	);
}

export default RedixMonthlyReportApp;
