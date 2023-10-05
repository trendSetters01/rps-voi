import { handleSetaddress } from './setaddress.js';
import { setUserAddress } from '../../state/index.js';
import { createSetAddressEmbed } from '../../embeds/index.js';

jest.mock('../../state/index.js');
jest.mock('../../embeds/index.js');

describe('handleSetaddress', () => {
  let mockInteraction;

  beforeEach(() => {
    mockInteraction = {
      user: { id: 'mockUserId' },
      options: {
        getString: jest.fn()
      },
      reply: jest.fn()
    };

    jest.clearAllMocks();
  });

  it('should handle address setting correctly', async () => {
    // Setup
    const mockAddress = 'mockAddress';
    mockInteraction.options.getString.mockReturnValue(mockAddress);

    const mockEmbed = { title: 'Mock Embed' };
    createSetAddressEmbed.mockReturnValue(mockEmbed);

    // Act
    await handleSetaddress(mockInteraction);

    // Assert
    expect(setUserAddress).toHaveBeenCalledWith(mockInteraction.user.id, mockAddress);
    expect(mockInteraction.reply).toHaveBeenCalledWith({ embeds: [mockEmbed] });
  });
});
