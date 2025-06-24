import { router } from 'expo-router';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/lib/icons';
import React from 'react';
import { Image } from 'expo-image';

const Completion = ({ points, activityName }: { points: number; activityName: string }) => {
  // TODO: API to check user's total points, replace this
  const userPoints = 12020;
  const confettiAnimationRef = useRef<LottieView>(null);
  useEffect(() => {
    if (confettiAnimationRef.current) {
      confettiAnimationRef.current.play(0, 110);
    }
  }, []);
  return (
    <SafeAreaView className=" pt-4 flex-v h-full green-bg-50" edges={['top']}>
      <TouchableOpacity className="px-5" onPress={() => router.replace('/(tabs)/(home)')}>
        <Image contentFit="contain" className="h-[40px] w-[40px]" source={icons.xbutton} />
      </TouchableOpacity>
      <View className="flex-v justify-center flex-grow pb-20">
        <Text className="raleway text-[22px] font-bold text-center">Yay, Congratulations!</Text>
        <Image contentFit="contain" source={icons.quizDone} className="quiz-done" />
        <Text className="text-center mt-4 mb-8 gray-800">
          You have successfully completed {activityName}!
        </Text>
        <View className="flex items-center justify-center">
          <Image className="diamond-large" source={icons.diamond} />
          <Text className="raleway test-[16px] font-bold ml-2">{points} pts</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Completion;

const style = StyleSheet.create({
  xbutton: {
    height: 32,
    width: 32,
  },
  diamond: {
    height: 20,
    width: 20,
  },
  largeDiamond: {
    height: 40,
    width: 45,
    marginInline: 5,
  },
  quizDone: {
    marginTop: 40,
    width: 150,
    height: 180,
    alignSelf: 'center',
  },
  confettiAnimation: {
    height: 400,
    width: '100%',
    padding: 0,
    margin: 0,
    bottom: '-20%',
    left: '-10%',
    position: 'absolute',
    zIndex: 100,
  },
});
