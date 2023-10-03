import { Client, IntentsBitField, EmbedBuilder } from "discord.js";
import { sendAsset } from './algorand.js';
import { determineRoundResult } from './utils/index.js';
import { setUserAddress, getUserAddress } from './state/index.js';

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
const rewardAmount = 1000000; // 1 Algo in microAlgos
const choices = ["rock", "paper", "scissors"];

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

function getBotChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

async function handleReward(interaction) {
  const userAddress = getUserAddress(interaction.user.id);  // Using getUserAddress from stateManager.js
  if (userAddress) {
    try {
      await sendAsset(userAddress, rewardAmount);
      return "\n\nYou have been rewarded with PHTM tokens!";
    } catch (err) {
      console.error("Error sending Algo:", err);
      return "\n\nThere was an issue rewarding you with PHTM tokens. Please try again later.";
    }
  } else {
    return "\n\nPlease set your Algorand address using the `/setaddress` command to receive rewards.";
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.commandName) {
    case "invite":
      const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1157322558966857808&permissions=17877801569345&scope=bot%20applications.commands';
      await interaction.reply(`Click [here](${inviteLink}) to invite the bot to your server!`);
      break;
    case "setaddress":
      const address = interaction.options.getString('address');
      setUserAddress(interaction.user.id, address);

      try {
        const setAddressEmbed = new EmbedBuilder()
          .setColor(15548997)
          .setTitle('Algorand Address (Testnet)')
          .setImage('attachment://discordjs.png')
          .setDescription(`Your Algorand address (on testnet) has been set to ${address}\n\nPlease ensure you have opted-in for the PHTM token ( Asset ID 402192759 ) to receive rewards!.`);

        await interaction.reply({ embeds: [setAddressEmbed] });
      } catch (error) {
        console.error(error);
      }
      break;
    case "gameinfo":
      const gameInfoEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Rock, Paper, Scissors (Testnet) - Game Info')
        .setDescription('Welcome to Rock, Paper, Scissors! Here\'s how the game works:')
        .addFields(
          { name: '1. Set Address', value: 'Before playing, set your Algorand address using the `/setaddress` command.' },
          { name: '2. Make a Choice', value: 'Use the `/rps` command followed by your choice: rock, paper, or scissors.' },
          { name: '3. Play Three Rounds', value: 'The game consists of three rounds. Win the best out of three to get rewarded!' },
          { name: '4. Get Rewards', value: 'Winners receive PHTM tokens as a reward. Make sure to opt-in for the token on Algorand (Testnet)!' },
          { name: '🔶 Notice', value: 'This game operates on the Algorand testnet. All transactions and rewards are on the testnet.' }
        );

      await interaction.reply({ embeds: [gameInfoEmbed] });
      break;

    case "rps":
      const userChoice = interaction.options.getString("choice");
      const botChoice = getBotChoice();
      // Ensure ongoingGames[interaction.user.id] is initialized
      if (!ongoingGames[interaction.user.id]) {
        ongoingGames[interaction.user.id] = { score: [0, 0], roundsPlayed: 0 };
      }
      let embedData = {
        color: 16705372,
        title: '🔥 Rock, Paper, Scissors - Round Result!',
        fields: [],
        footer: {
          text: 'Score',
          icon_url: interaction.user.displayAvatarURL({ format: 'png', dynamic: true })
        },
        timestamp: new Date().toISOString(),
      };

      if (!getUserAddress(interaction.user.id)) {
        const pleaseSetAddressEmbed = new EmbedBuilder()
          .setColor(15277667)
          .setTitle('🚫 Algorand Address (Testnet)')
          .setDescription("Please set your Algorand address (on testnet) using the `/setaddress` command before playing.");

        return await interaction.reply({ embeds: [pleaseSetAddressEmbed], ephemeral: true });
      }

      embedData.fields.push({ name: '🚀 Your Choice', value: userChoice.toUpperCase(), inline: true });
      embedData.fields.push({ name: '🤖 Bot\'s Choice', value: botChoice.toUpperCase(), inline: true });

      const roundResult = determineRoundResult(userChoice, botChoice);

      if (roundResult === "draw") {
        embedData.description = '🔶 This round is a draw!';
      } else if (roundResult === "user") {
        embedData.description = '✅ You win this round!';
        ongoingGames[interaction.user.id].score[0]++;
      } else {
        embedData.description = '❌ You lose this round!';
        ongoingGames[interaction.user.id].score[1]++;
      }

      const [userScore, botScore] = ongoingGames[interaction.user.id].score;
      ongoingGames[interaction.user.id].roundsPlayed++;

      embedData.footer.text += `: You - ${userScore}, Bot - ${botScore}`;

      if (ongoingGames[interaction.user.id].roundsPlayed === 3) {
        embedData.title = '🎉 Game Over!';
        if (userScore > botScore) {
          embedData.description = "🎖 You've won the best of three! Congratulations!";
        } else if (botScore > userScore) {
          embedData.description = "😢 You've lost the best of three. Try again!";
        } else {
          embedData.description = "🔶 It's a draw in the best of three!";
        }
        delete ongoingGames[interaction.user.id];
        if (embedData.description.includes("You've won")) {
          embedData.fields.push({ name: '🎁 Reward', value: await handleReward(interaction) });
        }
      }

      await interaction.reply({ embeds: [embedData] });
      break;
    default:
      await interaction.reply('Please try again later.');
      break;
  }
});

client.login(token);
