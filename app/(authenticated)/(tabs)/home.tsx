import {View, Text, SafeAreaView, ScrollView, Button} from "react-native";
import RoundButton from "@/components/RoundButton";

export default function HomeScreen() {
    const balance = 4580

    const onAddMoney = () => {
    }

    const onRequestMoney = () => {
    }

    return (
        <SafeAreaView className="bg-white w-full h-full flex-1 p-4">
            <ScrollView>
                <View className="w-full flex justify-center h-full min-h-[85vh] px-4">
                    <View className="flex flex-row justify-center items-center">
                        <Text style={{fontSize: 65}} className="font-pSemibold">{balance}</Text>
                        <Text style={{fontSize: 25, marginLeft: 6, marginTop: 10}} className="font-pRegular">$</Text>
                    </View>

                    <View className="flex-row items-center justify-center">
                        <RoundButton text="Add Money" icon="add" onPress={onAddMoney}/>
                        <RoundButton text="Exchange" icon="refresh"/>
                        <RoundButton text="Details" icon="list"/>
                        <RoundButton text="More" icon="ellipsis-horizontal"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}