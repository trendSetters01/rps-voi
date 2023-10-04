import { getUserAddress, setUserAddress } from './userAddressManager.js';

describe('userAddressManager', () => {

  // Test data
  const userId = 'user123';
  const address = 'algorandAddress123';

  // Cleanup - Ensure the userAddresses object is clear before each test
  beforeEach(() => {
    setUserAddress(userId, undefined);
  });

  test('should set and get a user address', () => {
    setUserAddress(userId, address);
    const retrievedAddress = getUserAddress(userId);
    expect(retrievedAddress).toEqual(address);
  });

  test('should return undefined for non-existent user', () => {
    const retrievedAddress = getUserAddress('nonExistentUser');
    expect(retrievedAddress).toBeUndefined();
  });

});
