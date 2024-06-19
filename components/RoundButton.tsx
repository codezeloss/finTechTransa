import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type RoundButtonProps = {
    text: string
    icon: typeof Ionicons.defaultProps
    onPress?: () => void
}

export default function RoundButton({text, icon, onPress}: RoundButtonProps) {
    return (
        <TouchableOpacity
            className="flex-col items-center justify-center py-2.5 px-4 gap-2.5"
            onPress={onPress}>
            <View className="flex items-center justify-center rounded-full bg-gray-200 h-[50px] w-[50px]">
                <Ionicons name={icon} color={`${Colors.dark}`} size={30}/>
            </View>
            <Text className="font-pRegular text-xs">{text}</Text>
        </TouchableOpacity>
    );
}