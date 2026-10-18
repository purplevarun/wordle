import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./routes/Homepage";
import Levels from "./routes/Levels";
import Rules from "./routes/Rules";
import About from "./routes/About";
import "./styles/App.css";
import Game from "./routes/Game";

function App() {
	return (
		<div>
			<div className="pages-wrapper">
				<div className="pages">
					<HashRouter>
						<div className="settingsbtn">
							<Sidebar />
						</div>
						<Routes>
							<Route
								path="/"
								exact
								element={<Homepage />}
							/>
							<Route
								path="/difficulty-selection"
								exact
								element={<Levels />}
							/>
							<Route
								path="/rules"
								exact
								element={<Rules />}
							/>
							<Route
								path="/wordle"
								exact
								element={<Navigate to="/" replace />}
							/>
							<Route
								path="/about"
								exact
								element={<About />}
							/>
							<Route
								path="/play"
								exact
								element={<Game />}
							/>
							<Route
								path="*"
								element={<Navigate to="/" replace />}
							/>
						</Routes>
					</HashRouter>
				</div>
			</div>
			<div className="credits">
				<p>Made by Varun Kedia</p>
				<a href="https://github.com/purplevarun">Github</a>
			</div>
		</div>
	);
}
export default App;
