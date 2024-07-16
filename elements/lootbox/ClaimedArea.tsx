import OpenedLootboxCard from './OpenedLootboxCard';
import { type PersonLootbox } from '@/api/lootboxService';
import LinkButton from '@/components/lootbox/LinkButton';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';
import { useLootboxes } from '@/hooks/useLootboxes';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';

const ClaimedArea = () => {
    const [token, setToken] = useState<string | null>(null);
    const { lootboxes, reloadLootboxes } = useLootboxes(token);
    const {
        state: { login },
    } = useGlobalState();

    const { t } = useTranslation();

    useEffect(() => {
        if (login) {
            setToken(login.token);
        }
    }, [login]);

    return (
        <View
            style={{
                height: '90%',
            }}
        >
            {lootboxes.status === 'loading' ? (
                <ActivityIndicator animating />
            ) : lootboxes.status === 'error' ? (
                <View>
                    <Text>{t(lootboxes.message!)}</Text>
                    <Button onPress={reloadLootboxes}>{t('try-again')}</Button>
                </View>
            ) : (
                <FlatList
                    style={{ paddingHorizontal: 33 }}
                    contentContainerStyle={{ gap: 8 }}
                    columnWrapperStyle={{ gap: 4 }}
                    data={lootboxes.lootboxes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <OpenedLootboxCard {...item} />}
                    numColumns={2}
                />
            )}
        </View>
    );
};

export default ClaimedArea;
