import { determineRoundResult, CHOICES, RESULTS } from './index.js';

describe('determineRoundResult', () => {

  // Draw scenarios
  it('should return DRAW when both user and bot choose ROCK', () => {
    const result = determineRoundResult(CHOICES.ROCK, CHOICES.ROCK);
    expect(result).toBe(RESULTS.DRAW);
  });

  it('should return DRAW when both user and bot choose PAPER', () => {
    const result = determineRoundResult(CHOICES.PAPER, CHOICES.PAPER);
    expect(result).toBe(RESULTS.DRAW);
  });

  it('should return DRAW when both user and bot choose SCISSORS', () => {
    const result = determineRoundResult(CHOICES.SCISSORS, CHOICES.SCISSORS);
    expect(result).toBe(RESULTS.DRAW);
  });

  // User win scenarios
  it('should return USER when user chooses ROCK and bot chooses SCISSORS', () => {
    const result = determineRoundResult(CHOICES.ROCK, CHOICES.SCISSORS);
    expect(result).toBe(RESULTS.USER);
  });

  it('should return USER when user chooses PAPER and bot chooses ROCK', () => {
    const result = determineRoundResult(CHOICES.PAPER, CHOICES.ROCK);
    expect(result).toBe(RESULTS.USER);
  });

  it('should return USER when user chooses SCISSORS and bot chooses PAPER', () => {
    const result = determineRoundResult(CHOICES.SCISSORS, CHOICES.PAPER);
    expect(result).toBe(RESULTS.USER);
  });

  // Bot win scenarios
  it('should return BOT when user chooses ROCK and bot chooses PAPER', () => {
    const result = determineRoundResult(CHOICES.ROCK, CHOICES.PAPER);
    expect(result).toBe(RESULTS.BOT);
  });

  it('should return BOT when user chooses PAPER and bot chooses SCISSORS', () => {
    const result = determineRoundResult(CHOICES.PAPER, CHOICES.SCISSORS);
    expect(result).toBe(RESULTS.BOT);
  });

  it('should return BOT when user chooses SCISSORS and bot chooses ROCK', () => {
    const result = determineRoundResult(CHOICES.SCISSORS, CHOICES.ROCK);
    expect(result).toBe(RESULTS.BOT);
  });

});
