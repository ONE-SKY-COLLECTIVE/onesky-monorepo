import icons from "@/lib/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NavBarProps {
    selectedPage: string;
}

const NavBar: React.FC<NavBarProps> = ({selectedPage}) => {
    const router = useRouter();
    const [selected, setSelected] = useState(selectedPage);
    return (
        <View className="navbar">
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Home") {setSelected("Home"); router.push('../pages/Homepage')}}}>
                {selected === "Home" ? 
                    <View className="items-center">
                        <Image className="navbar-images" src={icons.homeselected}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Home</Text>
                    </View>
                :
                    <Image className="navbar-images" src={icons.home}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image src={icons.lightbulb}/>
                {/* <Text className="text-[10px] green-600">Challenges</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center" onPress={() => {if (selected !== "Dashboard") {setSelected("Dashboard"); router.push('../pages/Dashboard')}}}>
                {selected === "Dashboard" ? 
                    <View className="items-center">
                        <Image className="navbar-images" src={icons.dashboardselected}/>
                        <Text className="text-[10px] green-600 absolute navbar-text">Dashboard</Text>
                    </View>

                :
                    <Image className="navbar-images" src={icons.dashboard}/>
                }
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center">
                <Image src={icons.bag}/>
                {/* <Text className="text-[10px] green-600">ECOmmerce</Text> */}
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-v justify-center items-center">
                <Image src={icons.group}/>
                {/* <Text className="text-[10px] green-600">Community</Text> */}
            </TouchableOpacity> 
        </View>
    )
}

export default NavBar;