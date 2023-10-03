import { EmbedBuilder } from "discord.js";

function createGameInfoEmbed() {
  return new EmbedBuilder()
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
}

export { createGameInfoEmbed };
