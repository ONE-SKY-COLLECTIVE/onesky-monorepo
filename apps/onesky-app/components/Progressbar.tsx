import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import icons  from "@/lib/icons";
import { Image } from "expo-image";

interface ProgressBarProps {
  progression: number;
  numProgressions: number;
  points: number;
  utility?: () => void;
  title?: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  progression,
  points,
  numProgressions,
  utility,
  title,
}) => {
  const router = useRouter();
  const dotWidth = 100 / numProgressions - 3;

    return (
        <View className="flex-col px-5 pb-[20px]">
            <View className="flex-row items-center align-self-start">
                <TouchableOpacity className="p-1" onPress={utility ? utility : () => router.push("/(tabs)/(home)")}>
                    <Image contentFit="contain" style={style.xbutton} source={icons.xbutton} />
                </TouchableOpacity>
                {title && 
                <Text className="sora text-[16px] ml-2 font-semibold">{title}</Text>
            }
            </View>
            <View className="flex-row items-center justify-between w-full mt-[24px]">
                {Array.from({length: numProgressions}).map((_, index) => (
                    <View 
                        key={index} 
                        style={{
                            width: `${dotWidth}%`,
                            height: 8,
                        }}
                        className={`rounded-[999px] ${progression >= index + 1 ? "quiz-progress-active" : "quiz-progress"}`}
                    >
                        { index + 1 === numProgressions &&
                            <View className={` top-[15px] flex-row self-end rounded-[16px] border-[#737373] border-[1px] py-[4px] px-[8px] ${progression >= numProgressions && "bg-[#ECF5D9] border-0"}`}>
                                <Image contentFit="contain" style={style.diamond} source={icons.diamond}/>
                                <Text className={`font-semibold text-[16px] text-[#737373] ${progression >= numProgressions && "text-[#617C26]"}`}>{points}</Text>
                            </View>
                        }
                    </View>
                ))}
            </View>
        </View>
    )
}

export default ProgressBar;

const style = StyleSheet.create({
    xbutton: {
        height: 32,
        width: 32,
        marginRight: 2
    },
    diamond: {
        height: 20,
        width: 20,
        marginRight: 2
    }
})
