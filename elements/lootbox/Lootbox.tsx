import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Lootbox() {
    const { t, i18n } = useTranslation();
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                padding: 16,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ textAlign: 'center', marginBottom: 8 }} variant='headlineLarge'>
                {t('lootbox-coming-soon')}
            </Text>
            <Text style={{ paddingHorizontal: 16, textAlign: 'center' }} variant='bodyLarge'>
                {t('lootbox-under-construction')}
            </Text>
            <Text
                onPress={() => Linking.openURL(`https://assembly.org/${i18n.language}/loot`)}
                style={{
                    paddingHorizontal: 16,
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                }}
                variant='bodyLarge'
            >
                {t('lootbox-link')}
            </Text>
        </View>
    );
}
