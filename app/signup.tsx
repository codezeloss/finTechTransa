import {View, Text, SafeAreaView, ScrollView, TextInput} from "react-native";
import {useState} from "react";

export default function SignupScreen() {
    const [countryCode, setCountryCode] = useState("+212")

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
            <ScrollView className="w-full h-full">
                <Text className="font-pSemibold text-3xl my-2">Let's get started!</Text>
                <Text className="font-pRegular text-sm text-gray-400">Enter your phone number. We will send you a
                    confirmation code
                    there.
                </Text>

                <View className="flex-col gap-4 mt-11">
                    <TextInput className="border border-gray-100 px-4 py-3 rounded-md font-pRegular"
                               placeholder="Country code"
                               keyboardType="numeric"
                               value={countryCode}
                    />
                    <TextInput className="border border-gray-100 px-4 py-3 rounded-md font-pRegular"
                               placeholder="Mobile number"
                               keyboardType="numeric"
                               value={countryCode}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}