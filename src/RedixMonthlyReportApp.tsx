import "./RedixMonthlyReportApp.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPanel from "./pages/LoginPanel";
import DashboardPanel from "./pages/DashboardPanel";

function RedixMonthlyReportApp() {
	return (
		<div>
			<main>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<LoginPanel />} />
						<Route path='/dashboard/:usrID' element={<DashboardPanel />} />
					</Routes>
				</BrowserRouter>
			</main>
		</div>
	);
}

export default RedixMonthlyReportApp;
