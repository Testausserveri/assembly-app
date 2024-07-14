import LootboxArea from '@/elements/lootbox/LootboxArea';
import OpenedArea from '@/elements/lootbox/OpenedArea';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Lootbox = () => {
    const { t } = useTranslation();

    const [isLootSelected, setIsLootSelected] = useState(true);
    const [isOpenedSelected, setIsOpenedSelected] = useState(false);

    const selectLoot = () => {
        if (!isLootSelected) {
            setIsLootSelected(true);
            setIsOpenedSelected(false);
        }
    };

    const selectOpened = () => {
        if (!isOpenedSelected) {
            setIsOpenedSelected(true);
            setIsLootSelected(false);
        }
    };

    const styles = StyleSheet.create({
        selected: {
            textAlign: 'center',
            fontFamily: 'RobotoBold',
            textDecorationLine: 'underline',
        },

        unselected: {
            textAlign: 'center',
            fontFamily: 'RobotoBold',
        },
    });
    return (
        <View
            style={{
                display: 'flex',
                gap: 16,
                flex: 1,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    gap: 32,
                }}
            >
                <Text
                    variant='headlineMedium'
                    style={isLootSelected ? styles.selected : styles.unselected}
                    onPress={selectLoot}
                >
                    {t('loot')}
                </Text>
                <Text
                    variant='headlineMedium'
                    style={isOpenedSelected ? styles.selected : styles.unselected}
                    onPress={selectOpened}
                >
                    {t('opened')}
                </Text>
            </View>
            {isLootSelected ? <LootboxArea /> : <OpenedArea />}
        </View>
    );
};

export default Lootbox;
