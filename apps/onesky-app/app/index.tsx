import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import Onboarding from './(onboarding)/index';
import { SplashScreen } from '@/components/SplashScreen';

export default function Index() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
  useEffect(() => {
    const initialize = async () => {
      // Include this line of code to see how a first-time user will see the onboarding
      // await SecureStore.deleteItemAsync("hasLaunched");
      await new Promise(res => setTimeout(res, 8000));

      // const launchStatus = await SecureStore.getItemAsync("hasLaunched");
      // if (launchStatus === null) {
      //   await SecureStore.setItemAsync("hasLaunched", "true");
      //   setHasLaunched(true);
      // } else {
      //   setHasLaunched(false);
      // }
      // await SecureStore.deleteItemAsync("hasLaunched");
      setHasLaunched(true);
      setIsSplashVisible(false);
    };
    initialize();
  }, []);

  if (isSplashVisible || hasLaunched === null) {
    return <SplashScreen />;
  }
  return hasLaunched ? <Onboarding /> : <Redirect href={'/(tabs)/(home)'} />;
  // return (
  //   <>
  //     <SplashScreen />
  //     <Redirect href={'/(tabs)'} />
  //   </>
  // );
}
