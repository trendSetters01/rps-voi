import { Client, IntentsBitField } from "discord.js";
import { determineRoundResult, getBotChoice } from './utils/index.js';
import { setUserAddress, getUserAddress, getOngoingGame, setOngoingGame } from './state/index.js';
import { createSetAddressEmbed, createGameInfoEmbed, createGameResultEmbed, sendSetAddressReminderEmbed } from './embeds/index.js';

const token = process.env["BOT_TOKEN"];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  try {
    switch (interaction.commandName) {
      case "invite":
        const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1157322558966857808&permissions=17877801569345&scope=bot%20applications.commands';
        await interaction.reply(`Click [here](${inviteLink}) to invite the bot to your server!`);
        break;
      case "setaddress":
        const address = interaction.options.getString('address');
        setUserAddress(interaction.user.id, address);
        const setAddressEmbed = createSetAddressEmbed(address);
        await interaction.reply({ embeds: [setAddressEmbed] });
        break;
      case "gameinfo":
        const gameInfoEmbed = createGameInfoEmbed();
        await interaction.reply({ embeds: [gameInfoEmbed] });
        break;
      case "rps":
        const userChoice = interaction.options.getString("choice");
        const botChoice = getBotChoice();
        if (!getOngoingGame(interaction.user.id)) {
          setOngoingGame(interaction.user.id, { score: [0, 0], roundsPlayed: 0 });
        }
        const currentGame = getOngoingGame(interaction.user.id);
        if (!getUserAddress(interaction.user.id)) {
          return await sendSetAddressReminderEmbed(interaction);
        }
        const roundResult = determineRoundResult(userChoice, botChoice);
        const [embedData] = await createGameResultEmbed(interaction, userChoice, botChoice, roundResult, currentGame);
        await interaction.reply({ embeds: [embedData] });
        break;
      default:
        await interaction.reply('Please try again later.');
        break;
    }
  } catch (error) {
    console.error(`Error processing command: ${interaction.commandName}. Error:`, error);
    await interaction.reply('Sorry, an error occurred. Please try again later.');
  }
});

client.login(token);
