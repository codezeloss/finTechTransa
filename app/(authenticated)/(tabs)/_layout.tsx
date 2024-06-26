import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {Image, Text, View} from "react-native";
import {BlurView} from "expo-blur";
import CustomHeader from "@/components/CustomHeader";

type Props = {
    icon: any,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = ({icon, color, name, focused}: Props) => {
    return <View className="flex flex-col items-center justify-center gap-1">
        <Image className="w-6 h-6 aspect-square" source={icon} resizeMode="contain" tintColor={color}/>
        <Text className={`${focused ? "font-pSemibold" : "font-pRegular"}`} style={{color: color}}>{name}</Text>
    </View>
}


export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: "#a5b4fc",
            tabBarBackground: () => (
                <BlurView intensity={100} tint="extraLight" style={{flex: 1, backgroundColor: "rgba(0, 0, 0, 0.05)"}}/>
            ),
            tabBarStyle: {
                paddingVertical: 4,
                height: 60,
                backgroundColor: "transparent",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                borderTopWidth: 0
            }
        }}>
            <Tabs.Screen name="home" options={{
                title: "Home",
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name="registered" size={size} color={color}/>
                    // <TabIcon icon={icons.home} name="Home" color={color} focused={focused}/>
                )
            }}/>
            <Tabs.Screen name="invest" options={{
                title: "Invest",
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name="line-chart" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="transfers" options={{
                title: "Transfers",
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name="exchange" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="crypto" options={{
                title: "Crypto",
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name="bitcoin" size={size} color={color}/>
                )
            }}/>
            <Tabs.Screen name="lifestyle" options={{
                title: "Lifestyle",
                tabBarIcon: ({size, color}) => (
                    <FontAwesome name="th" size={size} color={color}/>
                )
            }}/>
        </Tabs>
    );
}