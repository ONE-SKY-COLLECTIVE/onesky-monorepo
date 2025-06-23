import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import icons from '@/lib/icons';
import React from 'react';
import { Image } from 'expo-image';

interface ActivityBoxProps {
  title: string;
  id: string;
  event?: boolean;
  inactive?: boolean;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderColor: '#D9EBB2',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    width: '48%',
    height: 139,
    position: 'relative',
  },
});
const ActivityBox: React.FC<ActivityBoxProps> = ({ title, id, event, inactive }) => {
  const router = useRouter();
  const iconTracker = {
    Quiz: icons.quiz,
    'Log your meal': icons.logMeal,
    'Water refill': icons.waterRefill,
    'View to plant': icons.viewPlant,
    Steps: icons.steps,
    'View more...': icons.viewMore,
    'Switch-off': icons.switchOff,
    Recycle: icons.recycle,
    'Donate/resell': icons.donate,
    'Buy second hand': icons.shop,
    'More coming soon': icons.comingSoon,
    'Attend a Beach Clean': icons.clean,
    'Organise a Beach Clean': icons.organize,
    'Download Refill App': icons.refillApp,
    'Download Vinted/Depop App': icons.vintedApp,
    'Join a sustainability or a Vegan group': icons.apple,
  };
  return (
    <Pressable
      style={styles.card}
      disabled={inactive}
      className={`${title !== 'More coming soon' ? 'green-bg-50' : 'gray-bg'} ${inactive && 'opacity-50'}`}
      onPress={() => title !== 'More coming soon' && router.push(`../${id}` as any)}
    >
      {title !== 'More coming soon' && title !== 'View more...' && (
        <View className="activity-points">
          <Image contentFit="contain" className="diamond-small" source={icons.diamond} />
          <Text className="text-[11px] font-semibold">+50 pts</Text>
        </View>
      )}
      <View className="flex-v">
        <Image
          contentFit="contain"
          className="h-[65px]"
          source={iconTracker[title as keyof typeof iconTracker]}
        />
        <Text className="raleway mt-2 font-semibold">{title}</Text>
        {title !== 'More coming soon' && title !== 'View more...' && !event && (
          <View className="flex">
            <View className="progress-bar" />
            <Text className="raleway ml-2 text-[10px]">0 / 5</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ActivityBox;
