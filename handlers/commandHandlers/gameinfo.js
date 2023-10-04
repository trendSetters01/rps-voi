import { createGameInfoEmbed } from '../../embeds/index.js';

async function handleGameinfo(interaction) {
  const gameInfoEmbed = createGameInfoEmbed();
  await interaction.reply({ embeds: [gameInfoEmbed] });
}

export { handleGameinfo };
