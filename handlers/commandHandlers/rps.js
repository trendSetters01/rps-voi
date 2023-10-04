import { determineRoundResult, getBotChoice } from '../../utils/index.js';
import { getUserAddress, getOngoingGame, setOngoingGame } from '../../state/index.js';
import { createGameResultEmbed, sendSetAddressReminderEmbed } from '../../embeds/index.js';

async function handleRps(interaction) {
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
  const embedData = await createGameResultEmbed(interaction, userChoice, botChoice, roundResult, currentGame);
  await interaction.reply({ embeds: [embedData] });
}

export { handleRps };
