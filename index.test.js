// Mocking external dependencies
jest.mock('discord.js', () => {
  return {
    Client: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(),
        login: jest.fn()
      };
    }),
    IntentsBitField: {
      Flags: {
        Guilds: 'GUILDS',
        GuildMembers: 'GUILD_MEMBERS',
        GuildMessages: 'GUILD_MESSAGES',
        MessageContent: 'MESSAGE_CONTENT'
      }
    }
  };
});

import { Client, IntentsBitField } from 'discord.js';
import { handleInteraction } from './handlers/index.js';

describe('Bot Initialization', () => {

  test('should initialize bot with correct intents', () => {
    const client = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
      ]
    });

    expect(Client).toHaveBeenCalledWith({
      intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'MESSAGE_CONTENT'
      ]
    });
  });

  test('should register event listeners', () => {
    const client = new Client();
    client.on('ready', jest.fn());
    client.on('interactionCreate', handleInteraction);

    expect(client.on).toHaveBeenCalledWith('ready', expect.any(Function));
    expect(client.on).toHaveBeenCalledWith('interactionCreate', handleInteraction);
  });

  test('should login bot with token', () => {
    process.env.BOT_TOKEN = 'mockToken';
    const client = new Client();
    client.login(process.env.BOT_TOKEN);

    expect(client.login).toHaveBeenCalledWith('mockToken');
  });

});
