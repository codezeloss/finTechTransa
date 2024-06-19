import {StyleSheet, Text, ScrollView, Platform, KeyboardAvoidingView, TouchableOpacity, View} from "react-native";
import {Link, useLocalSearchParams} from "expo-router";
import {Fragment, useEffect, useState} from "react";
import {useSignIn, useSignUp} from "@clerk/clerk-expo";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from "@/constants/Colors";

const CELL_COUNT = 6;

export default function PhoneVerificationScreen() {
    const {phone, signin} = useLocalSearchParams<{ phone: string; signin: string }>()
    const [code, setCode] = useState("")
    const {signUp, setActive} = useSignUp();
    const {signIn} = useSignIn();
    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0

    const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });


    useEffect(() => {
        if (code.length === 6) {
            if (signin === "true") {
                verifySignIn()
            } else {
                verifyCode()
            }
        }
    }, [code]);

    const verifyCode = async () => {
        try {
            await signUp!.attemptPhoneNumberVerification({code});
            await setActive!({session: signUp!.createdSessionId});
        } catch (err) {
            console.error('Error:', JSON.stringify(err, null, 2));
        }
    }

    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({strategy: 'phone_code', code});
            await setActive!({session: signIn!.createdSessionId});
        } catch (err) {
            console.error('Error:', JSON.stringify(err, null, 2));
        }
    }

    return (
        <View className="flex-1 bg-white p-4">
            <Text className="font-pSemibold text-3xl mt-4 mb-2">6-digit code</Text>
            <Text className="font-pRegular text-sm text-gray-400 mb-4">
                Code sent to {phone} unless you already have an account
            </Text>


            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <View
                        key={index}
                        onLayout={getCellOnLayoutHandler(index)}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor/> : null)}</Text>
                    </View>
                )}
            />

            <Link href="/login" replace asChild>
                <TouchableOpacity>
                    <Text className="font-pMedium mt-6">
                        Already have an account?{" "}
                        <Text className="text-blue-700 font-pSemibold">Login</Text>
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        paddingBottom: 8,
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: Colors.gray,
        alignSelf: 'center',
    },
});


