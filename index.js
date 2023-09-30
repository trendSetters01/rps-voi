const { Client, IntentsBitField } = require("discord.js");
const token = process.env["BOT_TOKEN"];
const { sendAlgo } = require('./algorand');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const ongoingGames = {};
const userAddresses = {}; // Store user addresses

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

const allowedChannelID = "1157321716670943342";
const rewardAmount = 1; // Set the reward amount value

const choices = ["rock", "paper", "scissors"];

function getBotChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineRoundResult(userChoice, botChoice) {
  if (userChoice === botChoice) return "draw";
  if (
    (userChoice === "rock" && botChoice === "scissors") ||
    (userChoice === "scissors" && botChoice === "paper") ||
    (userChoice === "paper" && botChoice === "rock")
  ) return "user";
  return "bot";
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.channelId !== allowedChannelID) {
    return interaction.reply({
      content: "You can't use this command here! Please go to the rock-paper-scissors channel under Games.",
      ephemeral: true,
    });
  }

  // Handle the setaddress command
  if (interaction.commandName === "setaddress") {
    const address = interaction.options.getString('address');
    userAddresses[interaction.user.id] = address;
    return await interaction.reply(`Your Algorand address has been set to ${address}`);
  }

  if (interaction.commandName !== "rps") return;

  const userChoice = interaction.options.getString("choice");
  const botChoice = getBotChoice();

  let result = "";

  if (!ongoingGames[interaction.user.id]) {
    ongoingGames[interaction.user.id] = { score: [0, 0], roundsPlayed: 0 };
    result = "Welcome to Rock, Paper, Scissors - Best of Three!\n\n";
    result += "Here's how to play:\n";
    result += "1. Use the `/rps` command followed by your choice (rock, paper, or scissors).\n";
    result += "2. After three rounds, the winner will be announced.\n\n";
    result += `Your first choice was ${userChoice}.\n\n`;
  }

  const roundResult = determineRoundResult(userChoice, botChoice);

  if (roundResult === "draw") {
    result += "This round is a draw!";
  } else if (roundResult === "user") {
    result += `You win this round! I chose ${botChoice}.`;
    ongoingGames[interaction.user.id].score[0]++;
  } else {
    result += `You lose this round! I chose ${botChoice}.`;
    ongoingGames[interaction.user.id].score[1]++;
  }

  const [userScore, botScore] = ongoingGames[interaction.user.id].score;
  ongoingGames[interaction.user.id].roundsPlayed++;

  if (ongoingGames[interaction.user.id].roundsPlayed === 2 && (userScore === 2 || botScore == 2)) {
    result += userScore > botScore ? "\n\nYou've won without needing a third round! Congratulations!" : "\n\nI've won without needing a third round! Boooo!";
    delete ongoingGames[interaction.user.id];
    console.log(result)
    return await interaction.reply(result);
  }

  if (ongoingGames[interaction.user.id].roundsPlayed === 3) {
    result += userScore > botScore ? "\n\nYou've won the best of three! Congratulations!" : botScore > userScore ? "\n\nYou've lost the best of three. Better luck next time!" : "\n\nIt's a draw in the best of three!";
    delete ongoingGames[interaction.user.id];
  } else {
    result += `\n\nScore: You - ${userScore}, Bot - ${botScore}`;
  }

  if (result.includes("You've won")) {
    if (userAddresses[interaction.user.id]) {
      const userAddress = userAddresses[interaction.user.id];
      try {
        await sendAlgo(1000000);
        result += "\n\nYou have been rewarded with Algo tokens!";
      } catch (err) {
        console.error("Error sending Algo:", err);
        result += "\n\nThere was an issue rewarding you with Algo tokens. Please try again later.";
      }
    } else {
      result += "\n\nPlease set your Algorand address using the `/setaddress` command to receive rewards.";
    }
  }

  await interaction.reply(result);
});

client.login(token);