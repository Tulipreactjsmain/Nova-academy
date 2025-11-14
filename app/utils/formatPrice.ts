export const formatNigerianPrice = (amount: number | undefined): string => {
  if (amount === undefined) return "N0.00";
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
    .replace('NGN', 'N'); // Replace NGN with N for shorter display
}; 