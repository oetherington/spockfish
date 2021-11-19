# Spockfish

![CI Workflow Status](https://github.com/oetherington/spockfish/actions/workflows/ci.yml/badge.svg)

Spockfish is an interface for playing the variant of 3D chess seen in Star
Trek. It is written entirely in Typescript and includes both a UI and an AI
engine.

You can see it in action at [spockfish.com](https://www.spockfish.com).

Spockfish was created by [Ollie Etherington](https://www.etherington.io). It is
not affiliated with either the creators of
[Star Trek](https://www.startrek.com/) or with
[Stockfish](https://stockfishchess.org/).

![Star Trek Chess](/public/StarTrekChess.jpg)

### Building

It is recommended to first opt out of nextjs telemetry with
`npx next telemetry disable`.

Run `npm run dev` to start the development server. Open
[http://localhost:3000](http://localhost:3000) in your browser to see the
result.

A production build can be created with `npm run build`.

Run the unit tests with `npm run test`. You can also use `npm run test-fast` to
speed up the tests by disabling typechecking.

Run the linter with `npm run lint`.

### License

Spockfish is free software under the [GNU Affero General Public License v3](https://www.gnu.org/licenses/agpl-3.0.en.html).
See the enclosed `COPYING` file for details.
