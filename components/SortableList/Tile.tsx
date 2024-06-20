import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {SIZE} from './Config';
import Colors from '@/constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        width: SIZE - 10,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#d1d5db",
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        padding: 14,
        alignSelf: 'center',
    },
});

interface TileProps {
    id: string;
    onLongPress: () => void;
}

const transactions = [
    {id: 1, title: "BITBIT", amount: 4586, date: new Date().getUTCDate()},
    {id: 2, title: "TOTPP", amount: 0, date: new Date().getUTCDate()},
    {id: 3, title: "DAGPFQ", amount: 10000, date: new Date().getUTCDate()},
    {id: 4, title: "QQQQ", amount: 696, date: new Date().getUTCDate()}
]

const Tile = ({id}: TileProps) => {
    if (id === 'spent') {
        return (
            <View style={styles.container} pointerEvents="none">
                <Text className="font-pMedium text-xs text-gray-500">
                    Spent this month
                </Text>
                <Text className="font-pSemibold mt-6 text-2xl">
                    1024€
                </Text>
            </View>
        );
    }

    if (id === 'cashback') {
        return (
            <View
                style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}
                pointerEvents="none">
                <View style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
                    <View
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: 30,
                            backgroundColor: Colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text className="font-pBold text-white text-base">5%</Text>
                    </View>
                    <Text className="font-pMedium">Cashback</Text>
                </View>
            </View>
        );
    }

    if (id === 'recent') {
        return (
            <View style={styles.container} pointerEvents="none">
                <View>
                    <Text className="font-pMedium text-xs text-gray-500">
                        Recent transaction
                    </Text>

                    {transactions.length === 0 && (
                        <Text className="font-pSemibold text-gray-400">
                            No transactions
                        </Text>
                    )}

                    {transactions.length > 0 && (
                        <>
                            <Text className="font-pSemibold mt-3 text-lg">
                                {transactions[transactions.length - 1].amount}€
                            </Text>
                            <Text className="text-gray-600 font-pSemibold">
                                {transactions[transactions.length - 1].title}
                            </Text>
                        </>
                    )}
                </View>
            </View>
        );
    }

    if (id === 'cards') {
        return (
            <View style={styles.container} pointerEvents="none">
                <Text className="font-pMedium text-xs text-gray-500">Cards</Text>
                <Ionicons
                    name="card"
                    size={50}
                    color={Colors.secondary}
                    style={{marginTop: 20, alignSelf: 'center'}}
                />
            </View>
        );
    }
};

export default Tile;