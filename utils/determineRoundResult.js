export const CHOICES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
};

export const RESULTS = {
  DRAW: 'draw',
  USER: 'user',
  BOT: 'bot',
};

export function determineRoundResult(userChoice, botChoice) {
  if (userChoice === botChoice) return RESULTS.DRAW;

  if (
    (userChoice === CHOICES.ROCK && botChoice === CHOICES.SCISSORS) ||
    (userChoice === CHOICES.SCISSORS && botChoice === CHOICES.PAPER) ||
    (userChoice === CHOICES.PAPER && botChoice === CHOICES.ROCK)
  ) return RESULTS.USER;

  return RESULTS.BOT;
}
