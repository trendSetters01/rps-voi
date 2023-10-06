
# Rock-Paper-Scissors Discord Bot with Algorand Integration

## Description
This project features a Discord bot that allows users to play the classic Rock-Paper-Scissors game directly within Discord. The bot also integrates with the Algorand blockchain, offering extended features such as asset interactions.

## Setup and Installation

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Set up required environment variables, notably `BOT_TOKEN` for Discord authentication.
4. Start the bot using `npm start` for production or `npm run dev` for development mode with nodemon.

## Usage

Interact with the bot using the following slash commands in Discord:
- `/gameinfo`: Retrieve information related to the Rock-Paper-Scissors game mechanics.
- `/invite`: Generate an invite link to add this bot to your Discord server.
- `/optin`: Opt-in to interact with the PHTM asset (feature currently inactive).
- `/rps`: Initiate a Rock, Paper, Scissors game.
- `/setaddress`: Register your Algorand address (Testnet).

## Dependencies and Development Tools

### Main Dependencies:
- `discord.js`: For Discord API interactions and bot functionalities.
- `algosdk`: SDK to integrate with the Algorand blockchain.
- `nodemon`: Tool to automatically restart the node application during development.

### Development Dependencies:
- `babel` and related packages: To transpile ES6+ code for compatibility.
- `jest`: For testing functionalities.
- `husky`: For setting up Git hooks, like running tests before commits.

## Testing

Tests are implemented using the Jest framework. Run the entire test suite using the `npm test` command.

## To-Do

- [ ] Complete tests for all bot functionalities.
  - [ ] Test core Rock-Paper-Scissors game mechanics.
  - [ ] Ensure successful integration with Discord and Algorand.
  - [ ] Conduct security testing to safeguard against vulnerabilities.

## License

ISC

## Acknowledgements

A shoutout to the Algorand team for their comprehensive resources and documentation, which facilitated the integration of their blockchain platform into this project.
