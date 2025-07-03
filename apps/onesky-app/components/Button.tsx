import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    title: string,
    utility: () => void;
}
const Button: React.FC<ButtonProps> = ({title, utility}) => {
    return (
        <TouchableOpacity onPress={utility} className="w-full bg-[#A1CE3F] rounded-[8px] py-[16px]">
            <Text className="text-center text-[14px]">{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;