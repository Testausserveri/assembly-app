import React, {useState} from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import BigButton from '@/components/lootbox/BigButton';
import RaffleRulesButton from '@/components/lootbox/RaffleRulesButton';
import { checkCode, claimLootbox, openLootbox } from '@/api/lootboxService';
import Animated, { SlideInLeft, SlideOutLeft } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next';
import BigTextInput from '@/components/lootbox/BigTextInput';
import { useGlobalState } from '@/hooks/providers/GlobalStateProvider';



interface LootboxAreaProps {
    code: string,
    setCode: (code:string) => void,
    isOpen: boolean,
    setIsOpen: (state:boolean) => void,
    boxID: number,
    setBoxID: (id:number) => void,
    skin: string,
    setSkin: (name:string) => void,
    isOpened: boolean,
    setIsOpened: (state:boolean) => void,
    loot: string,
    setLoot: (name:string) => void,
    lootImage: string,
    setLootImage: (url:string) => void,
    boxTop: ImageSourcePropType,
    setBoxTop: (name:string) => void,
    boxBottom: ImageSourcePropType,
    setBoxBottom: (name:string) => void,
    showModal: () => void,
}

const getParts = ({skin}:{skin:string}) => {
    if (skin === "blue") {
        return {
            top: require("@/assets/images/lootbox/blue/top.png"),
            bottom: require("@/assets/images/lootbox/blue/bottom.png")
        }
    } else if (skin === "gold") {
        return {
            top: require("@/assets/images/lootbox/gold/top.png"),
            bottom: require("@/assets/images/lootbox/gold/bottom.png")
        }
    } else if (skin === "goldLight") {
        return {
            top: require("@/assets/images/lootbox/gold-light/top.png"),
            bottom: require("@/assets/images/lootbox/gold-light/bottom.png")
        }
    } else if (skin === "green") {
        return {
            top: require("@/assets/images/lootbox/green/top.png"),
            bottom: require("@/assets/images/lootbox/green/bottom.png")
        }
    } else if (skin === "greenLight") {
        return {
            top: require("@/assets/images/lootbox/green-light/top.png"),
            bottom: require("@/assets/images/lootbox/green-light/bottom.png")
        }
    } else if (skin === "purple") {
        return {
            top: require("@/assets/images/lootbox/purple/top.png"),
            bottom: require("@/assets/images/lootbox/purple/bottom.png")
        }
    } else if (skin === "purpleLight") {
        return {
            top: require("@/assets/images/lootbox/purple-light/top.png"),
            bottom: require("@/assets/images/lootbox/purple-light/bottom.png")
        }
    } else if (skin === "purpleWide") {
        return {
            top: require("@/assets/images/lootbox/purple-wide/top.png"),
            bottom: require("@/assets/images/lootbox/purple-wide/bottom.png")
        }
    } else if (skin === "red") {
        return {
            top: require("@/assets/images/lootbox/red/top.png"),
            bottom: require("@/assets/images/lootbox/red/bottom.png")
        }
    } else if (skin === "redYellow") {
        return {
            top: require("@/assets/images/lootbox/red-yellow/top.png"),
            bottom: require("@/assets/images/lootbox/red-yellow/bottom.png")
        }
    } else if (skin === "yellowRed") {
        return {
            top: require("@/assets/images/lootbox/yellow-red/top.png"),
            bottom: require("@/assets/images/lootbox/yellow-red/bottom.png")
        }
    } else if (skin === "blueRed") {
        return {
            top: require("@/assets/images/lootbox/blue-red/top.png"),
            bottom: require("@/assets/images/lootbox/blue-red/bottom.png")
        }
    } else if (skin === "esportal") {
        return {
            top: require("@/assets/images/lootbox/esportal/top.png"),
            bottom: require("@/assets/images/lootbox/esportal/bottom.png")
        }
    }
}

const LootboxArea = ({code, setCode, isOpen, setIsOpen, boxID, setBoxID, skin, setSkin, isOpened, setIsOpened, loot, setLoot, lootImage, setLootImage, showModal}:LootboxAreaProps) => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const boxTop = getParts({skin})?.top
    const boxBottom = getParts({skin})?.bottom

    const {
        state: { login },
    } = useGlobalState();

    const claim = () => {
        if (!login) {
            return
        }
        checkCode(code)
            .then(res=> {
                if (res.success === false) {
                    console.log(res.error)
                } else {
                    claimLootbox(login.token, code, res.token)
                        .then(res=> {
                            if (res.success === false) {
                                console.log(res.error)
                            } else {
                                console.log("Claimed!")
                            }
                        })
                }
            })
    };

    const open = () => {
        if (!login) {
            return
        }
        openLootbox(login.token, boxID, i18n.language)
            .then(res=> {
                if (res.success === false) {
                    throw {error: res.error}
                } else {
                    setIsOpened(true)
                    setLoot(res.item_won_details.item_name)
                    setLootImage(`https://asmcommunity.imgix.net/${res.item_won_details.image}`)
                }
            })
    };

    const back = () => {
        setIsOpen(false)
        setIsOpened(false)
        setCode("")
        setSkin("gold")
    }
    
    return (
        <Animated.View
        entering={SlideInLeft}
        exiting={SlideOutLeft}
            style={{
                height: "90%",
            }}
        >
            <View
                style={{
                    height: "60%",
                    justifyContent: 'center',
                    marginBottom: "5%"
                }}
            >
                {isOpened ?
                    [
                        <View style={{flex:1}}>
                            <Text variant="titleLarge" style={{fontFamily: "Roboto", textAlign:'center'}}>
                                {loot}
                            </Text>
                        </View>,
                        <Image source={{uri: lootImage}} style={{ width: "30%", height: "30%", resizeMode: "contain", position: 'absolute', marginHorizontal: "35%", top:"20%", zIndex: 12 }} />,
                        <Image source={boxTop} style={{ width: "50%", resizeMode: "contain", position: 'absolute', left: "40%", transform: [{rotate: '75deg'}], top: "50%", zIndex: 11 }} />,
                        <Image source={boxBottom} style={{ width: "50%", resizeMode: "contain", position: 'absolute', marginHorizontal: "25%", top: "40%", zIndex: 10 }} />
                    ]
                    :
                    [
                        <Image source={boxTop} style={{ width: "50%", resizeMode: "contain", position: 'absolute', marginHorizontal: "25%", top: "15%", zIndex: 11 }} />,
                        <Image source={boxBottom} style={{ width: "50%", resizeMode: "contain", position: 'absolute', marginHorizontal: "25%", top: "15%", zIndex: 10 }} />
                    ]

                }
            </View>
            {!isOpen ? 
                [
                    <BigTextInput onChangeText={setCode} value={code} placeholderKey="Insert code" />,
                    <BigButton text="claim" onPress={claim} disabled={code.length === 0}/>,
                    <RaffleRulesButton showModal={showModal}/>
                ]
                :
                <>
                {isOpened ? 
                    [
                        <BigButton text="back" onPress={back} disabled={false}/>,
                        <RaffleRulesButton showModal={showModal} />
                    ]
                    :
                    [
                        <BigButton text="open" onPress={open} disabled={false}/>,
                        <RaffleRulesButton showModal={showModal} />
                    ]
                }
                </>
            }
        </Animated.View>
    );
};

export default LootboxArea;
