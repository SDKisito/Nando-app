import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@components/Header';
import { theme } from '@config/theme';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Header title="Historique des transactions" />
      <View style={styles.content}>
        <Text style={styles.title}>Historique</Text>
        <Text style={styles.text}>Fonctionnalité à implémenter : liste des transactions passées.</Text>
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
