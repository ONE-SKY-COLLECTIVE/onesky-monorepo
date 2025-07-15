import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Onboarding from './(onboarding)/index';
import { SplashScreen } from '@/components/SplashScreen';

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);

  useEffect(() => {
    const initialize = async () => {
      await new Promise(res => setTimeout(res, 3000));

      const launchStatus = await SecureStore.getItemAsync("hasLaunched");

      if (launchStatus === null) {
        await SecureStore.setItemAsync("hasLaunched", "true");
        setHasLaunched(true);
      } else {
        setHasLaunched(false);
      }

      setIsSplashVisible(false);
    };

    initialize();
  }, []);

  if (isSplashVisible || hasLaunched === null) {
    return <SplashScreen />;
  }

  return hasLaunched
    ? <Onboarding />
    : <Redirect href={'/(tabs)/(home)'} />;
}
