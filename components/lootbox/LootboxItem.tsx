import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import BigButton from './BigButton';

type LootboxItem = {
    id: number | string;
    item_name: string;
    image: string;
    coins_won: number | null;
    only_coins: boolean;
    description: string;
    digital_code: string | undefined;
    telia_link_exclusive: boolean;
    winner_info: null;
}

interface LootboxProps {
    code: string;
    id: number;
    skin: string;
    lootbox_id: number | string;
    lootbox_name: string;
    item_won_details: LootboxItem | undefined;
    status: number;
    token: string;
    selectLoot: () => void,
    setBoxID: (id:number) => void,
    setIsOpen: (state:boolean) => void,
    setSkin: (name:string) => void,
    setIsOpened: (state:boolean) => void,
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

const LootboxItem = ({code, id, skin, lootbox_id, lootbox_name, item_won_details, status, token, selectLoot, setBoxID, setIsOpen, setSkin, setIsOpened} : LootboxProps) => {
    const { t } = useTranslation();
    const boxTop = getParts({skin})?.top
    const boxBottom = getParts({skin})?.bottom
    const lootImage = getParts({skin})?.bottom

    const open = () => {
        selectLoot()
        setBoxID(id)
        setIsOpen(true)
        setSkin(skin)
        setIsOpened(false)
    };

    return (
        <Surface
            style={{
                width: '100%',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#191919',
                padding: 16,
                maxHeight: '60%'
            }}
            elevation={0}
        >
                <View style={{
                    width: '100%',
                }}>
                    {status === 1 ? 
                [
                    <Text variant='titleLarge' style={{ textAlign: 'center'}}>
                        {lootbox_name}
                    </Text>,
                    <View style={{height:'70%', marginBottom: '5%'}}>
                        <Image source={boxTop} style={{width: '50%', aspectRatio: 1, resizeMode: 'contain', position: 'absolute', top: '3%', marginHorizontal: '25%', zIndex: 11 }} />
                        <Image source={boxBottom} style={{ width: '50%', resizeMode: 'contain', position: 'relative', marginHorizontal: '25%', zIndex: 10 }} />
                    </View>,
                    <View>
                        <BigButton text='open' onPress={open} disabled={false}/>
                    </View>,
                ] : [
                    <Text variant='titleLarge' style={{ textAlign: 'center'}}>
                        {lootbox_name}
                    </Text>,
                    <Image source={{uri: `https://asmcommunity.imgix.net/${item_won_details?.image}`}} style={{flex: 1, margin: 'auto', paddingVertical: '40%', width: '50%', resizeMode: 'contain', position: 'relative', marginHorizontal: '25%', zIndex: 12 }} />,
                    <Text variant='titleMedium' style={{ textAlign: 'center', fontFamily: 'Gaba' }}>
                        {item_won_details?.item_name}
                    </Text>,
                    <Text variant='titleMedium' style={{ textAlign: 'center', fontFamily: 'Gaba' }}>
                        {item_won_details?.coins_won ? t('amount') + ':' : undefined} {item_won_details?.coins_won}
                    </Text>
                ]}
                </View>
        </Surface>
    );
};

export default LootboxItem;
