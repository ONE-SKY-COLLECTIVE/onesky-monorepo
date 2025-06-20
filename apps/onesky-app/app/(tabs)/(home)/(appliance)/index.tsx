import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import {
  MapitemType,
  applianceList,
  mapData,
  unplugAppliancesStyles,
} from '@/constants/AppliancesData';
import Completion from '@/components/Completion';
import ProgressBar from '@/components/Progressbar';
import images from '@/lib/images';
import icons from '@/lib/icons';
import ActivityIntroScreen from '@/components/ActivityIntroScreen';
import LottieView from 'lottie-react-native';

const Appliance = () => {
  const router = useRouter();
  const confettiAnimationRef = useRef<LottieView>(null);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(
    applianceList.some(item => checkedItems[item.id] === true)
  );
  const [allSelected, setAllSelected] = useState<boolean>(
    applianceList.every(item => checkedItems[item.id] === true)
  );

  const [progressBarLength, setProgressBarLength] = useState<number>(1);

  const [ownedAppliances, setOwnedAppliances] = useState<MapitemType[]>([]);

  const [selectedOwnedAppliances, setSelectedOwnedAppliances] = useState<{
    [key: number]: boolean;
  }>({});
  const [remindMe, setRemindMe] = useState<boolean>(false);
  const [remindMeLog, setRemindMeLog] = useState<boolean>(false);

  const [barProgression, setBarProgression] = useState<number>(0);

  const [points, setPoints] = useState<number>(0);

  const [completed, setCompleted] = useState<boolean>(false);

  const [checkedRemindMe, setCheckedRemindMe] = useState<boolean>(false);

  const [exitWithoutCompletion, setExitWithoutCompletion] = useState<boolean>(false);
  useEffect(() => {
    const checkRemindMeLog = () => {
      try {
        setRemindMe(!!SecureStore.getItem('remindMeAppliancesLog'));
      } catch (error) {
        console.error('Error reading from SecureStore:', error);
      }
    };
    checkRemindMeLog();
  }, []);

  useEffect(() => {
    if (confettiAnimationRef.current) {
      confettiAnimationRef.current.play(110, 110);
    }
  }, []);

  useEffect(() => {
    if (checkedRemindMe) {
      try {
        SecureStore.setItem('remindMeAppliancesLog', 'true');
      } catch (error) {
        console.error('Error saving to SecureStore:', error);
      }
    }
    setRemindMeLog(true);
  }, [checkedRemindMe, setCheckedRemindMe]);

  useEffect(() => {
    setIsButtonDisabled(!applianceList.some(item => checkedItems[item.id] === true));
    setAllSelected(applianceList.every(item => checkedItems[item.id] === true));
  }, [checkedItems]);

  useEffect(() => {
    setIsButtonDisabled(!ownedAppliances.some(item => selectedOwnedAppliances[item.id] === true));
    setAllSelected(ownedAppliances.every(item => selectedOwnedAppliances[item.id] === true));
    setBarProgression(
      ownedAppliances.filter(item => selectedOwnedAppliances[item.id] === true).length
    );
    setPoints(ownedAppliances.filter(item => selectedOwnedAppliances[item.id] === true).length * 2);
  }, [selectedOwnedAppliances]);

  useEffect(() => {
    setProgressBarLength(ownedAppliances.length);
  }, [ownedAppliances]);

  if (completed) {
    return (
      <Completion points={points} activityName="switching off lights and unplugging appliances!" />
    );
  }

  const handleExitWithoutCompletion = () => {
    if (!completed) {
      setExitWithoutCompletion(true);
    } else {
      router.push('../(homepage)');
    }
  };

  const func = (text: string, appliances: MapitemType[], step: number) => (
    <View
      className={step === 2 ? 'flex-v gap-[22px] px-5 pt-3 mt-12' : 'flex-v gap-[22px] px-5 pt-3'}
    >
      <View className="flex-v gap-2">
        <Text className="raleway text-[20px] font-bold">Keep vampire power at bay</Text>
        <Text className="raleway pr-5 text-[14px] font-medium" numberOfLines={3}>
          {text}
        </Text>
      </View>
      <View className="-mx-[10px] flex-row flex-wrap gap-x-5 px-3">
        {appliances.map((item, index) => {
          const isChecked: boolean =
            step === 1
              ? (checkedItems[item.id] ?? false)
              : (selectedOwnedAppliances[item.id] ?? false);
          const listClass = isChecked
            ? 'flex-v item-appliance-selected justify-between items-evenly gap-3 p-3 w-1/2 px-[10px] mb-[12px]'
            : 'flex-v item-appliance justify-between gap-3 p-3 w-1/2 px-[10px] mb-[12px]';
          return (
            <TouchableOpacity
              key={index}
              className={listClass}
              onPress={() => {
                if (step === 1) {
                  setCheckedItems(prev => ({
                    ...prev,
                    [item.id]: !isChecked,
                  }));
                } else {
                  setSelectedOwnedAppliances(prev => ({
                    ...prev,
                    [item.id]: !isChecked,
                  }));
                }

                setIsButtonDisabled(false);
              }}
            >
              <Checkbox
                style={unplugAppliancesStyles.checkbox}
                color={isChecked ? '#A1CE3F' : '#E7E5E4'}
                value={isChecked}
                onValueChange={val => {
                  if (step === 1) {
                    setCheckedItems(prev => ({
                      ...prev,
                      [item.id]: val,
                    }));
                  } else {
                    setSelectedOwnedAppliances(prev => ({
                      ...prev,
                      [item.id]: val,
                    }));
                  }
                }}
              />
              <View className="flex-v items-center gap-3">
                <Image source={item.uri} />
                <Text className="raleway font-semibold">{item.text}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-v gap-3 ">
        <TouchableOpacity
          style={unplugAppliancesStyles.selectbutton}
          onPress={() => {
            const newChecked: { [key: string]: boolean } = {};
            appliances.forEach(item => {
              newChecked[item.id] = true;
            });
            if (step === 1) setCheckedItems(newChecked);
            else setSelectedOwnedAppliances(newChecked);
            setAllSelected(true);
          }}
        >
          <Text
            style={
              allSelected
                ? unplugAppliancesStyles.allSelectedButtonText
                : unplugAppliancesStyles.selectbuttonText
            }
            className="raleway w-80 text-[14px] font-medium"
          >
            Select All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isButtonDisabled}
          style={
            isButtonDisabled ? unplugAppliancesStyles.disabledButton : unplugAppliancesStyles.button
          }
          onPress={() => {
            if (step === 1) {
              setOwnedAppliances(applianceList.filter(item => checkedItems[item.id] === true));
            } else {
              setCompleted(true);
              if (confettiAnimationRef.current) {
                confettiAnimationRef.current.play(0, 110);
              }
            }
          }}
        >
          <Text
            style={
              isButtonDisabled
                ? unplugAppliancesStyles.disabledButtonText
                : unplugAppliancesStyles.buttonText
            }
            className="raleway w-80 text-[14px] font-medium"
          >
            Submit
          </Text>
        </TouchableOpacity>
        {/* {step === 2 && completed && (
          <LottieView
            ref={confettiAnimationRef}
            source={require('@/assets/animations/ConfettiAnimation.json')}
            style={unplugAppliancesStyles.confettiAnimation}
            autoPlay={true}
            loop={false}
          />
        )} */}
      </View>
    </View>
  );

  return (
    <View className="h-full">
      {!remindMe || !remindMeLog ? (
        <ActivityIntroScreen
          mapData={mapData}
          title="Keep campire power at bay"
          utility={() => router.push('../(appliance)')}
          setCheckBox={setCheckedRemindMe}
          pageHeader={{
            title: 'Appliances Off',
            mainImage: images.applianceStartedMain,
          }}
        />
      ) : (
        <SafeAreaView className="h-full" edges={['top', 'bottom']}>
          <View className="h-[64px]">
            <ProgressBar
              progression={barProgression}
              numProgressions={progressBarLength}
              points={points}
              utility={handleExitWithoutCompletion}
            />
          </View>
          <ScrollView className="flex-1 pb-9">
            {ownedAppliances.length > 0
              ? func(
                  'Turn off or unplug all these appliances at home or in office. ',
                  ownedAppliances,
                  2
                )
              : func(
                  'Do you have any of these appliances that you can turn off or unplug from the power grid at home or in office?',
                  applianceList,
                  1
                )}
          </ScrollView>
          {exitWithoutCompletion && (
            <View className="refill-div">
              <View className="flex items-center">
                <Image resizeMode="contain" source={icons.warning} className="w-[40px] h-[40px]" />
                <Text className="text-[20px] font-semibold sora py-5">Don&apos;t leave us!</Text>
              </View>
              <Text className="text-[14px] raleway w-half">
                Don&apos;t leave without logging your unplugged appliances.
              </Text>
              <Image
                resizeMode="contain"
                source={icons.leave}
                className="absolute h-[100px] w-[100px] left-3/4 top-[20px]"
              />

              <View>
                <TouchableOpacity
                  onPress={() => router.push('/(homepage)')}
                  className="border-2 rounded-[8px] py-3 mb-2 mt-8"
                >
                  <Text className="text-center">Quit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setExitWithoutCompletion(false);
                  }}
                  className="green-bg-500 w-full py-3 rounded-[8px] mt-2"
                >
                  <Text className="text-center">Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
};

export default Appliance;
