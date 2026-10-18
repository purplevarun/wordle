import { Text } from "@chakra-ui/react";
import React from "react";
import "./../styles/About.css";
const About = () => {
	return (
		<div className="about">
			<Text alignSelf={"left"} flex={1} p={4}>
				Hello, I'm Varun. I started working on this website on 28th Feb
				2022.
			</Text>
			<Text alignSelf={"left"} flex={1} p={4}>
				All three levels are available: Noob, Standard, and Original.
			</Text>
			<Text alignSelf={"left"} flex={1} p={4}>
				If you liked my version of Wordle, or have any suggestions, you
				can write to me at{" "}
				<span style={{ color: "burlywood" }}>
					purplevarun@gmail.com
				</span>
				.
			</Text>
		</div>
	);
};

export default About;
