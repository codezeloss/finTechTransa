import {Image, ScrollView, SectionList, Text, TouchableOpacity, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useHeaderHeight} from "@react-navigation/elements";
import {useQuery} from "@tanstack/react-query";
import Colors from "@/constants/Colors";
import {useEffect, useState} from "react";
import {CartesianChart, Line, useChartPressState} from "victory-native";
import {Circle, useFont} from "@shopify/react-native-skia";
import {format} from "date-fns";
import * as Haptics from "expo-haptics"
import {SharedValue} from "react-native-reanimated";


function ToolTip({x, y}: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color="black"/>;
}

export default function CryptoDetailsScreen() {
    const {id} = useLocalSearchParams()
    const headerHeight = useHeaderHeight()
    const [activeIndex, setActiveIndex] = useState(0)
    const font = useFont(require("@/assets/fonts/Poppins-Regular.ttf"), 10);
    const {state, isActive} =
        useChartPressState({x: 0, y: {price: 0}});
    const categories = ["Overview", "News", "Orders", "Transactions"]

    useEffect(() => {
        if (isActive) Haptics.selectionAsync()
    }, [isActive]);

    const {data} = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json())
            return info[+id!]
        },
        enabled: !!id
    })


    const {data: tickers} = useQuery({
        queryKey: ['tickers'],
        queryFn: async () => fetch(`/api/tickers`).then((res) => res.json())
    })

    const DATA = Array.from({length: 31}, (_, i) => ({
        day: i,
        highTmp: 40 + 30 * Math.random(),
    }));

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
                                              className={`flex-1 rounded-full border-gray-100 px-0.5 py-2 ${activeIndex === index ? "bg-gray-100/50" : "bg-white"}`}
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
                        <View className="h-[400px] mb-6 rounded-xl border border-gray-200 p-4">
                            {tickers && <CartesianChart
                                axisOptions={{
                                    font,
                                    tickCount: 5,
                                    labelOffset: {x: -2, y: 0},
                                    labelColor: Colors.gray,
                                    formatYLabel: (v) => `${v} $`,
                                    formatXLabel: (ms) => format(new Date(ms), "MM/yy")
                                }}
                                data={tickers!}
                                xKey="timestamp"
                                yKeys={["price"]}
                                chartPressState={[state]}
                            >
                                {({points}) => (
                                    <>
                                        <Line points={points?.price} color={Colors.primary} strokeWidth={3}/>
                                        {isActive && (
                                            <ToolTip x={state.x.position} y={state.y.price.position}/>

                                        )}
                                    </>
                                )}
                            </CartesianChart>}
                        </View>

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