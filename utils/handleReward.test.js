import { handleReward } from './index.js';
import * as algorand from '../algorand/transactions.js';
import * as state from '../state/index.js';

jest.mock('../algorand/transactions.js');
jest.mock('../state/index.js');

describe('handleReward', () => {

  beforeEach(() => {
    // Reset all mock functions before each test
    jest.clearAllMocks();
  });

  it('should reward the user if they have set their address', async () => {
    state.getUserAddress.mockReturnValue('valid_address');
    algorand.sendAsset.mockResolvedValue(true);

    const result = await handleReward({ user: { id: '12345' } });
    expect(result).toBe("\n\nYou have been rewarded with PHTM tokens!");
  });

  it('should handle errors during the reward process', async () => {
    state.getUserAddress.mockReturnValue('valid_address');
    algorand.sendAsset.mockRejectedValue(new Error('Failed to send reward'));

    // Mock console.error to suppress the error logging just for this test
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const result = await handleReward({ user: { id: '12345' } });
    expect(result).toBe("\n\nThere was an issue rewarding you with PHTM tokens. Please try again later.");

    // Restore the original console.error function after the test
    errorSpy.mockRestore();
  });


  it('should prompt the user to set their address if not already set', async () => {
    state.getUserAddress.mockReturnValue(undefined);

    const result = await handleReward({ user: { id: '12345' } });
    expect(result).toBe("\n\nPlease set your Algorand address using the `/setaddress` command to receive rewards.");
  });

});
