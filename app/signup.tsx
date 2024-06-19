import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {useState} from "react";
import {Link, useRouter} from "expo-router";
import {useSignUp} from "@clerk/clerk-expo";

export default function SignupScreen() {
    const [countryCode, setCountryCode] = useState("+212")
    const [phoneNumber, setPhoneNumber] = useState("")

    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0
    const router = useRouter()
    const {isLoaded, signUp, setActive} = useSignUp();

    const onSignUp = async () => {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`

        if (!isLoaded) return;

        try {
            await signUp!.create({phoneNumber: fullPhoneNumber});
            await signUp!.preparePhoneNumberVerification();
            router.push({pathname: "/verify/[phone]", params: {phone: fullPhoneNumber}})
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }

    return (
        <KeyboardAvoidingView className="flex-1 bg-white p-4" behavior="padding"
                              keyboardVerticalOffset={keyboardVerticalOffset}>
            <View className="w-full h-full">
                <Text className="font-pSemibold text-3xl mb-2">Let's get started!</Text>
                <Text className="font-pRegular text-sm text-gray-400 mb-8">
                    Enter your phone number. We will send you a confirmation code there.
                </Text>


                <View className="w-full flex-row">
                    <TextInput
                        className="w-[70px] border border-gray-100 px-4 py-3 rounded-md font-pRegular mr-4"
                        placeholder="Country code"
                        keyboardType="numeric"
                        value={countryCode}
                    />
                    <TextInput
                        className="flex-1 border border-gray-100 px-4 py-3 rounded-md font-pRegular"
                        placeholder="Mobile number"
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <View className="flex-1"/>


                <TouchableOpacity
                    className={`mt-8 ${phoneNumber !== "" ? "bg-primary" : "bg-gray-100"} py-4 px-2 rounded-full`}
                    onPress={onSignUp}>
                    <Text className="text-white font-pBold text-center">Sign Up</Text>
                </TouchableOpacity>

                <Link href="/login" replace asChild>
                    <TouchableOpacity>
                        <Text className="my-4 text-center font-pMedium">
                            Already have an account?{" "}
                            <Text className="text-blue-700 font-pSemibold">Login</Text>
                        </Text>
                    </TouchableOpacity>
                </Link>

            </View>
        </KeyboardAvoidingView>
    );
}