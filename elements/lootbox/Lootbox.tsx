import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Text, useTheme, Portal, Button } from 'react-native-paper';
import LootboxArea from '@/elements/lootbox/LootboxArea';
import OpenedArea from '@/elements/lootbox/OpenedArea';
import { t } from 'i18next';
import BigButton from '@/components/lootbox/BigButton';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';

const Lootbox = () => {
    const theme = useTheme();

    const {
        state: { login },
    } = useGlobalState();

    const [isLootSelected, setIsLootSelected] = useState(true);
    const [isOpenedSelected, setIsOpenedSelected] = useState(false);
    const [isRulesOpen, setIsRulesOpen] = useState(false);

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

    const openRules = () => {
        if (!isRulesOpen) {
            setIsRulesOpen(true);
        }
    };

    const closeRules = () => {
        if (isRulesOpen) {
            setIsRulesOpen(false);
        }
    }

    const getParts = ({skin}:{skin:string}) => {
        if (skin === 'blue') {
            return {
                top: require('@/assets/images/lootbox/blue/top.png'),
                bottom: require('@/assets/images/lootbox/blue/bottom.png')
            }
        } else if (skin === 'gold') {
            return {
                top: require('@/assets/images/lootbox/gold/top.png'),
                bottom: require('@/assets/images/lootbox/gold/bottom.png')
            }
        } else if (skin === 'goldLight') {
            return {
                top: require('@/assets/images/lootbox/gold-light/top.png'),
                bottom: require('@/assets/images/lootbox/gold-light/bottom.png')
            }
        } else if (skin === 'green') {
            return {
                top: require('@/assets/images/lootbox/green/top.png'),
                bottom: require('@/assets/images/lootbox/green/bottom.png')
            }
        } else if (skin === 'greenLight') {
            return {
                top: require('@/assets/images/lootbox/green-light/top.png'),
                bottom: require('@/assets/images/lootbox/green-light/bottom.png')
            }
        } else if (skin === 'purple') {
            return {
                top: require('@/assets/images/lootbox/purple/top.png'),
                bottom: require('@/assets/images/lootbox/purple/bottom.png')
            }
        } else if (skin === 'purpleLight') {
            return {
                top: require('@/assets/images/lootbox/purple-light/top.png'),
                bottom: require('@/assets/images/lootbox/purple-light/bottom.png')
            }
        } else if (skin === 'purpleWide') {
            return {
                top: require('@/assets/images/lootbox/purple-wide/top.png'),
                bottom: require('@/assets/images/lootbox/purple-wide/bottom.png')
            }
        } else if (skin === 'red') {
            return {
                top: require('@/assets/images/lootbox/red/top.png'),
                bottom: require('@/assets/images/lootbox/red/bottom.png')
            }
        } else if (skin === 'redYellow') {
            return {
                top: require('@/assets/images/lootbox/red-yellow/top.png'),
                bottom: require('@/assets/images/lootbox/red-yellow/bottom.png')
            }
        } else if (skin === 'yellowRed') {
            return {
                top: require('@/assets/images/lootbox/yellow-red/top.png'),
                bottom: require('@/assets/images/lootbox/yellow-red/bottom.png')
            }
        } else if (skin === 'blueRed') {
            return {
                top: require('@/assets/images/lootbox/blue-red/top.png'),
                bottom: require('@/assets/images/lootbox/blue-red/bottom.png')
            }
        } else if (skin === 'esportal') {
            return {
                top: require('@/assets/images/lootbox/esportal/top.png'),
                bottom: require('@/assets/images/lootbox/esportal/bottom.png')
            }
        }
    }

    const [code, setCode] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [boxID, setBoxID] = useState(0)
    const [skin, setSkin] = useState('gold')
    const [isOpened, setIsOpened] = useState(false)
    const [loot, setLoot] = useState('')
    const [lootImage, setLootImage] = useState('')
    const [boxTop, setBoxTop] = useState(require('@/assets/images/lootbox/gold/top.png'))
    const [boxBottom, setBoxBottom] = useState(require('@/assets/images/lootbox/gold/bottom.png'))

    const styles = StyleSheet.create({
        selected: {
            fontFamily: 'RobotoBold', 
            textDecorationLine: 'underline',
            textTransform: 'uppercase'
        },
    
        unselected: {
            fontFamily: 'RobotoBold', 
            textTransform: 'uppercase'
        },
    
        left: {
            textAlign: 'left', 
        },
    
        right: {
            textAlign: 'right', 
        },
    })

    return (
        <View
            style={{
                display: 'flex',
                gap: 16,
                flex: 1,
            }}
        >
            <Portal>
                <Modal 
                visible={isRulesOpen} 
                onDismiss={closeRules} 
                contentContainerStyle={{
                    backgroundColor: 'rgba(13, 13, 13, 0.75)', 
                    flex: 1, marginBottom: '25%', 
                    marginTop: '10%', 
                    marginLeft: '5%', 
                    marginRight: '5%'
                }}>
                    <View style={{
                        height: '100%',
                        width: '100%'
                    }}>
                        <ScrollView style={{
                            height: '90%',
                            width: '100%',
                            paddingHorizontal: '5%'
                        }}>
                            <Text style={{textAlign: 'center'}} variant='headlineLarge'>Raffle rules</Text>
                        </ScrollView>
                        <View style={{
                            height: '10%',
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                            <BigButton text='close' onPress={closeRules} disabled={false}></BigButton>
                        </View>
                    </View>
                </Modal>
            </Portal>
            {login ? (
            <>
                <View
                    style={{
                        height: '10%',
                        top: 0,
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '40%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            left: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={[ isLootSelected ? styles.selected : styles.unselected, styles.right ]} onPress={selectLoot}>
                            {t('claim')}
                        </Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '40%',
                            top: 0,
                            justifyContent: 'center',
                            alignContent: 'center',
                            right: 0,
                        }}
                    >
                        <Text variant='headlineMedium' style={[isOpenedSelected ? styles.selected : styles.unselected, styles.left ]} onPress={selectOpened}>
                            {t('boxes')}
                        </Text>
                    </View>
                </View>
                {isLootSelected ? 
                    <LootboxArea 
                        code={code} 
                        setCode={setCode} 
                        isOpen={isOpen} 
                        setIsOpen={setIsOpen} 
                        boxID={boxID} 
                        setBoxID={setBoxID} 
                        skin={skin} 
                        setSkin={setSkin} 
                        isOpened={isOpened} 
                        setIsOpened={setIsOpened} 
                        loot={loot} 
                        setLoot={setLoot} 
                        lootImage={lootImage} 
                        setLootImage={setLootImage} 
                        boxTop={boxTop} 
                        setBoxTop={setBoxTop} 
                        boxBottom={boxBottom} 
                        setBoxBottom={setBoxBottom}
                        showModal={openRules}
                    /> 
                : 
                    <OpenedArea 
                        selectLoot={selectLoot}
                        setBoxID={setBoxID}
                        setIsOpen={setIsOpen}
                        setSkin={setSkin}
                        setIsOpened={setIsOpened}
                    />
                }
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
