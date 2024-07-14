import { useTranslation } from 'react-i18next';
import { Surface, Text, useTheme } from 'react-native-paper';

export default function MapScreen() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Surface
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: 16,
                backgroundColor: theme.colors.background,
            }}
        >
            <Text>{t('map')}</Text>
        </Surface>
    );
}
