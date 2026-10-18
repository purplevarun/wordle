import dictionary from "./data/dict";
import threeLetterWords from "./data/words/three-letter-words";
import fourLetterWords from "./data/words/four-letter-words";
import fiveLetterWords from "./data/words/five-letter-words";

export const LEVELS = { Noob: 3, Standard: 4, Original: 5 };
export const ATTEMPTS = 4;
const answers = Object.fromEntries(
	Object.entries(LEVELS).map(([level, length], index) => [
		level,
		[...new Set([threeLetterWords, fourLetterWords, fiveLetterWords][index]
			.map(word => word.toLowerCase().trim())
			.filter(word => new RegExp(`^[a-z]{${length}}$`).test(word)))],
	])
);
const validWords = new Set([...dictionary, ...Object.values(answers).flat()]);

export function createGame(level) {
	const words = answers[level];
	return { answer: words[Math.floor(Math.random() * words.length)], guesses: [] };
}

export function scoreGuess(guess, answer) {
	const remaining = answer.split("");
	const result = Array.from(guess, () => "absent");
	Array.from(guess).forEach((letter, index) => {
		if (letter === answer[index]) {
			result[index] = "correct";
			remaining[index] = null;
		}
	});
	Array.from(guess).forEach((letter, index) => {
		if (result[index] === "correct") return;
		const match = remaining.indexOf(letter);
		if (match !== -1) {
			result[index] = "present";
			remaining[match] = null;
		}
	});
	return result;
}

export function gameStatus(game) {
	if (game.guesses.includes(game.answer)) return "won";
	return game.guesses.length >= ATTEMPTS ? "lost" : "playing";
}

export function submitGuess(game, guess) {
	if (gameStatus(game) !== "playing") return { game };
	if (guess.length !== game.answer.length) return { game, error: "Not enough letters" };
	if (!validWords.has(guess)) return { game, error: "Not in the word list" };
	return { game: { ...game, guesses: [...game.guesses, guess] } };
}

export function restoreGame(level, saved) {
	try {
		const game = JSON.parse(saved);
		if (game && answers[level].includes(game.answer) && Array.isArray(game.guesses)
			&& game.guesses.length <= ATTEMPTS
			&& game.guesses.every(guess => typeof guess === "string"
				&& guess.length === LEVELS[level] && validWords.has(guess))
			&& !game.guesses.slice(0, -1).includes(game.answer)) return game;
	} catch {}
	return createGame(level);
}