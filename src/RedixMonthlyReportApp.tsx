import "./RedixMonthlyReportApp.css";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import LoginPanel from "./pages/LoginPanel";
import DashboardPanel from "./pages/DashboardPanel";
import { useEffect } from "react";

function RedixMonthlyReportApp() {

	const navigate = useNavigate();

	useEffect(() =>{
		navigate('/login');
	}, [])

	return (
		<div>
			<main>	
				<Routes>
					<Route path='/login' element={<LoginPanel />} />
					<Route path='/dashboard' element={<DashboardPanel />} />
				</Routes>
			</main>
		</div>
	);
}

export default RedixMonthlyReportApp;
