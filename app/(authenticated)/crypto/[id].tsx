import {ActivityIndicator, Image, ScrollView, SectionList, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useHeaderHeight} from "@react-navigation/elements";
import {useQuery} from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import {useState} from "react";

const categories = ["Overview", "News", "Orders", "Transactions"]

export default function CryptoDetailsScreen() {
    const {id} = useLocalSearchParams()
    const headerHeight = useHeaderHeight()
    const [activeIndex, setActiveIndex] = useState(0)

    const {data, isLoading} = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json())
            return info[+id!]
        },
        enabled: !!id
    })
    if (isLoading) return <ActivityIndicator/>


    return (
        <View className="p-4 mt-6 bg-white flex-1">
            <SectionList
                className="mt-14"
                sections={[{data: [{title: "Chart"}]}]}
                keyExtractor={(i => i.title)}
                contentInsetAdjustmentBehavior="automatic"
                renderSectionHeader={() => (
                    <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems: "center",
                                    width: "100%",
                                    justifyContent: "space-around",
                                    gap: 4,
                                    borderBottomColor: Colors.lightGray,
                                    borderBottomWidth: 1
                                }}
                                className="flex-1 h-[40px]"
                    >
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index}
                                              className={`flex-1 rounded-full border-gray-100 px-0.5 py-2 ${activeIndex === index ? "bg-gray-100/50 border" : "bg-white border-0"}`}
                                              onPress={() => setActiveIndex(index)}>
                                <Text
                                    className={`text-[11px] text-center ${activeIndex === index ? "font-pMedium" : "font-pRegular text-gray-500"}`}>{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-col space-y-0.5">
                                <Text className="font-pSemibold text-xl">{data?.name}</Text>
                                <Text className="font-pRegular text-gray-400 text-base">{data?.symbol}</Text>
                            </View>
                            <Image source={{uri: data?.logo}} className="w-[60px] h-[60px]"/>
                        </View>
                    </>
                )}
                renderItem={({item}) => (
                    <>
                        <View className="h-[400px] mb-6 bg-green-600"></View>

                        <View className="border border-gray-200 rounded-xl p-4">
                            <Text className="font-pMedium text-base">Overview</Text>
                            <Text className="mt-2 text-gray-500 font-pRegular text-justify">
                                Bitcoin is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin
                                network verify transactions through cryptography and record them in a public distributed
                                ledger, called a blockchain, without central oversight.
                            </Text>
                        </View>
                    </>
                )}/>
        </View>
    );
}