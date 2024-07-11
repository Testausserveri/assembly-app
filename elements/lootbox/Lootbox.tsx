import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import LootboxArea from '@/elements/lootbox/LootboxArea';
import OpenedArea from '@/elements/lootbox/OpenedArea';

const Lootbox = () => {
    const theme = useTheme();

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
            textDecorationLine: "underline",
        },
    
        unselected: {
            textAlign: 'center', 
            fontFamily: 'RobotoBold', 
        },
    })
    if (isLootSelected) {
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
                        height: "10%",
                        top: 0,
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            height: "100%",
                            width: '50%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            left: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={isLootSelected ? styles.selected : styles.unselected} onPress={selectLoot}>
                            LOOT
                        </Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            height: "100%",
                            width: '50%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            right: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={isOpenedSelected ? styles.selected : styles.unselected} onPress={selectOpened}>
                            OPENED
                        </Text>
                    </View>
                </View>
                <LootboxArea />
            </View>
        );
    }   
    else {
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
                        height: "10%",
                        top: 0,
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            height: "100%",
                            width: '50%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            left: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={isLootSelected ? styles.selected : styles.unselected} onPress={selectLoot}>
                            LOOT
                        </Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            height: "100%",
                            width: '50%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            right: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={isOpenedSelected ? styles.selected : styles.unselected} onPress={selectOpened}>
                            OPENED
                        </Text>
                    </View>
                </View>
                <OpenedArea />
            </View>
        );
    }
};


export default Lootbox;
