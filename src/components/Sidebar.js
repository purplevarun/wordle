import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useColorMode,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();
	const goTo = path => {
		navigate(path);
		onClose();
	};
	return (
		<>
			<Button
				ref={btnRef}
				colorScheme="gray"
				onClick={onOpen}
				ml="10px"
				mt="10px"
			>
				Settings
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Wordle Settings</DrawerHeader>

					<DrawerBody>
						<VStack height="60px"></VStack>
						<VStack>
							<Button onClick={toggleColorMode}>
								{colorMode === "dark"
									? "Dark Mode"
									: "Light Mode"}
							</Button>
							<Button
								colorScheme={"blue"}
								onClick={() => goTo("/wordle/")}
							>
								Homepage
							</Button>
							<Button
								colorScheme="facebook"
								onClick={() => goTo("/wordle/rules")}
							>
								Rules
							</Button>
							<VStack height="60px"></VStack>

							<Button
								colorScheme="pink"
								onClick={() => goTo("/wordle/about")}
							>
								About the Developer
							</Button>
						</VStack>
					</DrawerBody>

					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Sidebar;
