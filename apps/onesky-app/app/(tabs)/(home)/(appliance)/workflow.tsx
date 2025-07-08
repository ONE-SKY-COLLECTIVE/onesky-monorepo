import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { Image } from 'expo-image';

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
  }, [selectedOwnedAppliances, ownedAppliances]);

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
      router.replace('/(tabs)/(home)');
    }
  };

  const func = (text: string, appliances: MapitemType[], step: number) => (
    <View
      className={step === 2 ? 'flex-v gap-[22px] px-5 pt-3 mt-12' : 'flex-v gap-[22px] px-5 pt-3'}
    >
      <View className="flex-v gap-2">
        {/* <Text className="raleway text-[20px] font-bold">Keep vampire power at bay</Text> */}
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

          const count = appliances.length;
          let boxWd;
          if (count === 6) {
            boxWd = 'w-[47%]';
          } else if (count < 4) {
            boxWd = 'w-full';
          } else if (count === 4) {
            boxWd = index === 0 || index === 1 ? 'w-[47%]' : 'w-full';
          } else {
            boxWd = index === 0 || index === 1 || index === 2 || index === 3 ? 'w-[47%]' : 'w-full';
          }
          const listClass = isChecked
            ? 'flex-v item-appl-selected-bg justify-between items-evenly gap-3 p-3 px-[10px] mb-[12px] h-[180px] border border-[#a1ce3f] rounded-[12px]'
            : 'flex-v justify-between gap-3 p-3 px-[10px] mb-[12px] h-[180px] border border-[#a1ce3f] rounded-[12px]';
          return (
            <TouchableOpacity
              key={index}
              // className={listClass}
              className={step === 1 ? `${listClass} item-appliance` : `${listClass} ${boxWd}`}
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
                <Image source={item.uri} style={style.applImage} />
                <Text className="raleway font-semibold">{item.text}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-v gap-3">
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
      </View>
    </View>
  );

  return (
    <View className="h-full">
      {!remindMe || !remindMeLog ? (
        <ActivityIntroScreen
          mapData={mapData}
          title="Keep vampire power at bay"
          utility={() => router.replace('../(appliance)/workflow')}
          setCheckBox={setCheckedRemindMe}
          pageHeader={{
            title: 'Vampire Power',
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
              title="Keep Vampire Power at Bay"
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
                <Image source={icons.warning} style={style.warning} className="w-[40px] h-[40px]" />
                <Text className="text-[20px] font-semibold sora py-5">Don&apos;t leave us!</Text>
              </View>
              <Text className="text-[14px] raleway w-half">
                Don&apos;t leave without logging your unplugged appliances.
              </Text>
              <Image resizeMode="contain" source={icons.dontLeave} style={style.world} />

              <View>
                <TouchableOpacity
                  onPress={() => router.replace('/(tabs)/(home)')}
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

const style = StyleSheet.create({
  warning: {
    height: 40,
    width: 40,
  },
  world: {
    position: 'absolute',
    height: 110,
    width: 110,
    left: '75%',
    top: 20,
  },
  applImage: {
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
