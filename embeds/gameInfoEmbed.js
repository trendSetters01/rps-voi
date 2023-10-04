import { EmbedBuilder } from "discord.js";

function createGameInfoEmbed() {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Rock, Paper, Scissors (Testnet) - Game Info')
    .setDescription('Welcome to Rock, Paper, Scissors on the Algorand Testnet! Here\'s how to play and earn rewards:')
    .addFields(
      {
        name: '1. Set Your Algorand Address',
        value: 'Before you start, set your Algorand address using the `/setaddress` command. This is where we\'ll send your rewards.'
      },
      {
        name: '2. Start the Game',
        value: 'Initiate a game with the `/rps` command followed by your choice: rock, paper, or scissors. The bot will also make a choice.'
      },
      {
        name: '3. Understand the Outcomes',
        value: 'If both you and the bot make the same choice, it\'s a draw. Otherwise, rock beats scissors, scissors beats paper, and paper beats rock.'
      },
      {
        name: '4. Play Three Rounds',
        value: 'Each game consists of three rounds. Your goal is to win at least two out of the three rounds.'
      },
      {
        name: '5. Earn Rewards',
        value: 'If you win the majority of the rounds, you\'ll be rewarded with PHTM tokens. Ensure you\'ve opted-in for the token on the Algorand Testnet.'
      },
      {
        name: '🔶 Important Notice',
        value: 'All gameplay and transactions occur on the Algorand testnet. Tokens and transactions are for testing purposes and have no real-world value.'
      }
    );
}

export { createGameInfoEmbed };
