export const formatIDRToNumber = (amount): number => {
  if (amount) return parseFloat(amount.replace(/\D/g, ""));
  return 0;
};
