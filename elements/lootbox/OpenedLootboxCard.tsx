import { PersonLootbox } from '@/api/lootboxService';
import dayjs from 'dayjs';
import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

function OpenedLootboxCard(props: PersonLootbox) {
    const { colors } = useTheme();
    return (
        <View
            style={{
                backgroundColor: colors.backdrop,
                paddingVertical: 8,
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 5,
            }}
        >
            <Text style={{ fontWeight: 'bold' }}>{props.item_won_details.item_name}</Text>
            <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: props.item_won_details.image }}
            />
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text>{dayjs(props.opened_at).format('DD/MM/YY')}</Text>
                <Text>{dayjs(props.opened_at).format('HH:mm')}</Text>
            </View>
        </View>
    );
}

export default OpenedLootboxCard;
