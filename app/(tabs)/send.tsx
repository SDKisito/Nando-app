import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SendMoneyScreen = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [exchangeRate, setExchangeRate] = useState(655);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${fromCurrency}`
        );
        const data = await response.json();
        if (data.result === 'success') {
          setExchangeRate(data.conversion_rates[toCurrency] || 655);
        } else {
          throw new Error(data['error-type'] || 'Erreur inconnue');
        }
      } catch (error) {
        console.error('Erreur taux de change:', error);
        Alert.alert('Erreur', 'Impossible de récupérer le taux de change. Utilisation du taux par défaut.');
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  return (
    <View>
      <Text>Envoyer de l'argent</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={(value) => setFromCurrency(value)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="XOF" value="XOF" />
      </Picker>
      <Picker
        selectedValue={toCurrency}
        onValueChange={(value) => setToCurrency(value)}
      >
        <Picker.Item label="USD" value="USD" />
        <Picker.Item label="EUR" value="EUR" />
        <Picker.Item label="XOF" value="XOF" />
      </Picker>
      <Text>Taux de change: {exchangeRate}</Text>
    </View>
  );
};

export default SendMoneyScreen;
