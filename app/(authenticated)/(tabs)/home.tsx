import {View, Text, SafeAreaView, ScrollView, Button} from "react-native";
import RoundButton from "@/components/RoundButton";
import {Ionicons} from "@expo/vector-icons";
import WidgetList from "@/components/SortableList/WidgetList";
import {StatusBar} from "expo-status-bar";
import CustomHeader from "@/components/CustomHeader";


const transactions = [
    {id: 1, title: "BITBIT", amount: 4586, date: new Date().getUTCDate()},
    {id: 2, title: "TOTPP", amount: 0, date: new Date().getUTCDate()},
    {id: 3, title: "DAGPFQ", amount: 10000, date: new Date().getUTCDate()},
    {id: 4, title: "QQQQ", amount: 696, date: new Date().getUTCDate()}
]

export default function HomeScreen() {
    // const {balance, transactions, runTransaction, clearTransactions} = useBalanceStore()
    const balance = 0

    const onAddMoney = () => {
    }

    const onRequestMoney = () => {
    }

    const clearTransactions = () => {
    }

    return (
        <ScrollView className="p-4 bg-white flex-1">
            <CustomHeader/>

            <View className="w-full h-full flex justify-center pt-14 pb-28">
                <View className="flex flex-row justify-center items-center mb-11">
                    <Text style={{fontSize: 65}} className="font-pSemibold">{balance}</Text>
                    <Text style={{fontSize: 25, marginLeft: 6, marginTop: 10}} className="font-pRegular">$</Text>
                </View>

                <View className="flex-row items-center justify-center">
                    <RoundButton text="Add Money" icon="add" onPress={onAddMoney}/>
                    <RoundButton text="Exchange" icon="refresh" onPress={clearTransactions}/>
                    <RoundButton text="Details" icon="list"/>
                    <RoundButton text="More" icon="ellipsis-horizontal"/>
                </View>

                <Text className="font-pSemibold mt-6 mb-4 text-xl">Transactions</Text>
                <View className="bg-white border border-gray-300 rounded-xl p-4 flex-col space-y-5">
                    {transactions.length === 0 &&
                        <Text className="font-pRegular text-sm text-center mt-8 text-gray-500">
                            No transactions yet
                        </Text>
                    }
                    {transactions.map((transaction, index) => (
                        <View className="flex-row items-center justify-between" key={index}>
                            <View className="flex-row items-center">
                                <View
                                    className="rounded-full h-[40px] w-[40px] bg-gray-200 flex items-center justify-center mr-4"
                                >
                                    <Ionicons name={transaction.amount > 0 ? "add" : "remove"}
                                              size={20}
                                              color={"black"}
                                    />
                                </View>

                                <View>
                                    <Text className="font-pMedium text-base">{transaction.title}</Text>
                                    <Text
                                        className="font-pRegular text-gray-500 text-sm">{transaction.date.toLocaleString()}</Text>
                                </View>
                            </View>

                            <Text className="font-pMedium text-base">{transaction.amount}$</Text>
                        </View>
                    ))}
                </View>

                <Text className="font-pSemibold mt-6 mb-4 text-xl">Widgets</Text>
                <WidgetList/>
            </View>

            <StatusBar backgroundColor="#161622" style="light"/>
        </ScrollView>

    );
}