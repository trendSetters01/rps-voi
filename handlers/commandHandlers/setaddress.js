import { setUserAddress } from '../../state/index.js';
import { createSetAddressEmbed } from '../../embeds/index.js';

async function handleSetaddress(interaction) {
  const address = interaction.options.getString('address');
  setUserAddress(interaction.user.id, address);
  const setAddressEmbed = createSetAddressEmbed(address);
  await interaction.reply({ embeds: [setAddressEmbed] });
}

export { handleSetaddress };
