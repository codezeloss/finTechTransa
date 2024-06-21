import {View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Key, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {Currency} from "@/interfaces/crypto";
import {Link} from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import {useHeaderHeight} from "@react-navigation/elements";
import {Ionicons} from "@expo/vector-icons";

export default function CryptoScreen() {
    const headerHeight = useHeaderHeight()

    const currencies = useQuery({
        queryKey: ['currencies'],
        queryFn: () => fetch('/api/listings').then((res) => res.json())
    })

    const ids = currencies.data?.map((currency: Currency) => currency.id).join(",")

    const {data, isLoading} = useQuery({
        queryKey: ['info', ids],
        queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
        enabled: !!ids
    })

    if (isLoading) return <ActivityIndicator/>

    return (
        <ScrollView className="p-4 bg-white flex-1">
            <CustomHeader/>

            <Text className="font-pSemibold mb-2 mt-6 text-lg">Latest cryptos</Text>

            <View className="border bg-white rounded-xl border-gray-300 p-4 flex-col space-y-4">
                {currencies?.data?.map((currency: Currency, index: Key) => (
                    <Link href={`/crypto/${currency.id}`} key={index} asChild>
                        <TouchableOpacity className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Image source={{uri: data?.[currency?.id]?.logo}} className="w-[40px] h-[40px] mr-3"/>
                                <View className="">
                                    <Text className="font-pMedium text-sm">{currency?.name}</Text>
                                    <Text className="font-pRegular text-gray-500 text-xs">{currency?.symbol}</Text>
                                </View>
                            </View>

                            <View className="flex-col space-y-0.5 items-end">
                                <Text
                                    className="font-pMedium text-xs">{currency?.quote?.EUR?.price?.toFixed(2)} $</Text>
                                <View className="flex-row space-x-0.5">
                                    <Ionicons
                                        name={currency?.quote?.EUR?.percent_change_1h > 0 ? "caret-up" : "caret-down"}
                                        size={12} color={currency?.quote.EUR?.percent_change_1h > 0 ? "green" : "red"}/>
                                    <Text
                                        className={`font-pRegular text-xs ${currency?.quote?.EUR?.percent_change_1h > 0 ? "text-green-600" : "text-red-600"}`}>{currency.quote.EUR.percent_change_1h.toFixed(2)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
}