import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@components/Header';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Accueil" />
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue sur Nando</Text>
        <Button
          title="Envoyer de l'argent"
          onPress={() => navigation.navigate('send')}
          style={styles.button}
        />
        <Button
          title="Historique des transactions"
          onPress={() => navigation.navigate('history')}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  button: {
    width: '100%',
  },
});
