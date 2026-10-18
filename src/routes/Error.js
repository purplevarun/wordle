import { Alert, AlertIcon, AlertTitle, Button, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Error.css";
const Error = () => {
	const navigate = useNavigate();
	return (
		<div className="error">
			<VStack>
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Page Not Found</AlertTitle>
				</Alert>
				<VStack height={"20px"}></VStack>
				<Button
					colorScheme={"green"}
					onClick={() => navigate("/wordle")}
				>
					Go Back to Homepage
				</Button>
			</VStack>
		</div>
	);
};

export default Error;
