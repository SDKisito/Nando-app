// app/index.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  useEffect(() => {
    router.replace('/(auth)/welcome');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redirection en cours...</Text>
    </View>
  );
}
