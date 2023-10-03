import { REST, Routes } from 'discord.js';
import rps from './rps.js';
import setAddress from './setAddress.js';
import invite from './invite.js';
import gameInfo from './gameInfo.js';

const token = process.env["BOT_TOKEN"];
const clientID = process.env["CLIENT_ID"];

const commands = [
  rps,
  setAddress,
  invite,
  gameInfo
];

const rest = new REST({
  version: "10",
}).setToken(token);

(async () => {
  try {
    console.log("Registering global slash commands");
    await rest.put(Routes.applicationCommands(clientID), {
      body: commands,
    });
    console.log("Slash commands were registered succesfully");
  } catch (error) {
    console.log(`${error}`);
  }
})();

