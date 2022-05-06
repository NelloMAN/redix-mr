import "./App.css";
import { Route, Routes} from "react-router-dom";
import LoginPanel from "./pages/LoginPanel";
import DashboardPanel from "./pages/DashboardPanel";

function App() {
	return (
		<div>
			<main>
      <Routes>
		<Route path='/login' element={<LoginPanel />} />
        <Route path='/' element={<DashboardPanel />} />
      </Routes>
			</main>
		</div>
	);
}

export default App;
