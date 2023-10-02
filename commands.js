const { REST, Routes } = require("discord.js");
const token = process.env["BOT_TOKEN"];
const clientID = process.env["CLIENT_ID"];

const commands = [
  {
    name: "rps",
    description: "Play a game of Rock, Paper, Scissors!",
    options: [
      {
        name: "choice",
        type: 3,
        description: "Your choice for the game",
        required: true,
        choices: [
          { name: "Rock", value: "rock" },
          { name: "Paper", value: "paper" },
          { name: "Scissors", value: "scissors" },
        ],
      },
    ],
  },
  {
    name: 'setaddress',
    description: 'Set your Algorand address (Testnet)',
    options: [{
      name: 'address',
      type: 3,
      description: 'Your Algorand address (Testnet)',
      required: true
    }]
  },
  {
    name: 'optin',
    description: 'Opt-in for the PHTM asset (inactive)',
  },
  {
    name: 'invite',
    description: 'Get an invite link to add this bot to your server.'
  },
  {
    name: 'gameinfo',
    description: 'Get gameplay information.'
  }
];


const rest = new REST({
  version: "10",
}).setToken(token);

(async () => {
  try {
    console.log("Registering global slash commands");
    await rest.put(Routes.applicationCommands(clientID), {
      body: commands,
    });
    console.log("Slash commands were registered succesfully");
  } catch (error) {
    console.log(`${error}`);
  }
})();

