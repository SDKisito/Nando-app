import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/Auth/LoginScreen';
import RegisterScreen from '@screens/Auth/RegisterScreen';
import HomeScreen from '@screens/Main/HomeScreen';
import SendMoneyScreen from '@screens/Main/SendMoneyScreen';
import HistoryScreen from '@screens/Main/HistoryScreen';
import ProfileScreen from '@screens/Profile/ProfileScreen';
import { theme } from '@config/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'send') iconName = 'send';
          else if (route.name === 'history') iconName = 'time';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray,
      })}
    >
      <Tab.Screen name="index" component={HomeScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="send" component={SendMoneyScreen} options={{ title: 'Envoyer' }} />
      <Tab.Screen name="history" component={HistoryScreen} options={{ title: 'Historique' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="(tabs)" component={TabNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ConfirmationScreen"
        component={({ route }) => (
          <View style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}>
            <Header title="Confirmation" onBack={() => route.navigation.goBack()} />
            <Text style={{ fontSize: 18, color: theme.colors.text }}>
              Transaction confirmée : {route.params.amount} {route.params.recipient.name}
            </Text>
          </View>
        )}
      />
    </Stack.Navigator>
  );
}
