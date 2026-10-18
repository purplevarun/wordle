import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ModalBox = ({ openModalBox, level, setOpenModalBox }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	useEffect(() => {
		if (openModalBox) {
			onOpen();
			setOpenModalBox(false);
		}
	});
	const navigate = useNavigate();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>You Have Won!</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Congratulation on completing Wordle on{" "}
							<span style={{ color: "aqua" }}>{level}</span> mode.
						</Text>
					</ModalBody>

					<ModalFooter flex={1} justifyContent="space-between">
						<Button
							colorScheme="blue"
							onClick={() => navigate("/wordl2/")}
						>
							Homepage
						</Button>
						<Button
							colorScheme="red"
							onClick={() =>
								navigate("/wordle/difficulty-selection")
							}
						>
							Play Again
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalBox;
