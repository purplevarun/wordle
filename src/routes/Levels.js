import {
	Button,
	IconButton,
	Tooltip,
	useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Levels.css";
import { FaMoon, FaSun } from "react-icons/fa";

const Levels = () => {
	const navigate = useNavigate();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<div className="levels">
			<header>Select Difficulty Level</header>
			<div className="homepage-mode-changer">
				{colorMode === "dark" ? (
					<IconButton icon={<FaMoon />} onClick={toggleColorMode} />
				) : (
					<IconButton icon={<FaSun />} onClick={toggleColorMode} />
				)}
			</div>
			<div className="level-selection-buttons">
				<Tooltip label="3 letter words" placement="right">
					<Button
						size="lg"
						colorScheme="yellow"
						onClick={() =>
							navigate("/play?level=Noob", {
								state: { level: "Noob" },
							})
						}
					>
						<div className="insidebtn">
							<span>Noob</span>
							<img
								src={
									process.env.PUBLIC_URL + "/images/fetus.png"
								}
								alt=""
								width="40px"
							/>
						</div>
					</Button>
				</Tooltip>

				<Tooltip placement="right" label="4 letter words">
					<Button
						size="lg"
						colorScheme="blue"
						onClick={() =>
							navigate("/play?level=Standard", {
								state: { level: "Standard" },
							})
						}
					>
						<div className="insidebtn">
							<span>Standard</span>
							<img
								src={process.env.PUBLIC_URL + "/images/man.png"}
								alt=""
								width="40px"
							/>
						</div>
					</Button>
				</Tooltip>

				<Tooltip placement="right" label="5 letter words">
					<Button
						size="lg"
						colorScheme="red"
						onClick={() =>
							navigate("/play?level=Original", {
								state: { level: "Original" },
							})
						}
					>
						<div className="insidebtn">
							<span>Original</span>
							<img
								src={
									process.env.PUBLIC_URL + "/images/alien.png"
								}
								alt=""
								width="40px"
							/>
						</div>
					</Button>
				</Tooltip>
			</div>
		</div>
	);
};

export default Levels;
