import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
        <Tabs.Screen name="send" options={{ title: 'Envoyer' }} />
        <Tabs.Screen name="+not-found" options={{ href: null }} />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}