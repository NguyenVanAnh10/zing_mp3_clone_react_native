export const showMinuteAndSecondFromSeconds = (sec: number): string => {
  let seconds: number | string = Math.floor(sec);
  if (!seconds) {
    return '00:00';
  }
  let munites: number | string = Math.floor(seconds / 60);
  const hours = Math.floor(munites / 60);

  if (hours > 0) {
    munites = munites - hours * 60;
  }
  if (munites > 0) {
    seconds = seconds - Number(munites) * 60;
  }
  munites = munites < 10 ? `0${munites}` : munites;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${munites}:${seconds}`;
};
