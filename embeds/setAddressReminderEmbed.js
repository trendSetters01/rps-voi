import { EmbedBuilder } from "discord.js";

async function sendSetAddressReminderEmbed(interaction) {
  const pleaseSetAddressEmbed = new EmbedBuilder()
    .setColor(15277667)
    .setTitle('🚫 Algorand Address (Testnet)')
    .setDescription("Please set your Algorand address (on testnet) using the `/setaddress` command before playing.");

  await interaction.reply({ embeds: [pleaseSetAddressEmbed], ephemeral: true });
}

export { sendSetAddressReminderEmbed };
