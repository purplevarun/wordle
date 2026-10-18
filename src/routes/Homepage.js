import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Homepage.css";
import { FaMoon, FaSun } from "react-icons/fa";
const Homepage = () => {
	const navigation = useNavigate();
	const gotoLevelsPage = () => {
		navigation("/wordle/difficulty-selection");
	};
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<div className="homepage">
			<div className="homepage-mode-changer">
				{colorMode === "dark" ? (
					<IconButton icon={<FaMoon />} onClick={toggleColorMode} />
				) : (
					<IconButton icon={<FaSun />} onClick={toggleColorMode} />
				)}
			</div>
			<div className="main-section">
				<div className="heading">
					Wordle on Steroids &nbsp;
					<img
						src={process.env.PUBLIC_URL + "/images/arm-muscle.png"}
						alt=""
						className="arm-muscle-image"
					/>
				</div>
				<Button
					colorScheme="green"
					size="lg"
					onClick={() => gotoLevelsPage()}
				>
					Click to Play Wordle
				</Button>
			</div>
		</div>
	);
};

export default Homepage;
