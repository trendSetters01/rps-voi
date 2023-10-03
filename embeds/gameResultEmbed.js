import { sendAsset } from '../algorand/algorand.js';
import { getUserAddress, deleteOngoingGame } from '../state/index.js';

const rewardAmount = 1000000; // 1 Algo in microAlgos

async function handleReward(interaction) {
  const userAddress = getUserAddress(interaction.user.id);
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

  return embedData;
}

export { createGameResultEmbed };
