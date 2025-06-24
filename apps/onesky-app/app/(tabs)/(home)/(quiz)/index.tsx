<<<<<<< HEAD
import Header from '@/components/Header';
import icons from '@/lib/icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getQuizTopics } from '@/api/getQuizTopics';

const Quiz = () => {
  const [topics, setTopics] = useState([]);
=======
import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import ProgressBar from '@/components/Progressbar';
import Completion from '@/components/Completion';
import icons from '@/lib/icons';
import { Image } from 'expo-image';

const Quiz = () => {
  const [quizProgression, setQuizProgression] = useState(1);
  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const animationRef = useRef<LottieView>(null);

  // Temporary question and answer options, will take from API when available
  const question1 = 'Question 1: Lorem ipsum random question';
  const answers1 = ['Wrong Answer', 'Wrong Answer', 'Right Answer', 'Wrong Answer'];
  const rightAnswerIndex = 2;
  const [answerCorrect, setAnswerCorrect] = useState<boolean | undefined>(undefined);

  // Submit/Next Question button
  const handleSubmitAnswer = () => {
    // Next route
    if (answerCorrect !== undefined) {
      setAnswerCorrect(undefined);
      setUserAnswer(undefined);
      setQuizProgression(quizProgression + 1);

      // Submit route
    } else {
      if (userAnswer || userAnswer === 0) {
        if (rightAnswerIndex === userAnswer) {
          setAnswerCorrect(true);
          // playSuccess();
        } else {
          setAnswerCorrect(false);
        }
      }
    }
  };

  const bgClass =
    answerCorrect === true ? 'green-bg-200' : answerCorrect === false ? 'yellow-bg-300' : '';
>>>>>>> f2f75efa062ff7e2b2de77259dc1a970ff5bf1b7

  useEffect(() => {
    const loadTopics = async () => {
      const response = await getQuizTopics();
      setTopics(response);
    };

    loadTopics();
  }, []);
  return (
    <View>
      <Header title="Quiz" />
      <SafeAreaView className="" edges={['bottom']}>
        <View className="flex-col py-[24px] px-[20px] h-[100vh]">
          <Text className="text-[20px] font-semibold">
            Choose a topic that interests you to begin your learning journey
          </Text>
          <View className="flex-row items-center my-4">
            <Image
              contentFit="contain"
              style={style.icon}
              source={icons.shootingStar}
              alt="shooting star"
            />
            <Text>Complete 1 quiz daily to earn 20 points</Text>
          </View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            {Object.entries(topics).map(([key, value], index) => {
              return (
                <TouchableOpacity
                  key={index + 'topic'}
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/(home)/(quiz)/questions',
                      params: { quizTopic: key },
                    })
                  }
                  className="flex-row items-center w-full border-[1.3px] border-[#E5E5E5] rounded-[8px] py-5 px-5 mb-3"
                >
                  <Image
                    contentFit="contain"
                    style={style.icon}
                    source={value}
                    alt={`image for ${key}`}
                  />
                  <Text>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
<<<<<<< HEAD
=======
        <SafeAreaView
          className={`h-[280px] mt-auto rounded-t-[36px] pt-5 ${bgClass}`}
          edges={['bottom']}
        >
          <View className={`flex-v justify-end pt-5 px-5 h-full`}>
            {answerCorrect !== undefined && (
              <View className="flex mb-auto justify-between">
                <View className="flex-v">
                  <View className="flex items-center">
                    {answerCorrect ? (
                      <LottieView
                        ref={animationRef}
                        source={require('@/assets/animations/SuccessAnimation.json')}
                        style={{ height: 50, width: 40 }}
                        loop={false}
                      />
                    ) : (
                      <Image contentFit="contain" className="mr-1" source={icons.incorrect} />
                    )}
                    <Text className="sora font-bold text-[20px]">
                      {answerCorrect ? 'Correct' : 'Oops!!'}
                    </Text>
                  </View>
                  <Text className="ml-3">
                    {answerCorrect ? 'Good job' : 'The correct answer is:'}
                  </Text>
                  <Text className="ml-3">
                    {answerCorrect ? 'keep it up!' : `Option ${rightAnswerIndex + 1}`}
                  </Text>
                </View>
                {answerCorrect ? (
                  <Image
                    source={answerCorrect ? icons.correctWorld : icons.incorrectWorld}
                    contentFit="contain"
                    className="h-[120px] w-[138px]"
                  />
                ) : (
                  <Image
                    source={answerCorrect ? icons.correctWorld : icons.incorrectWorld}
                    contentFit="contain"
                    className="h-[120px] w-[147px]"
                  />
                )}
              </View>
            )}
            <TouchableOpacity
              className="green-bg-500 w-full py-5 rounded-[8px] s"
              onPress={handleSubmitAnswer}
            >
              <Text className="text-center raleway text-[14px] font-semibold">
                {answerCorrect === undefined ? 'Submit' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
>>>>>>> f2f75efa062ff7e2b2de77259dc1a970ff5bf1b7
      </SafeAreaView>
    </View>
  );
};

export default Quiz;

const style = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});
