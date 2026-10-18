import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
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
					<BrowserRouter>
						<div className="settingsbtn">
							<Sidebar />
						</div>
						<Routes>
							<Route
								path="/wordle/"
								exact
								element={<Game />}
							/>
							<Route
								path="/wordle/difficulty-selection"
								exact
								element={<Levels />}
							/>
							<Route
								path="/wordle/rules"
								exact
								element={<Rules />}
							/>
							<Route
								path="/wordle/wordle"
								exact
								element={<Game />}
							/>
							<Route
								path="/wordle/about"
								exact
								element={<About />}
							/>
							<Route
								path="/wordle/play"
								exact
								element={<Game />}
							/>
							<Route
								path="*"
								element={<Navigate to="/wordle" replace />}
							/>
						</Routes>
					</BrowserRouter>
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
