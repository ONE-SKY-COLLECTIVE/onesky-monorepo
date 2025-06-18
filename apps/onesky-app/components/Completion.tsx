import { router } from "expo-router"
import { TouchableOpacity, Text, View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import icons from "@/lib/icons";
import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
const Completion = ({points, activityName}: {points: number, activityName: string}) => {
    // TODO: API to check user's total points, replace this
    const userPoints = 12020;
    const confettiAnimationRef = useRef<LottieView>(null);
    useEffect(() => {
        if (confettiAnimationRef.current) {
            confettiAnimationRef.current.play(0, 110);
        }
    }, [])
    return (
        <SafeAreaView className="pt-4 flex-v h-full green-bg-50 px-5" edges={["top", "bottom"]}>
            <View className="w-full items-end">
                <View className="bg-white px-3 py-2 flex-row rounded-[18px] border-[.5px] items-center">
                    <Image contentFit="contain" source={icons.diamond} style={style.diamond}/>
                    <Text className="mx-1">{userPoints}</Text>
                </View>
            </View>

            <View className="flex-v justify-between pb-20 items-center h-full">
                <Text className="sora text-[34px] font-bold text-center w-3/4">
                    Yay,
                     Congratulations!
                </Text>
                <View>
                    <Image contentFit="contain" source={icons.quizDone} style={style.quizDone}/>
                    <LottieView
                    ref={confettiAnimationRef}
                    source={require("@/assets/animations/ConfettiAnimation.json")}
                    style={style.confettiAnimation}
                    autoPlay={false}
                    loop={false}/>
                    <Text className="text-center mt-8 mb-8 gray-800 text-[15px]">You have successfully completed {activityName}!</Text>
                </View>
                
                <View className="flex-col items-center w-full">
                    <View className="flex items-center justify-center">
                        <Text className="text-[16px] font-semibold">You Earned</Text>
                        <Image style={style.largeDiamond} source={icons.diamond}/>
                        <Text className="text-[16px] font-semibold">{points} pts</Text>
                    </View>
                    
                    <TouchableOpacity className="w-full py-4 mt-10 green-bg-500 rounded-[8px]" onPress={() => router.push("/(homepage)")}>
                        <Text className="text-center">Back to Home</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

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
        marginInline: 5
    },
    quizDone: {
        marginTop: 40,
        width: 150,
        height: 180,
        alignSelf: 'center'
    },
    confettiAnimation: {
        height: 400,
        width: '100%',
        padding: 0,
        margin: 0,
        bottom: '-20%',
        left: '-10%',
        position: 'absolute',
        zIndex: 100
    }
})