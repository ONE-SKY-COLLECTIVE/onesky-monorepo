import icons from '@/lib/icons';
import { Image } from 'expo-image';
import React, { useRef, useEffect } from 'react';
import { Dimensions, Animated, Easing, View, StyleSheet } from 'react-native';

export const SplashScreen = () => {
  const { width } = Dimensions.get('window');
  const cloudPosition = useRef(new Animated.Value(width)).current;
  const cloudPosition2 = useRef(new Animated.Value(width)).current;
  const cloudPosition3 = useRef(new Animated.Value(width)).current;
  const cloudPosition4 = useRef(new Animated.Value(width)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCloud = () => {
      cloudPosition.setValue(width);

      Animated.timing(cloudPosition, {
        toValue: -200,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    const animateCloudOthers = () => {
      cloudPosition2.setValue(width);
      cloudPosition3.setValue(width);
      cloudPosition4.setValue(width);

      Animated.timing(cloudPosition2, {
        toValue: -50,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition3, {
        toValue: 300,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.timing(cloudPosition4, {
        toValue: -50,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start();

    animateCloud();
    setTimeout(() => {
      animateCloudOthers();
    }, 2000);
  }, [cloudPosition, cloudPosition2, cloudPosition3, cloudPosition4, fadeAnim, width]);

  return (
    <View className="h-full w-full blue-bg-300 p-4">
      <Animated.View style={{ opacity: fadeAnim }} className="self-center my-auto">
        <Image source={icons.oneskylogo} className="self-center my-auto" style={style.logo} contentFit='contain' alt="Company Logo"/>
      </Animated.View>
      <View className="absolute top-[350px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition }] }}>
          <Image source={icons.cloud1} contentFit="contain" style={style.cloud1} alt="cloud"/>
        </Animated.View>
      </View>
      <View className="absolute top-[220px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
          <Image source={icons.cloud2} contentFit="contain" style={style.cloud2} alt="cloud"/>
        </Animated.View>
      </View>
      <View className="absolute top-[250px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition3 }] }}>
          <Image source={icons.cloud3} contentFit="contain" style={style.cloud3} alt="cloud"/>
        </Animated.View>
      </View>
      <View className="absolute top-[600px]">
        <Animated.View style={{ transform: [{ translateX: cloudPosition2 }] }}>
          <Image source={icons.cloud2} contentFit="contain" style={style.cloud1} alt="cloud"/>
        </Animated.View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  logo: {
    height: 70,
    width: 150
  },
  cloud1: {
    height: 100,
    width: 200
  },
  cloud2: {
    height: 80,
    width: 200
  },
  cloud3: {
    height: 120,
    width: 250,
  }
})