import { getBotChoice, CHOICES } from './index.js';

describe('getBotChoice', () => {

  // Run the function multiple times to ensure randomness
  const results = Array(1000).fill(null).map(() => getBotChoice());

  it('should always return a valid choice', () => {
    results.forEach(choice => {
      expect(Object.values(CHOICES)).toContain(choice);
    });
  });

  it('should produce a somewhat even distribution of choices over many runs', () => {
    const rockCount = results.filter(choice => choice === CHOICES.ROCK).length;
    const paperCount = results.filter(choice => choice === CHOICES.PAPER).length;
    const scissorsCount = results.filter(choice => choice === CHOICES.SCISSORS).length;

    // This isn't a strict test of randomness, but over a large number of runs, 
    // we'd expect each choice to be chosen roughly a third of the time.
    expect(rockCount).toBeGreaterThan(250);
    expect(paperCount).toBeGreaterThan(250);
    expect(scissorsCount).toBeGreaterThan(250);
  });

});
