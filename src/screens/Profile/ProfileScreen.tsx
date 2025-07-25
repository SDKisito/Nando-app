import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '@config/firebaseConfig';
import Header from '@components/Header';
import Button from '@components/Button';
import { theme } from '@config/theme';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Profil" />
      <View style={styles.content}>
        <Text style={styles.title}>Profil Utilisateur</Text>
        <Button title="Déconnexion" onPress={handleLogout} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});
