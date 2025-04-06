export const thirtyDaysFromNow = () => {
  const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return date;
};
export const fifteenDaysFromNow = () => {
  const date = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  return date;
};
