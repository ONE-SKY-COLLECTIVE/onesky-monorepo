import Header from "@/components/Header";
import icons from "@/lib/icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image"
import { SafeAreaView } from "react-native-safe-area-context";

const Quiz = () => {
    const topics = {
        "Plastic Pollution": icons.plasticPollution,
        "Single User Plastic": icons.singleUserPlastic,
        "Climate Change": icons.climateChange,
        "Circular Economy": icons.circularEconomy,
        "Sustainability": icons.sustainability,
        "Active Travel": icons.activeTravel,
        "Global Warming": icons.globalWarming,
        "Beach Cleaning": icons.beachCleaning
    };
    return (
        <View>
            <Header title="Quiz"/>
            <SafeAreaView className="" edges={["bottom"]}>
                <View className="flex-col py-[24px] px-[20px]">
                    <Text className="text-[20px] font-semibold raleway">Choose a topic that interests you to begin your learning journey</Text>
                    <View className="flex-row items-center my-4">
                        <Image contentFit="contain" style={style.icon} source={icons.shootingStar} alt="shooting star"/>
                        <Text>Complete 1 quiz daily to earn 20 points</Text>
                    </View>
                    {Object.entries(topics).map(([key, value], index) => {
                        return (
                            <TouchableOpacity key={index + 'topic'} onPress={() => router.push({pathname:"/(quiz)/questions", params: {quizTopic: key}})} className="flex-row items-center w-full border-[1.3px] border-[#E5E5E5] rounded-[8px] py-5 px-5 mb-3">
                                <Image contentFit="contain" style={style.icon} source={value} alt={`image for ${key}`}/>
                                <Text>{key}</Text>
                            </TouchableOpacity>
                        )
                        }
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Quiz;

const style = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        marginRight: 5
    }
})