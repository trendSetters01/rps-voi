const choices = ["rock", "paper", "scissors"];


function getBotChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

export { getBotChoice };