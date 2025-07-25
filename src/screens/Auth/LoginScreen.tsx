import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@config/firebaseConfig';
import Button from '@components/Button';
import InputField from '@components/InputField';
import Header from '@components/Header';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('(tabs)');
    } catch (error) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Connexion" onBack={() => navigation.goBack()} />
      <View style={styles.form}>
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry
        />
        <Button title="Se connecter" onPress={handleLogin} />
        <Text style={styles.link} onPress={() => navigation.navigate('register')}>
          Pas de compte ? Inscrivez-vous
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  form: {
    paddingHorizontal: 20,
    gap: 16,
  },
  link: {
    color: '#1E90FF',
    textAlign: 'center',
    marginTop: 16,
  },
});
