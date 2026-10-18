# Wordle

Play at https://purplevarun.github.io/wordle/.

Three difficulty levels: Noob (3 letters), Standard (4), and Original (5).
Each game has four attempts. Use a physical keyboard or the on-screen keys.
Progress is saved locally per difficulty; New Game or Play Again starts over.
Completed games can be shared without revealing the answer.

## Development

Requires Node.js 24 and npm. The project uses React 17 and Create React App 5;
the local npm configuration enables legacy peer dependency resolution.

```sh
npm ci
npm start
npm test -- --watchAll=false --runInBand
npm run build
```

The development app is served under `/wordle/`. Production assets use the same
base path. GitHub Pages redirects deep links through the root and restores the
original route, query, and fragment before React starts.

## Deployment

GitHub Pages uses GitHub Actions rather than the old `gh-pages` branch.
Pushing to `main` runs tests, builds the app, and deploys the result. After source
changes have been committed and pushed, `npm run deploy` can trigger a new build
manually using an authenticated GitHub CLI.
