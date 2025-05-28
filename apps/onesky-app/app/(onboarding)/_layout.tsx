// apps/app/_layout.tsx or apps/stack/_layout.tsx
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import '../global.css';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}
    />
  );
}
