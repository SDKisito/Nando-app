import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@components/Header';
import { theme } from '@config/theme';

export default function ReceiveMoneyScreen() {
  return (
    <View style={styles.container}>
      <Header title="Recevoir de l'argent" />
      <View style={styles.content}>
        <Text style={styles.title}>Recevoir de l'argent</Text>
        <Text style={styles.text}>Fonctionnalité à implémenter : formulaire pour recevoir des fonds.</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: theme.colors.gray,
  },
});
