let userAddresses = {};

export function getUserAddress(userId) {
  return userAddresses[userId];
}

export function setUserAddress(userId, address) {
  userAddresses[userId] = address;
}
