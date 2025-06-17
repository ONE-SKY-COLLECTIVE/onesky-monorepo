import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import images from '../../lib/images';
import icons from '../../lib/icons';
import React from 'react';
import { Image } from 'expo-image';

const Onboarding = () => {
  const onboardingData = [
    {
      image: images.onboarding1,
      title: 'Our planet needs us',
      description:
        'One small step at a time, one person at a time. Collectively, we can make a difference.',
      buttonText: 'Next',
    },
    {
      image: images.onboarding2,
      title: 'Take action & earn rewards',
      description:
        'Walk, cycle, ditch plastic waste and make living sustainable a habit. Get rewarded for your efforts',
      buttonText: 'Next',
    },
    {
      image: images.onboarding3,
      title: 'Build a greener future',
      description: 'Start your journey, shop sustainably and track your achievements.',
      buttonText: 'I want to make an impact',
    },
  ];

  const { height, width } = Dimensions.get('window');
  const router = useRouter();
  const [onboardingProgress, setOnboardingProgress] = useState(1);
  const currentStep = onboardingData[onboardingProgress - 1];

  if (!currentStep) {
    // Fallback for invalid progress values
    router.replace('/(auth)/login');
    return null;
  }

  const handleNext = () => {
    if (onboardingProgress < 3) {
      setOnboardingProgress(onboardingProgress + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  return (
    <SafeAreaView className="blue-bg-300" edges={['top']}>
      <Stack.Screen options={{ title: 'Onboarding Page' }} />
      <View className="blue-bg-300 entire-screen flex-v">
        <Image source={icons.oneskylogo} className="self-center my-12" />
        <Image
          resizeMode="contain"
          source={currentStep.image}
          className="absolute"
          style={{ width: width, height: height, bottom: 80 }}
        />
        <View className="h-[30vh] grow white-bg w-full rounded-tr-[36px] rounded-tl-[36px] p-10 flex-v items-cente absolute bottom-0">
          <Text className="text-[22px] my-3 font-semibold text-center">{currentStep.title}</Text>
          <Text className="text-center text-[13px] my-2 gray-600 font-light">
            {currentStep.description}
          </Text>
          <TouchableOpacity onPress={handleNext} className="green-bg-500 w-full rounded-[8px] my-2">
            <Text className="text-center p-3">{currentStep.buttonText}</Text>
          </TouchableOpacity>
          {onboardingProgress < 3 && (
            <TouchableOpacity
              onPress={() => router.replace('../(tabs)')}
              className="w-full rounded-[8px]"
            >
              <Text className="text-center p-3 mt-2">Skip</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
