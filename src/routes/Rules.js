import { Badge, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Definition from "../components/Definition";
import "./../styles/Rules.css";
const Rules = () => {
	return (
		<div className="rules">
			<Heading>
				Wordle has <span style={{ color: "teal" }}>3</span> levels
			</Heading>
			<Divider />
			<div className="levels-wrapper">
				<Definition title="Noob" />
				<Definition title="Standard" />
				<Definition title="Original" />
			</div>
			<div className="the-definition">
					<Text letterSpacing={0}>
					You are given 4 chances to guess a word Everytime you submit
					a new word, each character of that word will show a color{" "}
					<Badge bgColor={"green"}>Green</Badge> if that character is
					in the correct position,{" "}
							<Badge bgColor={"#957015"} color={"white"}>
								Yellow
					</Badge>{" "}
					if that character is present but not in the correct
							position, and <Badge bgColor={"#525760"} color={"white"}>Gray</Badge> if the
							character is not present in the remaining answer letters.
				</Text>
			</div>
		</div>
	);
};

export default Rules;
