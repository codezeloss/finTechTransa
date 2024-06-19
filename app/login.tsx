import {View, Text, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView} from "react-native";
import {useState} from "react";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useSignIn} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

enum SignInType {
    Phone, Email, Google, Apple
}

export default function LoginScreen() {
    const [countryCode, setCountryCode] = useState("+212")
    const [phoneNumber, setPhoneNumber] = useState("")

    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0
    const {signIn, setActive, isLoaded} = useSignIn();
    const router = useRouter()

    const onSignIn = async (type: SignInType) => {
        if (type === SignInType.Phone) {
            try {
                const fullPhoneNumber = `${countryCode}${phoneNumber}`

                // Start the sign-in process using the phone number method
                const {supportedFirstFactors} = await signIn!.create({
                    identifier: fullPhoneNumber,
                });

                // Filter the returned array to find the 'phone_code' entry
                const phoneCodeFactor: any = supportedFirstFactors?.find((factor: any) => {
                    return factor.strategy === "phone_code"
                });

                if (phoneCodeFactor) {
                    // Grab the phoneNumberId
                    const {phoneNumberId} = phoneCodeFactor;

                    // Send the OTP code to the user
                    await signIn!.prepareFirstFactor({
                        strategy: 'phone_code',
                        phoneNumberId,
                    });

                    router.push({pathname: "/verify/[phone]", params: {phone: fullPhoneNumber, signin: "true"}})
                }
            } catch (err) {
                console.error('Error:', JSON.stringify(err, null, 2));
            }
        }
    }

    return (
        <KeyboardAvoidingView className="flex-1 bg-white p-4" behavior="padding"
                              keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView className="w-full h-full">
                <Text className="font-pSemibold text-3xl mt-4 mb-2">Welcome back</Text>
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


                <TouchableOpacity
                    className={`mt-8 ${phoneNumber !== "" ? "bg-primary" : "bg-gray-100"} py-4 px-2 rounded-full`}
                    onPress={() => onSignIn(SignInType.Phone)}>
                    <Text className="text-white font-pBold text-center">Continue</Text>
                </TouchableOpacity>

                <View className="flex flex-row items-center mt-4 gap-x-4">
                    <View className="flex-1 h-[1.5px] bg-gray-200"/>
                    <Text className="font-pRegular text-gray-400">or</Text>
                    <View className="flex-1 h-[1.5px] bg-gray-200"/>
                </View>

                <TouchableOpacity
                    className={`mt-4 bg-white border py-4 px-2 rounded-full flex flex-row items-center justify-center`}
                    onPress={() => onSignIn(SignInType.Email)}
                >
                    <Ionicons name="mail" size={24} color={`${Colors.dark}`}/>
                    <Text className="font-pSemibold ml-3">Continue with email</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`mt-4 bg-white border py-4 px-2 rounded-full flex flex-row items-center justify-center`}
                    onPress={() => onSignIn(SignInType.Google)}
                >
                    <Ionicons name="logo-google" size={24} color={`${Colors.dark}`}/>
                    <Text className="font-pSemibold ml-3">Continue with google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`mt-4 bg-white border py-4 px-2 rounded-full flex flex-row items-center justify-center`}
                    onPress={() => onSignIn(SignInType.Apple)}
                >
                    <Ionicons name="logo-apple" size={24} color={`${Colors.dark}`}/>
                    <Text className="font-pSemibold ml-3">Continue with apple</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}