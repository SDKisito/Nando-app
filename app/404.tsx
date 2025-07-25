// app/404.tsx
import { View, Text } from 'react-native';

export default function NotFound() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Page non trouvée</Text>
    </View>
  );
}
