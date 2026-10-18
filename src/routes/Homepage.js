import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import RainbowText from "rainbow-text-react";
import { useNavigate } from "react-router-dom";
import "./../styles/Homepage.css";
import { FaMoon, FaSun } from "react-icons/fa";
const Homepage = () => {
	const navigation = useNavigate();
	const gotoLevelsPage = () => {
		navigation("/difficulty-selection");
	};
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<div className="homepage">
			<div className="homepage-mode-changer">
				{colorMode === "dark" ? (
					<IconButton icon={<FaMoon />} aria-label="Switch to light mode" title="Switch to light mode" onClick={toggleColorMode} />
				) : (
					<IconButton icon={<FaSun />} aria-label="Switch to dark mode" title="Switch to dark mode" onClick={toggleColorMode} />
				)}
			</div>
			<div className="main-section">
				<div className="heading" role="heading" aria-level={1}>
					<RainbowText fontSize="inherit" fontWeight="inherit" colorMode={colorMode}>
						Wordle on Steroids
					</RainbowText>
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
