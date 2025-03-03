function compareWithCurrentTime(time) {
  const currentTime = new Date();
  const checkTime = new Date(time);

  return currentTime < checkTime;
}

module.exports = compareWithCurrentTime;
