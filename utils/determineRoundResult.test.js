import { determineRoundResult } from './index.js';

describe('determineRoundResult', () => {

  it('should return "draw" when both user and bot choose ROCK', () => {
    const result = determineRoundResult('rock', 'rock');
    expect(result).toBe('draw');
  });

  it('should return "user" when user chooses ROCK and bot chooses SCISSORS', () => {
    const result = determineRoundResult('rock', 'scissors');
    expect(result).toBe('user');
  });

  // ... more tests for other combinations

});
