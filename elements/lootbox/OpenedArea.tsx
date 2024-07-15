import OpenedLootboxCard from './OpenedLootboxCard';
import { type PersonLootbox, getOpenedLootboxes } from '@/api/lootboxService';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const OpenedArea = () => {
    const [opened, setOpened] = useState<PersonLootbox[]>([]);

    useEffect(() => {
        // TODO: add token
        getOpenedLootboxes('TODO: ADD TOKEN').then((v) => setOpened(v));
    }, []);

    return (
        <View
            style={{
                height: '90%',
            }}
        >
            {opened.length === 0 ? (
                <ActivityIndicator animating />
            ) : (
                <FlatList
                    style={{ paddingHorizontal: 33 }}
                    contentContainerStyle={{ gap: 8 }}
                    columnWrapperStyle={{ gap: 4 }}
                    data={opened}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <OpenedLootboxCard {...item} />}
                    numColumns={2}
                />
            )}
        </View>
    );
};

export default OpenedArea;
