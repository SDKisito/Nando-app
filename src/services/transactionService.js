import { db } from '@config/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const createTransaction = async (transactionData) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), transactionData);
    return { id: docRef.id, ...transactionData };
  } catch (error) {
    throw new Error('Erreur lors de la création de la transaction: ' + error.message);
  }
};

export const getTransactions = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'transactions'));
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(transaction => transaction.userId === userId);
  } catch (error) {
    throw new Error('Erreur lors de la récupération des transactions: ' + error.message);
  }
};
