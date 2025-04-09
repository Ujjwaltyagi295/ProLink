export const thirtyDaysFromNow = () => {
  const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return date;
};
export const fifteenMinutesFromNow = () => {
  const date = new Date(Date.now() + + 15 * 60 * 1000);
  return date;
};

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;