import { Badge, Button, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEnter } from "react-icons/ai";
import { TiBackspaceOutline } from "react-icons/ti";
import { FaRedo } from "react-icons/fa";
import { ATTEMPTS, LEVELS, createGame, gameStatus, restoreGame, scoreGuess, submitGuess } from "../game";
import "../styles/Game.css";

const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const priority = { absent: 1, present: 2, correct: 3 };

export default function Game() {
	const location = useLocation();
	const requested = new URLSearchParams(location.search).get("level") || location.state?.level;
	const level = Object.prototype.hasOwnProperty.call(LEVELS, requested) ? requested : "Original";
	return <GameBoard key={level} level={level} />;
}

function GameBoard({ level }) {
	const navigate = useNavigate();
	const storageKey = `wordle:${level}:v1`;
	const [game, setGame] = useState(() => {
		try { return restoreGame(level, localStorage.getItem(storageKey)); }
		catch { return createGame(level); }
	});
	const [input, setInput] = useState("");
	const [message, setMessage] = useState("");
	const status = gameStatus(game);
	const length = LEVELS[level];
	const keyStates = {};
	game.guesses.forEach(guess => {
		scoreGuess(guess, game.answer).forEach((state, index) => {
			const letter = guess[index];
			if (!keyStates[letter] || priority[state] > priority[keyStates[letter]]) keyStates[letter] = state;
		});
	});

	useEffect(() => {
		try { localStorage.setItem(storageKey, JSON.stringify(game)); } catch {}
	}, [game, storageKey]);

	function handleInput(key) {
		if (status !== "playing") return;
		if (key === "Backspace") {
			setInput(value => value.slice(0, -1));
			setMessage("");
		} else if (key === "Enter") {
			const result = submitGuess(game, input);
			if (result.error) setMessage(result.error);
			else {
				setGame(result.game);
				setInput("");
				setMessage("");
			}
		} else if (/^[a-z]$/i.test(key)) {
			setInput(value => value.length < length ? value + key.toLowerCase() : value);
			setMessage("");
		}
	}

	useEffect(() => {
		function onKeyDown(event) {
			if (event.ctrlKey || event.metaKey || event.altKey || event.repeat
				|| event.target.closest?.("input, textarea, select, [contenteditable=true], [role=dialog]")) return;
			if (/^[a-z]$/i.test(event.key) || event.key === "Backspace" || event.key === "Enter") {
				if (event.key === "Enter" && event.target.closest?.("button:not(.letter-key), a")) return;
				event.preventDefault();
				handleInput(event.key);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	});

	function restart() {
		setGame(createGame(level));
		setInput("");
		setMessage("");
	}

	async function share() {
		const symbols = { correct: "\u{1f7e9}", present: "\u{1f7e8}", absent: "\u2b1b" };
		const rows = game.guesses.map(guess => scoreGuess(guess, game.answer).map(state => symbols[state]).join(""));
		const text = `Wordle ${level} ${status === "won" ? game.guesses.length : "X"}/${ATTEMPTS}\n${rows.join("\n")}\nhttps://purplevarun.github.io/wordle/`;
		try {
			await navigator.clipboard.writeText(text);
			setMessage("Result copied");
		} catch { setMessage("Clipboard unavailable. Please try again in your browser."); }
	}

	return (
		<main className="wordle-game">
			<header className="game-heading">
				<div><h1>Wordle</h1><Badge colorScheme="teal">{level} / {length} letters</Badge></div>
				<IconButton icon={<FaRedo />} aria-label="New game" title="New game" onClick={restart} />
			</header>
			<div className="guess-board" role="group" aria-label={`${length}-letter word, ${ATTEMPTS} attempts`}>
				{Array.from({ length: ATTEMPTS }, (_, rowIndex) => {
					const guess = game.guesses[rowIndex];
					const letters = guess || (rowIndex === game.guesses.length ? input : "");
					const scores = guess ? scoreGuess(guess, game.answer) : [];
					return <div className="guess-row" key={rowIndex} style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}>
						{Array.from({ length }, (_, columnIndex) => <div
							key={columnIndex}
							className={`letter-tile ${scores[columnIndex] || (letters[columnIndex] ? "filled" : "")}`}
							aria-label={`Row ${rowIndex + 1}, letter ${columnIndex + 1}: ${letters[columnIndex] || "empty"}${scores[columnIndex] ? `, ${scores[columnIndex]}` : ""}`}
						>{letters[columnIndex]}</div>)}
					</div>;
				})}
			</div>
			<div className="game-message" role="status" aria-live="polite">
				{status === "won" ? <Text fontWeight="bold">Solved in {game.guesses.length}/{ATTEMPTS}!</Text>
					: status === "lost" ? <Text fontWeight="bold">The word was {game.answer.toUpperCase()}.</Text>
					: <Text>{ATTEMPTS - game.guesses.length} attempts left</Text>}
				<Text>{message}</Text>
			</div>
			{status === "playing" ? <div className="game-keyboard" aria-label="Keyboard">
				{keyboardRows.map((letters, rowIndex) => <div className="keyboard-row" key={letters}>
					{rowIndex === 2 && <button type="button" className="letter-key action-key" aria-label="Submit guess" title="Submit guess" onClick={() => handleInput("Enter")}><AiOutlineEnter /></button>}
					{Array.from(letters, letter => <button type="button" key={letter}
						className={`letter-key ${keyStates[letter] || ""}`} aria-label={letter.toUpperCase()}
						onClick={() => handleInput(letter)}>{letter}</button>)}
					{rowIndex === 2 && <button type="button" className="letter-key action-key" aria-label="Backspace" title="Backspace" onClick={() => handleInput("Backspace")}><TiBackspaceOutline /></button>}
				</div>)}
			</div> : <div className="game-actions"><Button colorScheme="green" onClick={restart}>Play Again</Button><Button onClick={share}>Copy Result</Button></div>}
			<Button variant="link" onClick={() => navigate("/wordle/difficulty-selection")}>Change Difficulty</Button>
		</main>
	);
}
