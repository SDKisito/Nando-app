// Placeholder pour l'intégration Stripe
export const processPayment = async (amount, currency, cardDetails) => {
  // Implémenter l'appel à l'API Stripe ici
  console.log('Processing payment:', { amount, currency, cardDetails });
  return { success: true, transactionId: 'mock-transaction-id' };
};
