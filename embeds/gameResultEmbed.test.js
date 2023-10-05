import { createGameResultEmbed } from './gameResultEmbed.js';

// Mock external dependencies
jest.mock('../state/index.js', () => ({
  deleteOngoingGame: jest.fn()
}));

jest.mock('../utils/handleReward.js', () => ({
  handleReward: jest.fn().mockResolvedValue('Mock Reward')
}));

describe('createGameResultEmbed', () => {
  let mockInteraction;

  beforeEach(() => {
    mockInteraction = {
      user: {
        id: 'mockUserId',
        displayAvatarURL: jest.fn().mockReturnValue('mockAvatarURL')
      }
    };
  });

  it('should handle a draw scenario', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'rock', 'draw', { score: [0, 0], roundsPlayed: 0 });
    expect(embed.description).toEqual('🔶 This round is a draw!');
  });

  it('should handle user winning a round', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'scissors', 'user', { score: [0, 0], roundsPlayed: 0 });
    expect(embed.description).toEqual('✅ You win this round!');
  });

  it('should handle bot winning a round', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'paper', 'bot', { score: [0, 0], roundsPlayed: 0 });
    expect(embed.description).toEqual('❌ You lose this round!');
  });

  it('should handle user winning the best of three', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'scissors', 'user', { score: [1, 0], roundsPlayed: 2 });
    expect(embed.title).toEqual('🎉 Game Over!');
    expect(embed.description).toEqual("🎖 You've won the best of three! Congratulations!");
    expect(embed.fields[2].value).toEqual('Mock Reward');
  });

  it('should handle bot winning the best of three', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'paper', 'bot', { score: [0, 1], roundsPlayed: 2 });
    expect(embed.title).toEqual('🎉 Game Over!');
    expect(embed.description).toEqual("😢 You've lost the best of three. Try again!");
  });

  it('should handle a draw in the best of three', async () => {
    const embed = await createGameResultEmbed(mockInteraction, 'rock', 'rock', 'draw', { score: [1, 1], roundsPlayed: 2 });
    expect(embed.title).toEqual('🎉 Game Over!');
    expect(embed.description).toEqual("🔶 It's a draw in the best of three!");
  });
});
