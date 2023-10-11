import { Client, IntentsBitField } from "discord.js";
import { handleInteraction } from "./handlers/index.js";
import 'dotenv/config'

const token = process.env["BOT_TOKEN"];
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);
});

client.on("interactionCreate", handleInteraction);

client.login(token);
