const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };
export const getCurrencySymbol = (currencyCode) => {
    return currencySymbols[currencyCode] || currencyCode;
};
  
  