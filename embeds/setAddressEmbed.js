import { EmbedBuilder } from "discord.js";

function createSetAddressEmbed(address) {
  return new EmbedBuilder()
    .setColor(15548997)
    .setTitle('Algorand Address (Testnet)')
    .setImage('attachment://discordjs.png')
    .setDescription(`Your Algorand address (on testnet) has been set to ${address}\n\nPlease ensure you have opted-in for the PHTM token ( Asset ID 402192759 ) to receive rewards!.`);
}

export { createSetAddressEmbed };
