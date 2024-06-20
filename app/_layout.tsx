import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Link, Stack, useRouter, useSegments} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/components/useColorScheme';
import Colors from "@/constants/Colors";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import {Text} from "@/components/Themed";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

export {
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter()
    const {isLoaded, isSignedIn} = useAuth()
    const segments = useSegments()
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        if (!isLoaded) return

        const isAuthGroup = segments[0] === "(authenticated)"

        if (isSignedIn && !isAuthGroup) {
            router.replace("/(authenticated)/(tabs)/home")
        } else if (!isSignedIn) {
            router.replace("/")
        }
    }, [isLoaded, isSignedIn]);

    if (!fontsLoaded || !isLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style="light"/>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="signup" options={{
                    headerShown: true,
                    title: "",
                    headerBackTitle: "",
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "white"},
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="arrow-back" size={24} color={`${Colors.dark}`}/>
                        </TouchableOpacity>
                    )
                }}/>
                <Stack.Screen name="login" options={{
                    headerShown: true,
                    title: "",
                    headerBackTitle: "",
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "white"},
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="arrow-back" size={24} color={`${Colors.dark}`}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <Link href="/help" asChild>
                            <TouchableOpacity>
                                <Ionicons name="help-circle-outline" size={24} color={`${Colors.dark}`}/>
                            </TouchableOpacity>
                        </Link>
                    )
                }}/>
                <Stack.Screen name="help" options={{headerShown: false, presentation: "modal"}}/>
                <Stack.Screen name="verify/[phone]" options={{
                    headerShown: true,
                    title: "",
                    headerBackTitle: "",
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "white"},
                    headerLeft: () => (
                        <TouchableOpacity onPress={router.back}>
                            <Ionicons name="arrow-back" size={24} color={`${Colors.dark}`}/>
                        </TouchableOpacity>
                    ),
                }}/>
                <Stack.Screen name="(authenticated)/(tabs)" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    );
}

const RootLayoutNav = () => {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
            <GestureHandlerRootView style={{flex: 1}}>
                <StatusBar backgroundColor="#161622" style="light"/>
                <InitialLayout/>
            </GestureHandlerRootView>
        </ClerkProvider>
    );
};

export default RootLayoutNav;


