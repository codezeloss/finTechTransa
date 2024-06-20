import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {BlurView} from "expo-blur";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function CustomHeader() {
    const {top} = useSafeAreaInsets()

    return (
        <BlurView
            intensity={80}
            tint="extraLight"
            style={{paddingTop: top}}
            className="flex-row bg-transparent items-center justify-center h-[70px] gap-2.5 mt-0.5"
        >
            <View className="bg-gray-500 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <TouchableOpacity>
                    <Text className="text-white font-pSemibold">SV</Text>
                </TouchableOpacity>
            </View>

            <View
                className="flex-1 flex-row items-center space-x-2 bg-gray-100/20 border border-gray-300 rounded-full pl-2.5 pr-3">
                <Ionicons name="search" size={18} color="#000000"/>
                <TextInput
                    className="flex-1 h-[42px] flex-row font-pRegular text-xs placeholder:text-xs"
                    placeholder="Search"
                    placeholderTextColor="#000000"/>
            </View>

            <View className="bg-gray-200 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <Ionicons name="stats-chart" size={18} color="#000000"/>
            </View>
            <View className="bg-gray-200 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <Ionicons name="card" size={18} color="#000000"/>
            </View>
        </BlurView>
    );
}