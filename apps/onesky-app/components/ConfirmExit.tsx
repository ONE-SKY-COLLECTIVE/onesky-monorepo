import icons from "@/lib/icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ConfirmExit: React.FC<{utility: () => void}> = ({utility}) => {
    const router = useRouter();
    return (
        <View className="flex-col absolute bottom-0 px-7 pt-10 pb-20 items-center self-center w-[100vw] bg-[#FCF2E2] rounded-t-[36px]">
            <View className="flex items-center w-[100%] justify-between">
                <View>
                    <Text className="text-[30px] font-semibold my-2">Don&apos;t leave us</Text>
                    <Text className="text-[15px] my-1">You&apos;re close to finishing!</Text>
                    <Text className="text-[15px] my-1">Keep going to earn your points!</Text>
                </View>
                <Image contentFit="contain" source={icons.dontLeave} style={style.world}/>
            </View>
            <TouchableOpacity className="w-full bg-[#FFFFFF] py-[10px] rounded-[8px] mb-2 mt-3 border-[1.3px] border-[#C7E28C]" onPress={() => router.replace('/(tabs)/(home)')}><Text className="text-center">Back to Home Page</Text></TouchableOpacity>
            <TouchableOpacity className="w-full bg-[#A1CE3F] py-[10px] rounded-[8px] mt-2" onPress={utility}><Text className="text-center">Continue</Text></TouchableOpacity>
        </View>
    )
}

export default ConfirmExit;

const style = StyleSheet.create({
    world: {
        height: 110,
        width: 110
    }
})