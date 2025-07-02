import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '@/components/Progressbar';
import Completion from '@/components/Completion';
import icons from '@/lib/icons';
import { Image } from 'expo-image';
import Header from '@/components/Header';
import images from '@/lib/images';
import Button from '@/components/Button';
import ConfirmExit from '@/components/ConfirmExit';
import getUserRefills from '@/api/getUserRefills';

const Waterbottle = () => {
  const refillAnimationRef = useRef<LottieView>(null);
  const [refillNum, setRefillNum] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [collectPoints, setCollectPoints] = useState(false);
  const router = useRouter();
  const [exitWithoutRefilling, setExitWithoutRefilling] = useState(false);
  const [acknowledged, setAcknowledge] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [checked, setChecked] = useState(false);
  const [totalRefills, setTotalRefills] = useState(0);

  // TODO: redo the logic for updating user refills to backend when api comes
  useEffect(() => {
    const backendRefills = getUserRefills(totalRefills);
    setTotalRefills(backendRefills.userRefills);
  }, [])

  const dailyGoal = 7;
  const handleRefillConfirm = () => {
    setTotalRefills(totalRefills + refillNum);
    setRefillNum(0);
    if (refillAnimationRef.current) {
      refillAnimationRef.current.play(0, 43);
    }
    setConfirm(true);
  };

  if (collectPoints) {
    return <Completion points={50} activityName="the refill activity" />;
  }

  if (acknowledged) {
    return (
      <SafeAreaView className='h-[100vh]' edges={['bottom']}>
        <Header title='Water Refill'/>
        <Image contentFit="contain" source={images.refillImage} style={styles.refillImage} alt="picture of waterbottle"></Image>
        <Text className='text-[20px] font-semibold py-3 px-4'>Refill for a better planet</Text>
        <View className='flex-col w-full px-4'>
          <View className='flex items-center my-3'>
            <Image contentFit='contain' source={icons.refillBottle} style={styles.icon} alt="bottle"></Image>
            <Text className='text-[13px] flex-shrink w-0 flex-grow'>Help reduce plastic waste by using your reusable water bottles</Text>
          </View>
          <View className='flex items-center my-3'>
            <Image contentFit='contain' source={icons.refillStar} style={styles.icon} alt="star"></Image>
            <Text className='text-[13px] flex-shrink w-0 flex-grow'>Complete 7 refills daily to earn maximum points</Text>
          </View>
          <View className='flex items-center my-3'>
            <Image contentFit='contain' source={icons.refillGroup} style={styles.icon} alt="group"></Image>
            <Text className='text-[13px] flex-shrink w-0 flex-grow'>Join the One Sky community in making a difference for our environment</Text>
          </View>
        </View>
        <View className='grow flex-col-reverse pb-5 px-4'>
          <Button title='Get Started' utility={() => setAcknowledge(false)}/>
          <View className='flex'>
            <Pressable
              onPress={() => setChecked(!checked)}
              className={`h-6 w-6 items-center justify-center rounded-md border ${
                checked ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'
                }`}
              >
                {checked && <Text className="text-white font-bold">✓</Text>}
            </Pressable>
            <Text className='text-[16px] mb-5 ml-3 text-[#171717] font-light'>Got it! No need to remind me again</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View className="waterbottle-page">
      <SafeAreaView className="h-full" edges={['top', 'bottom']}>
        <ProgressBar
          progression={totalRefills}
          numProgressions={7}
          points={50}
          utility={() => setConfirmation(true)}
        />
        <View className="refill-animation-div">
          <LottieView
            ref={refillAnimationRef}
            source={require('@/assets/animations/RefillAnimation1.json')}
            style={styles.refillAnimation}
            autoPlay={false}
            loop={false}
          />
        </View>
        {!confirmation ? (
          <View className={`${confirm ? 'refill-div-confirm' : ''} refill-div `}>
            <View className={`${confirm ? "bg-[#D8F5FA]" : 'bg-[#FFF6E5]'} rounded-[100px] p-3 text-[12px] fit-width self-start`}>
              <Text className={`${confirm ? 'text-[#3F5C61]' : 'text-[#D68F0E]'}`}>{totalRefills} bottles filled today</Text>
            </View>
            <View className='flex justify-between w-full'>
              <View className='w-[60%]'>
                <Text className="text-[20px] font-semibold sora py-5">
                  {!confirm
                    ? 'How many bottles do you have'
                    : totalRefills >= dailyGoal
                      ? "You're Amazing!"
                      : 'Good job!'}
                </Text>
                <Text className="text-[14px] raleway">
                  {!confirm
                    ? 'With every refill, you take a step toward a greener planet.'
                    : totalRefills >= dailyGoal
                      ? "Today's activity is complete!\nCome back tomorrow to keep saving the planet."
                      : 'Keep up the great work!'}
                </Text>
                {confirm && (totalRefills < dailyGoal) && <Text className='mt-5'>Can’t finish all? No worries—you’ll still get <Text className='font-semibold'>{dailyGoal - totalRefills}</Text> points when you return tomorrow.</Text>}
              </View>
              {confirm && (
              <Image
                contentFit="contain"
                source={totalRefills !== dailyGoal ? icons.refillConfirm : icons.refillFinished}
                style={styles.refillCelebration}
                alt="refill celebration image"
              />
            )}
            </View>
            
            
            {!confirm && (
              <View className="flex justify-between mt-8 mb-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`py-3 px-4 rounded-[8px] ${index >= 7 - totalRefills ? 'bg-[#E8EAEB] border-[#E5E5E5]' : 'border-1'} ${refillNum >= index + 1 && 'green-bg-50'}`}
                    onPress={() => setRefillNum(index + 1)}
                    disabled={index >= 7 - totalRefills}
                  >
                    <Text>{index + 1}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {!confirm ? (
              <TouchableOpacity
                onPress={handleRefillConfirm}
                disabled={refillNum <= 0}
                className={`w-full py-3 rounded-[8px] ${refillNum <= 0 ? 'opacity-50 disabled-bg' : 'green-bg-500'}`}
              >
                <Text className="text-center">Confirm refill</Text>
              </TouchableOpacity>
            ) : (
              <View>
                {totalRefills >= dailyGoal ? (
                  <TouchableOpacity
                    onPress={() => setCollectPoints(true)}
                    className="green-bg-500 rounded-[8px] py-3 mb-2 mt-8"
                  >
                    <Text className="text-center">Collect your points</Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => router.replace('../(tabs)')}
                      className="border-1 rounded-[8px] py-3 mb-2 mt-5 bg-[#ffffff]"
                    >
                      <Text className="text-center">Go to home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setConfirm(false)}
                      className="green-bg-500 w-full py-3 rounded-[8px] mt-2"
                    >
                      <Text className="text-center">Refill another bottle</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <ConfirmExit utility={() => setConfirmation(false)}/>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  refillAnimation: {
    height: 400,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  confettiAnimation: {
    height: 400,
    width: '100%',
    padding: 0,
    margin: 0,
    bottom: '30%',
    left: '10%',
    position: 'absolute',
    zIndex: -1000,
  },
  refillImage: {
    height: 300,
    width: 250,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  refillCelebration: {
    height: 130,
    width: 130,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10
  }
});

export default Waterbottle;
