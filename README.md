# Wordle

Play at https://purplevarun.github.io/wordle/.

Three difficulty levels: Noob (3 letters), Standard (4), and Original (5).
Each game has four attempts. Use a physical keyboard or the on-screen keys.
Progress is saved locally per difficulty; New Game or Play Again starts over.
Completed games can be shared without revealing the answer.

## Development

Requires Bun and Node.js 24. Bun installs dependencies and runs the scripts;
the existing React 17, Create React App 5, and Jest tooling runs on Node.
TypeScript is pinned for compatibility with Create React App's lint plugins.

```sh
bun install --no-save
bun run start
bun run test --watchAll=false --runInBand
bun run build
```

Package-manager lockfiles are intentionally ignored. A clean install resolves
the dependency ranges in `package.json`, so resolved versions can change between
builds. CI uses a non-frozen install without a lockfile-dependent cache.

The development app is served under `/wordle/`. Production assets use the same
base path. GitHub Pages redirects deep links through the root and restores the
original route, query, and fragment before React starts.

## Deployment

GitHub Pages uses GitHub Actions rather than the old `gh-pages` branch.
Pushing to `main` installs dependencies with the latest stable Bun, runs tests,
builds the app, and deploys the result. The workflow also supports manual runs.
After source changes have been committed and pushed, `bun run deploy` can trigger
a new build manually using an authenticated GitHub CLI.
