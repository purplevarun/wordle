import React from "react";
import "./../styles/Definition.css";
const Definition = ({ title, body }) => {
	const words = title === "Noob" ? 3 : title === "Standard" ? 4 : 5;
	return (
		<div className="definition">
			<h1
				style={{
					color:
						title === "Noob"
							? "yellow"
							: title === "Standard"
							? "teal"
							: "red",
					fontSize: "25px",
				}}
			>
				{title} - {words} letter words
			</h1>
		</div>
	);
};

export default Definition;
