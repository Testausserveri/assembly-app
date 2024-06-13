import { useTranslation } from 'react-i18next';
import { Button } from 'react-native';
import { Divider, Surface, Text } from 'react-native-paper';

export default function HomeScreen() {
    const { t } = useTranslation();

    return (
        <Surface
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: 16,
            }}
        >
            <Text>{t('other')}</Text>
            <Divider />
            <Button title={t('other') + ' ' + t('useless')} onPress={() => {}} />
        </Surface>
    );
}
