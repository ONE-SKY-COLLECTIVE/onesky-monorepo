import icons from "@/lib/icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC<{title: string}> = ({title}) => {
    const router = useRouter();
    return (
        <View>
            <SafeAreaView edges={['top']} className="bg-[#C4EFF7]"></SafeAreaView>
            <View className="bg-[#C4EFF7] flex-row items-center py-5 px-3 rounded-b-[40px]">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image resizeMode="contain" source={icons.arrow} className="h-[30px] w-[48px]"/>
                </TouchableOpacity> 
                <Text className="sora text-[18px] font-semibold ml-2">{title}</Text>
            </View>
        </View>
    )
}

export default Header;