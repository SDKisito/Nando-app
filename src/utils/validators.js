export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateCardNumber = (cardNumber) => {
  return /^\d{16}$/.test(cardNumber);
};

export const validateCardExpiry = (expiry) => {
  return /^\d{2}\/\d{2}$/.test(expiry);
};

export const validateCardCVC = (cvc) => {
  return /^\d{3}$/.test(cvc);
};
