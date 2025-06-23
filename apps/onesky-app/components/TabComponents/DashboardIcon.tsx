import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

interface CustomTabIconProps {
  focused: boolean;
  size: number;
  activeIcon: string;
  inActiveIcon: string;
}

// Define your custom tab bar item component
const CustomTabIcon = ({ focused, size = 16, activeIcon, inActiveIcon }: CustomTabIconProps) => {
  const icon = focused ? activeIcon : inActiveIcon;

  return (
    <View>
      <Image source={icon} style={{ width: size, height: size }} contentFit="contain" />
    </View>
  );
};

export { CustomTabIcon };
