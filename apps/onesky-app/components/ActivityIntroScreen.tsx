import React, { ReactElement, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { activityStarterStyles , MapitemType } from '../constants/AppliancesData';
import icons from '@/lib/icons';
import images from '@/lib/images';

interface ActivityIntroProps {
  mapData: MapitemType[];
  pageHeader: {
    title: string;
    mainImage: ImageSourcePropType;
  };
  title: string;
  setCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
  utility: () => void;
}

const ActivityIntroScreen: React.FC<ActivityIntroProps> = ({
  mapData,
  pageHeader,
  title,
  setCheckBox,
  utility,
}) => {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  return (
    <View className="h-full">
      <SafeAreaView className="h-full" edges={['bottom']}>
        <View className="flex-1">
          <View className="dashboard-header">
            <View className="flex items-end justify-between">
              <View className="flex items-center">
                <TouchableOpacity onPress={() => router.push('../(homepage)')}>
                  <Image source={icons.arrow} />
                </TouchableOpacity>
                <Text className="raleway text-[14px] font-semibold">{pageHeader.title}</Text>
              </View>
            </View>
          </View>
          <View className="w-full flex-1 items-center justify-center gap-y-11">
            <Image className="socket-image" source={pageHeader.mainImage} />
            <View className="flex-v w-[350px] gap-14">
              <View className="flex-v gap-4">
                <Text className="sora text-[20px] font-bold">{title}</Text>
                <View className="flex-v gap-6">
                  {mapData.map((d: MapitemType, id: number) => (
                    <View className="vamp-list" key={id}>
                      <Image source={d.uri} />
                      <Text
                        style={{ lineHeight: 18 }}
                        className="raleway flex-1 text-[14px] font-medium"
                      >
                        {d.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="flex-v gap-y-5">
                <View className="flex gap-3">
                  <Checkbox
                    style={activityStarterStyles.checkbox}
                    color="#A1CE3F"
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                  <Text style={{ lineHeight: 18 }} className="raleway w-80 text-[14px] font-medium">
                    Got it! No need to remind me again
                  </Text>
                </View>
                <View style={activityStarterStyles.container}>
                  <TouchableOpacity
                    style={activityStarterStyles.button}
                    // I need to add a onPress so it routes to appropriate page and selects the remindMe as well
                    onPress={() => {
                      if (isChecked) setCheckBox(true);
                      else setCheckBox(false);
                      utility();
                    }}
                  >
                    <Text
                      style={activityStarterStyles.buttonText}
                      className="raleway w-80 text-[14px] font-medium"
                    >
                      Get Started
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ActivityIntroScreen;
