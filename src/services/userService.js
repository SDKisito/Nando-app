import { db } from '@config/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const updateUserProfile = async (userId, profileData) => {
  try {
    await setDoc(doc(db, 'users', userId), profileData, { merge: true });
    return profileData;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour du profil: ' + error.message);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Profil utilisateur non trouvé');
    }
  } catch (error) {
    throw new Error('Erreur lors de la récupération du profil: ' + error.message);
  }
};
