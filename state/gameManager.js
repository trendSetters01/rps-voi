const ongoingGames = {};

function getOngoingGame(userId) {
  return ongoingGames[userId];
}

function setOngoingGame(userId, gameData) {
  ongoingGames[userId] = gameData;
}

function deleteOngoingGame(userId) {
  delete ongoingGames[userId];
}

export { getOngoingGame, setOngoingGame, deleteOngoingGame };
