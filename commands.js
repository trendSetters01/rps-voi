const { REST, Routes } = require("discord.js");
const token = process.env["BOT_TOKEN"];
const clientID = process.env["CLIENT_ID"];
const guildID = process.env["GUILD_ID"];

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
    description: 'Set your Algorand address',
    options: [{
      name: 'address',
      type: 3,
      description: 'Your Algorand address',
      required: true
    }]
  },
  {
    name: 'optin',
    description: 'Opt-in for the PHTM asset',
  }
];


const rest = new REST({
  version: "10",
}).setToken(token);

(async () => {
  try {
    console.log("Registering slash commands");
    await rest.put(Routes.applicationGuildCommands(clientID, `${guildID}`), {
      body: commands,
    });
    console.log("Slash commands were registered succesfully");
  } catch (error) {
    console.log(`${error}`);
  }
})();

