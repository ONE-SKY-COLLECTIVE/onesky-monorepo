import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';

// Define your custom tab bar item component
const CustomTabIcon = ({ focused, size = 16, activeIcon, inActiveIcon }) => {
  const icon = focused ? activeIcon : inActiveIcon;

  return (
    <View>
      <Image source={icon} style={{ width: size, height: size }} contentFit="contain" />
    </View>
  );
};

export { CustomTabIcon };
