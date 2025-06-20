import Header from "@/components/Header";
import icons from "@/lib/icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image"
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getQuizTopics } from "@/api/getQuizTopics";

const Quiz = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const loadTopics = async () => {
          const response = await getQuizTopics();
        //   const data = await response.json();
          setTopics(response);
        };
    
        loadTopics();
      }, []);
    return (
        <View>
            <Header title="Quiz"/>
            <SafeAreaView className="" edges={["bottom"]}>
                <View className="flex-col py-[24px] px-[20px] h-[100vh]">
                    <Text className="text-[20px] font-semibold">Choose a topic that interests you to begin your learning journey</Text>
                    <View className="flex-row items-center my-4">
                        <Image contentFit="contain" style={style.icon} source={icons.shootingStar} alt="shooting star"/>
                        <Text>Complete 1 quiz daily to earn 20 points</Text>
                    </View>
                    <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                        {Object.entries(topics).map(([key, value], index) => {
                            return (
                                <TouchableOpacity key={index + 'topic'} onPress={() => router.push({pathname:"/(tabs)/(home)/(quiz)/questions", params: {quizTopic: key}})} className="flex-row items-center w-full border-[1.3px] border-[#E5E5E5] rounded-[8px] py-5 px-5 mb-3">
                                    <Image contentFit="contain" style={style.icon} source={value} alt={`image for ${key}`}/>
                                    <Text>{key}</Text>
                                </TouchableOpacity>
                            )
                            }
                        )}
                    </ScrollView>
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