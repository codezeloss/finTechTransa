import {Text, View} from '@/components/Themed';
import {SafeAreaView, TouchableOpacity} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAssets} from "expo-asset";
import {ResizeMode, Video} from "expo-av";
import {Link, useRouter, useSegments} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";
import {useEffect} from "react";

export default function TabOneScreen() {
    const [assets, error] = useAssets([require('@/assets/videos/intro.mp4')]);


    return (
        <SafeAreaView className="flex-1 flex justify-between">
            {assets && (
                <Video isMuted isLooping shouldPlay source={{uri: assets[0].uri}}
                       className="w-full h-full absolute"
                       resizeMode={ResizeMode.COVER}/>
            )}

            <View className="ml-8 mt-16 bg-transparent">
                <Text className="text-3xl text-white font-pBold uppercase">Ready to change the way you make
                    money?</Text>
            </View>

            <View className="flex flex-row gap-5 justify-center bg-transparent my-8 p-6">
                <Link href="/login"
                      className="rounded-full flex-1 items-center py-4 bg-black border-2 border-white"
                      asChild>
                    <TouchableOpacity>
                        <Text className="text-white font-pBold">Sign In</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/signup"
                      className="rounded-full flex-1 items-center py-4 bg-white border-2 border-white"
                      asChild>
                    <TouchableOpacity>
                        <Text className="text-black font-pBold">Sign Up</Text>
                    </TouchableOpacity>
                </Link>

            </View>

            <StatusBar hidden/>
        </SafeAreaView>
    );
}

