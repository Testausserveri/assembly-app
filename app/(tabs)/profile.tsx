import LanguageSelector from '@/elements/LanguageSelector';
import { ProfileView } from '@/elements/user/ProfileView';
import { useTranslation } from 'react-i18next';
import { Divider, Surface, Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
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
            <Text>{t('home')}</Text>
            <Divider />
            <LanguageSelector />
            <ProfileView />
        </Surface>
    );
}
