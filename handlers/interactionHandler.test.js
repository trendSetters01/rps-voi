import { handleInteraction } from './index.js';

jest.mock('discord.js', () => ({
  Interaction: jest.fn(),
}));

// Mocking dynamic imports
global.import = jest.fn();

describe('handleInteraction', () => {
  let mockInteraction;
  let originalConsoleError;

  beforeEach(() => {
    mockInteraction = {
      isCommand: jest.fn(),
      commandName: '',
      reply: jest.fn(),
    };
    jest.clearAllMocks();
    originalConsoleError = console.error;
    console.error = jest.fn();  // Suppress console.error for these tests
  });

  afterEach(() => {
    console.error = originalConsoleError;  // Restore original console.error after each test
  });

  it('should reply with an error message for unknown commands', async () => {
    mockInteraction.isCommand.mockReturnValue(true);
    mockInteraction.commandName = 'unknownCommand';

    global.import.mockRejectedValueOnce(new Error('Module not found'));

    await handleInteraction(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith('Sorry, an error occurred. Please try again later.');
  });

  it('should handle errors during command processing', async () => {
    mockInteraction.isCommand.mockReturnValue(true);
    mockInteraction.commandName = 'errorCommand';

    global.import.mockRejectedValueOnce(new Error('Error during command processing'));

    await handleInteraction(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith('Sorry, an error occurred. Please try again later.');
  });
});
