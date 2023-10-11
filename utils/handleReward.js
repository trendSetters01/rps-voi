import { sendAsset } from '../algorand/transactions.js';
import { getUserAddress } from '../state/index.js';

const rewardAmount = 10;

async function handleReward(interaction) {
  const userAddress = getUserAddress(interaction.user.id);
  if (userAddress) {
    try {
      await sendAsset(userAddress, rewardAmount);
      return "\n\nYou have been rewarded with PHTM tokens!";
    } catch (err) {
      console.error("Error sending Algo:", err);
      return `\n\nThere was an issue rewarding you with PHTM tokens. Please try again later.`;
    }
  } else {
    return "\n\nPlease set your Algorand address using the `/setaddress` command to receive rewards.";
  }
}

export { handleReward };