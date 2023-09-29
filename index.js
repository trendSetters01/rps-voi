const { Client, IntentsBitField } = require("discord.js");
const token = process.env["BOT_TOKEN"];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const ongoingGames = {};

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

const allowedChannelID = "1157321716670943342";

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // Check if the interaction is in the allowed channel
  if (interaction.channelId !== allowedChannelID) {
    return interaction.reply({
      content:
        "You can't use this command here! Please go to the rock-paper-scissors channel under Games.",
      ephemeral: true,
    });
  }

  const { commandName } = interaction;

  const userChoice = interaction.options.getString("choice");
  const choices = ["rock", "paper", "scissors"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  let result = "";

  if (commandName === "rps") {
    let isFirstRound = false;

    if (!ongoingGames[interaction.user.id]) {
      ongoingGames[interaction.user.id] = { score: [0, 0], roundsPlayed: 0 };
      isFirstRound = true;
    }

    if (userChoice === botChoice) {
      result = "This round is a draw!";
    } else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "scissors" && botChoice === "paper") ||
      (userChoice === "paper" && botChoice === "rock")
    ) {
      result = `You win this round! I chose ${botChoice}.`;
      ongoingGames[interaction.user.id].score[0]++;
    } else {
      result = `You lose this round! I chose ${botChoice}.`;
      ongoingGames[interaction.user.id].score[1]++;
    }

    ongoingGames[interaction.user.id].roundsPlayed++;

    if (ongoingGames[interaction.user.id].roundsPlayed === 3) {
      const [userScore, botScore] = ongoingGames[interaction.user.id].score;
      if (userScore > botScore) {
        result += "\n\nYou've won the best of three! Congratulations!";
      } else if (userScore < botScore) {
        result += "\n\nYou've lost the best of three. Better luck next time!";
      } else {
        result += "\n\nIt's a draw in the best of three!";
      }

      // Reset or delete the game state for this user
      delete ongoingGames[interaction.user.id];
    } else {
      result += `\n\nScore: You - ${
        ongoingGames[interaction.user.id].score[0]
      }, Bot - ${ongoingGames[interaction.user.id].score[1]}`;
    }

    if (isFirstRound) {
      result =
        "Welcome to Rock, Paper, Scissors - Best of Three!\n\n" +
        "Here's how to play:\n" +
        "1. Use the `/rps` command followed by your choice (rock, paper, or scissors).\n" +
        "2. After three rounds, the winner will be announced.\n\n" +
        "Your first choice was " +
        userChoice +
        ".\n\n" +
        result;
    }

    await interaction.reply(result);
  }
});

client.login(token);
