// TODO: fix the tests.
import * as algorandModule from './algorand.js';

// Mock the SDK functions
const mockLookupAssetBalances = jest.fn();
const mockGetTransactionParams = jest.fn();
const mockSendRawTransaction = jest.fn();

jest.mock('algosdk', () => ({
  Algodv2: jest.fn().mockImplementation(() => ({
    getTransactionParams: mockGetTransactionParams,
    sendRawTransaction: mockSendRawTransaction,
  })),
  Indexer: jest.fn().mockImplementation(() => ({
    lookupAssetBalances: mockLookupAssetBalances,
  })),
  mnemonicToSecretKey: jest.fn(),
}));

describe.skip('Algorand functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.skip('calculateMultiplier', () => {
    it('should return expected multipliers', () => {
      expect(algorandModule.calculateMultiplier(0)).toBeCloseTo(1);
      expect(algorandModule.calculateMultiplier(10)).toBeCloseTo(1.72897, 5);
      expect(algorandModule.calculateMultiplier(100)).toBeCloseTo(1.97, 2);
      expect(algorandModule.calculateMultiplier(1000)).toBeCloseTo(2.47, 2);
    });
  });

  describe.skip('getUserTokenHolding', () => {
    it('should fetch user token holding', async () => {
      const mockResponse = {
        balances: [{ address: 'test_address', amount: 1000 }],
      };
      mockLookupAssetBalances.mockResolvedValue(mockResponse);

      const holding = await algorandModule.getUserTokenHolding('test_address');
      expect(holding).toBe(1000);
    });

    it('should return 0 if address not found', async () => {
      const mockResponse = {
        balances: [],
      };
      mockLookupAssetBalances.mockResolvedValue(mockResponse);

      const holding = await algorandModule.getUserTokenHolding('test_address');
      expect(holding).toBe(0);
    });
  });

  describe.skip('sendAsset', () => {
    it('should send asset correctly', async () => {
      const mockLookupResponse = {
        balances: [{ address: 'test_address', amount: 1000 }],
      };
      const mockTransactionResponse = {
        txId: 'test_transaction_id',
      };

      mockLookupAssetBalances.mockResolvedValue(mockLookupResponse);
      mockGetTransactionParams.mockResolvedValue({});
      mockSendRawTransaction.mockResolvedValue(mockTransactionResponse);

      const transactionId = await algorandModule.sendAsset('test_address', 100);
      expect(transactionId).toBe('test_transaction_id');
    });

    it('should handle error when sending asset', async () => {
      mockLookupAssetBalances.mockRejectedValue(new Error('Lookup failed'));
      await expect(algorandModule.sendAsset('test_address', 100)).rejects.toThrow('Error sending ASA');
    });
  });
});
