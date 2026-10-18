import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import Game from "./Game";
import Sidebar from "../components/Sidebar";

beforeEach(() => localStorage.clear());

function renderGame(level = "Original") {
	return render(<ChakraProvider><MemoryRouter initialEntries={[`/wordle/play?level=${level}`]}><Game /></MemoryRouter></ChakraProvider>);
}

function typeWord(word) {
	for (const key of word) fireEvent.keyDown(window, { key });
	fireEvent.keyDown(window, { key: "Enter" });
}

test.each([["Noob", 3], ["Standard", 4], ["Original", 5]])("%s renders a playable %i-letter board", (level, length) => {
	renderGame(level);
	expect(screen.getByRole("group", { name: `${length}-letter word, 4 attempts` })).toBeInTheDocument();
	fireEvent.click(screen.getByRole("button", { name: "Backspace" }));
	fireEvent.click(screen.getByRole("button", { name: "Submit guess" }));
	expect(screen.getByRole("status")).toHaveTextContent("Not enough letters");
	fireEvent.click(screen.getByRole("button", { name: "A", exact: true }));
	expect(screen.getByLabelText("Row 1, letter 1: a")).toBeInTheDocument();
});

test("physical keyboard wins on the fourth attempt and replay resets the board", () => {
	localStorage.setItem("wordle:Original:v1", JSON.stringify({ answer: "apple", guesses: ["bread", "crane", "level"] }));
	renderGame();
	typeWord("apple");
	expect(screen.getByRole("status")).toHaveTextContent("Solved in 4/4!");
	expect(screen.queryByRole("button", { name: "Submit guess" })).not.toBeInTheDocument();
	fireEvent.click(screen.getByRole("button", { name: "Play Again" }));
	expect(screen.getByRole("status")).toHaveTextContent("4 attempts left");
	expect(screen.getByLabelText("Row 1, letter 1: empty")).toBeInTheDocument();
});

test("four wrong guesses reveal the answer and block further input", () => {
	localStorage.setItem("wordle:Original:v1", JSON.stringify({ answer: "apple", guesses: ["bread", "crane", "level"] }));
	renderGame();
	typeWord("house");
	expect(screen.getByRole("status")).toHaveTextContent("The word was APPLE.");
	typeWord("apple");
	expect(JSON.parse(localStorage.getItem("wordle:Original:v1")).guesses).toHaveLength(4);
});

test("reload restores a submitted guess", () => {
	localStorage.setItem("wordle:Original:v1", JSON.stringify({ answer: "apple", guesses: [] }));
	const view = renderGame();
	typeWord("crane");
	view.unmount();
	renderGame();
	expect(screen.getByRole("status")).toHaveTextContent("3 attempts left");
	expect(screen.getByLabelText(/Row 1, letter 1: c, absent/)).toBeInTheDocument();
});

test("physical Enter submits after clicking on-screen letters", () => {
	localStorage.setItem("wordle:Noob:v1", JSON.stringify({ answer: "the", guesses: [] }));
	renderGame("Noob");
	for (const letter of "THE") fireEvent.click(screen.getByRole("button", { name: letter, exact: true }));
	fireEvent.keyDown(screen.getByRole("button", { name: "E", exact: true }), { key: "Enter" });
	expect(screen.getByRole("status")).toHaveTextContent("Solved in 1/4!");
});

test("settings closes after choosing a page", async () => {
	render(<ChakraProvider><MemoryRouter><Sidebar /></MemoryRouter></ChakraProvider>);
	fireEvent.click(screen.getByRole("button", { name: "Settings", exact: true }));
	fireEvent.click(screen.getByRole("button", { name: "Rules", exact: true }));
	await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});
