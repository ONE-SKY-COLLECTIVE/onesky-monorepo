import React, { useEffect } from 'react';
import { Stack, useNavigation, usePathname } from 'expo-router';

const LayOut = () => {
  const pathname = usePathname();
  const navigation = useNavigation();

  useEffect(() => {
    const isHomeLandingPage = pathname === '/';
    navigation.setOptions({
      tabBarStyle: {
        display: isHomeLandingPage ? 'block' : 'none',
      },
      animationEnabled: false,
    });
  }, [pathname]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default LayOut;
