import icons from "@/lib/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image"
interface NavBarProps {
    selectedPage: string;
}

const NavBar: React.FC<NavBarProps> = ({selectedPage}) => {
    const router = useRouter();
    const [selected, setSelected] = useState(selectedPage);
    return (
        <View className="navbar">
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Home") {setSelected("Home"); router.push("/(tabs)/(home)")}}}>
                {selected === "Home" ? 
                    <View className="items-center">
                        <Image className="navbar-images" source={icons.homeselected} style={style.icon}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Home</Text>
                    </View>
                :
                    <Image className="navbar-images" source={icons.home}  style={style.icon}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image source={icons.lightbulb} style={style.icon}/>
                {/* <Text className="text-[10px] green-600">Challenges</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Dashboard") {setSelected("Dashboard"); router.push('../pages/Dashboard')}}}>
                {selected === "Dashboard" ? 
                    <View className="items-center">
                        <Image className="navbar-images" source={icons.dashboardselected} style={style.icon}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Dashboard</Text>
                    </View>

                :
                    <Image className="navbar-images" source={icons.dashboard}  style={style.icon}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image source={icons.bag}  style={style.icon}/>
                {/* <Text className="text-[10px] green-600">ECOmmerce</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image source={icons.group} style={style.icon}/>
                {/* <Text className="text-[10px] green-600">Community</Text> */}
            </TouchableOpacity> 
        </View>
    )
}

const style = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        marginRight: 5
    }
})

export default NavBar;