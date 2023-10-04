import { getOngoingGame, setOngoingGame, deleteOngoingGame } from './index.js';

describe('gameManager', () => {

  // Test data
  const userId = 'user123';
  const gameData = {
    status: 'ongoing',
    move: 'rock'
  };

  // Cleanup - ensure the ongoingGames object is clear before and after each test
  beforeEach(() => {
    deleteOngoingGame(userId);
  });

  afterAll(() => {
    deleteOngoingGame(userId);
  });

  test('should set and get an ongoing game', () => {
    setOngoingGame(userId, gameData);
    const retrievedGameData = getOngoingGame(userId);
    expect(retrievedGameData).toEqual(gameData);
  });

  test('should delete an ongoing game', () => {
    setOngoingGame(userId, gameData);
    deleteOngoingGame(userId);
    const retrievedGameData = getOngoingGame(userId);
    expect(retrievedGameData).toBeUndefined();
  });

  test('should return undefined for non-existent user', () => {
    const retrievedGameData = getOngoingGame('nonExistentUser');
    expect(retrievedGameData).toBeUndefined();
  });

  test('should handle delete for non-existent user gracefully', () => {
    expect(() => deleteOngoingGame('nonExistentUser')).not.toThrow();
  });

});
