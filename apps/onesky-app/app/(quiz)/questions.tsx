import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import ProgressBar from "@/components/Progressbar";
import Completion from "@/components/Completion";
import icons from "@/lib/icons";
import { Image } from "expo-image";
const Quiz = () => {
    const router = useRouter();
    const [quizProgression, setQuizProgression] = useState(1);
    const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
    const animationRef = useRef<LottieView>(null);
    const [finished, setFinished] = useState(false);
    const { quizTopic } = useLocalSearchParams();

    // Temporary question and answer options, will take from API when available
    const question1 = "How do synthetic clothes contribute to microplastics?"
    const answers1 = ["They release fibres that enter waterways when washed", "They attract glitter from the air", "When they are exposed to sunlight", "If they are left in washing basket for too long"]
    const rightAnswerIndex = 2;
    const [answerCorrect, setAnswerCorrect] = useState<boolean | undefined>(undefined);
    const quizInformation = ["Synthetic fabrics like polyester release microfibres when washed.", "These microplastics go down the drain and often end up in waterways.", "Washing bags or filters can reduce the amount released."]
    // Submit/Next Question button
    const handleSubmitAnswer = () => {
        if (answerCorrect !== undefined) {
            setFinished(true);
        } else if (quizProgression < 4) {
            setQuizProgression(quizProgression + 1)
        } else {
        // Submit route
            if (userAnswer || userAnswer === 0) {
                if (rightAnswerIndex === userAnswer) {
                    setAnswerCorrect(true);
                } else {
                    setAnswerCorrect(false);
                }
            }

        }
    }

    const bgClass = answerCorrect === true
        ? "green-bg-200"
        : answerCorrect === false
        ? "yellow-bg-300"
        : "";

  useEffect(() => {
    const playSuccess = () => {
            if (animationRef.current) {
                animationRef.current.play(50, 60);
            }
    };
    if (answerCorrect === true) {
        playSuccess();
    };
  }, [answerCorrect])

    // If every part of the quiz is done, display this page instead
    if (finished) {
        return (
            <Completion points={answerCorrect ? 50 : 25} activityName="the quiz"/>
        )
    }

    return (
        <View className="bg-white">
            <SafeAreaView className=" pt-4 flex-v h-full" edges={["top", "bottom"]}>
                <ProgressBar progression={quizProgression} numProgressions={4} points={20} title={quizTopic as string}/>
                {quizProgression !== 4 ? 
                <View className="flex-col px-[20px] mt-[20px]">
                    <View>
                        <Text className="text-[#525252] text-[15px] mb-2">Welcome to the {quizTopic} quiz!</Text>
                        <Text className="text-[#525252] text-[15px]">Let's explore some key information before we get started.</Text>
                    </View>
                    <Text className="text-[17px] text-[#171717] mt-[27vh]">
                        {quizInformation[quizProgression - 1]}
                    </Text>
                </View> 
                : 
                <View className="pt-[20px] px-5">
                    <Text className="text-[20px] font-bold">
                        {question1}
                    </Text>
                    <View className="mt-10">
                        {answers1.map((option, index) => {return (
                            <Pressable
                                key={index + 'answers'} className={`quiz-option ${userAnswer === index ? "text-[#81A532] bg-[#F6FAEC] border-[#A1CE3F]" : "border-[#e7e5e4]"}`}
                    
                                  onPress={() => userAnswer === index ? setUserAnswer(undefined) : setUserAnswer(index)}
                                disabled={answerCorrect !== undefined}
                            >
                                <Text className={`${userAnswer === index && "text-[#81A532]"}`}>
                                    {option}
                                </Text>
                            </Pressable>
                        )})}
                    </View>
                </View>
}
                <View className={`h-[300px] absolute bottom-0 z-[1000] w-full rounded-t-[36px] pt-5 pb-[15%] ${bgClass}`}>
                    <View className={`flex-v justify-end pt-5 px-5 h-full`}>
                        {answerCorrect !== undefined &&
                            <View className="flex mb-auto justify-between">
                                <View className="flex-v">
                                    <View className="flex items-center">
                                        {/* {answerCorrect ?
                                            <LottieView
                                                ref={animationRef}
                                                source={require("@/assets/animations/SuccessAnimation.json")}
                                                style={{height: 50, width:40}}
                                                loop={false}
                                            />
                                        :
                                            <Image contentFit="contain" className="mr-1" source={icons.incorrect} />
                                        } */}
                                        <Text className="sora font-bold text-[20px]">
                                            {answerCorrect ? "Nice Work!" : "Uh-oh!!"}
                                        </Text>
                                    </View>
                                    <Text className="w-[50vw] text-[15px] my-3">
                                        {answerCorrect ? "You're on a roll!" : "Nice try! You still earned points 🎉"}
                                    </Text>
                                    <Text className="w-[50vw] text-[13px]">
                                        {answerCorrect ? "Your knowledge helps save the planet" : `The correct answer is:`} <Text className="font-semibold"> {!answerCorrect && answers1[rightAnswerIndex]} </Text>
                                    </Text>
                                    <Text className="w-[50vw] text-[13px] my-2">
                                        {answerCorrect && "Come back tomorrow to keep making a difference 🌍"}
                                    </Text>
                                </View>
                                {answerCorrect ?
                                <Image
                                    source={answerCorrect ? icons.correctWorld : icons.incorrectWorld}
                                    contentFit="contain"
                                    style={style.correct}
                                />
                                :
                                <Image
                                    source={answerCorrect ? icons.correctWorld : icons.incorrectWorld}
                                    contentFit="contain"
                                    style={style.incorrect}
                                />
                            }
                            </View>
                        }
                        <TouchableOpacity className="flex-row green-bg-500 w-full py-5 rounded-[8px] justify-center items-center" onPress={handleSubmitAnswer}>
                            {answerCorrect || answerCorrect !== undefined && <Image contentFit="contain" source={icons.diamond} style={style.diamond}/>}
                            <Text className="text-center raleway text-[14px] ">{answerCorrect ? 'Collect Points' : answerCorrect !== undefined ? "Got it, let's move on" : quizProgression !== 3 ? 'Continue' : 'Start the quiz'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Quiz;

const style = StyleSheet.create({
    incorrect: {
        height: 120,
        width: 147,
        marginRight: 2
    },
    correct: {
        height: 120,
        width: 138,
    },
    diamond: {
        height: 20,
        width: 20,
        marginRight: 3,
    }
})