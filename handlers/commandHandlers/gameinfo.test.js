import { handleGameinfo } from './gameinfo.js';
import { createGameInfoEmbed } from '../../embeds/index.js';

jest.mock('../../embeds/index.js');

describe('handleGameinfo', () => {
  let mockInteraction;

  beforeEach(() => {
    // Mock the interaction object
    mockInteraction = {
      reply: jest.fn(),
    };

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should reply to the interaction with the game info embed', async () => {
    // Given: The createGameInfoEmbed function returns a mocked embed
    const mockEmbed = { title: "Mocked Game Info Embed" };
    createGameInfoEmbed.mockReturnValue(mockEmbed);

    // When: handleGameinfo function is called
    await handleGameinfo(mockInteraction);

    // Then: The reply method of the interaction should be called with the mocked embed
    expect(mockInteraction.reply).toHaveBeenCalledWith({ embeds: [mockEmbed] });
  });
});
