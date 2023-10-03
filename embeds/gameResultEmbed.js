import { deleteOngoingGame } from '../state/index.js';
import { handleReward } from '../utils/handleReward.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder().setCustomId('playAgain').setLabel('Play Again').setStyle(ButtonStyle.Primary),
  new ButtonBuilder().setCustomId('quit').setLabel('Quit').setStyle(ButtonStyle.Danger),
);

async function createGameResultEmbed(interaction, userChoice, botChoice, roundResult, currentGame) {
  const embedData = {
    color: 16705372,
    title: '🔥 Rock, Paper, Scissors - Round Result!',
    fields: [],
    footer: {
      text: 'Score',
      icon_url: interaction.user.displayAvatarURL({ format: 'png', dynamic: true })
    },
    timestamp: new Date().toISOString(),
  };

  embedData.fields.push({ name: '🚀 Your Choice', value: userChoice.toUpperCase(), inline: true });
  embedData.fields.push({ name: '🤖 Bot\'s Choice', value: botChoice.toUpperCase(), inline: true });

  if (roundResult === "draw") {
    embedData.description = '🔶 This round is a draw!';
  } else if (roundResult === "user") {
    embedData.description = '✅ You win this round!';
    currentGame.score[0]++;
  } else {
    embedData.description = '❌ You lose this round!';
    currentGame.score[1]++;
  }

  const [userScore, botScore] = currentGame.score;
  currentGame.roundsPlayed++;
  embedData.footer.text += `: You - ${userScore}, Bot - ${botScore}`;

  if (currentGame.roundsPlayed === 3) {
    embedData.title = '🎉 Game Over!';
    if (userScore > botScore) {
      embedData.description = "🎖 You've won the best of three! Congratulations!";
    } else if (botScore > userScore) {
      embedData.description = "😢 You've lost the best of three. Try again!";
    } else {
      embedData.description = "🔶 It's a draw in the best of three!";
    }
    deleteOngoingGame(interaction.user.id);
    if (embedData.description.includes("You've won")) {
      embedData.fields.push({ name: '🎁 Reward', value: await handleReward(interaction) });
    }
  }

  return [embedData, row];
}

export { createGameResultEmbed };
