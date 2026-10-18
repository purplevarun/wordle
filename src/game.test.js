import { ATTEMPTS, LEVELS, createGame, gameStatus, restoreGame, scoreGuess, submitGuess } from "./game";

test.each(Object.entries(LEVELS))("%s selects a lowercase %i-letter answer", (level, length) => {
	expect(createGame(level).answer).toMatch(new RegExp(`^[a-z]{${length}}$`));
});

test("duplicate letters cannot claim the same answer letter twice", () => {
	expect(scoreGuess("allee", "apple")).toEqual(["correct", "present", "absent", "absent", "correct"]);
	expect(scoreGuess("belle", "level")).toEqual(["absent", "correct", "present", "present", "present"]);
});

test("short and unknown guesses do not consume an attempt", () => {
	const game = { answer: "apple", guesses: [] };
	expect(submitGuess(game, "app")).toEqual({ game, error: "Not enough letters" });
	expect(submitGuess(game, "zzzzz")).toEqual({ game, error: "Not in the word list" });
});

test("winning on the last attempt is a win, not a loss", () => {
	const { game } = submitGuess({ answer: "apple", guesses: ["bread", "crane", "level"] }, "apple");
	expect(game.guesses).toHaveLength(ATTEMPTS);
	expect(gameStatus(game)).toBe("won");
	expect(submitGuess(game, "apple").game).toBe(game);
});

test("four wrong guesses end the game", () => {
	expect(gameStatus({ answer: "apple", guesses: ["bread", "crane", "level", "house"] })).toBe("lost");
});

test.each(Object.keys(LEVELS))("%s saves and restores its own game", level => {
	const game = createGame(level);
	expect(restoreGame(level, JSON.stringify(game))).toEqual(game);
	expect(restoreGame(level, "broken").answer).toHaveLength(LEVELS[level]);
	expect(restoreGame(level, JSON.stringify({ answer: game.answer, guesses: [null] })).guesses).toEqual([]);
});
