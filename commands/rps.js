export default {
  name: "rps",
  description: "Play a game of Rock, Paper, Scissors!",
  options: [
    {
      name: "choice",
      type: 3,
      description: "Your choice for the game",
      required: true,
      choices: [
        { name: "Rock", value: "rock" },
        { name: "Paper", value: "paper" },
        { name: "Scissors", value: "scissors" },
      ],
    },
  ],
}
