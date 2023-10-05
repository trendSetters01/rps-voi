import { handleInvite } from './invite.js';

describe('handleInvite', () => {
  let mockInteraction;

  beforeEach(() => {
    mockInteraction = {
      reply: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should reply with the correct invite link', async () => {
    const expectedInviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1157322558966857808&permissions=17877801569345&scope=bot%20applications.commands';
    const expectedReply = `Click [here](${expectedInviteLink}) to invite the bot to your server!`;

    await handleInvite(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith(expectedReply);
  });
});
