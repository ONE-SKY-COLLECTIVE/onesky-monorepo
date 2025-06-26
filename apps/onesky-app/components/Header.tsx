import icons from '@/lib/icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <View>
      <SafeAreaView edges={['top']} className="bg-[#C4EFF7]"></SafeAreaView>
      <View className="bg-[#C4EFF7] flex-row items-center py-4 px-5 rounded-b-[40px]">
        <TouchableOpacity onPress={() => router.back()}>
          <Image contentFit="contain" source={icons.arrow} style={style.arrow} />
        </TouchableOpacity>
        <Text className="sora text-[18px] font-semibold ml-2">{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  arrow: {
    height: 48,
    width: 30,
    marginInline: 8
  }
})
