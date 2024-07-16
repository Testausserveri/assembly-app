import ClaimedArea from '@/elements/lootbox/ClaimedArea';
import LootboxArea from '@/elements/lootbox/LootboxArea';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const Lootbox = () => {
    const { t } = useTranslation();

    const [isLootSelected, setIsLootSelected] = useState(true);
    const [isClaimedSelected, setIsClaimedSelected] = useState(false);

    const {
        state: { login },
    } = useGlobalState();

    const selectLoot = () => {
        if (!isLootSelected) {
            setIsLootSelected(true);
            setIsClaimedSelected(false);
        }
    };

    const selectOpened = () => {
        if (!isClaimedSelected) {
            setIsClaimedSelected(true);
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
            {login ? (
                <>
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
                            style={isClaimedSelected ? styles.selected : styles.unselected}
                            onPress={selectOpened}
                        >
                            {t('claimed')}
                        </Text>
                    </View>
                    {isLootSelected ? <LootboxArea /> : <ClaimedArea />}
                </>
            ) : (
                <View
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            paddingHorizontal: 16,
                        }}
                        variant='headlineMedium'
                    >
                        {t('please-login-lootbox')}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Lootbox;
