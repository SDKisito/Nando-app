import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '@components/Button';
import { theme } from '@config/theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Nando</Text>
      <Text style={styles.subtitle}>Envoyez et recevez de l'argent facilement !</Text>
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('login')}
        style={styles.button}
      />
      <Button
        title="S'inscrire"
        onPress={() => navigation.navigate('register')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.gray,
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
});
